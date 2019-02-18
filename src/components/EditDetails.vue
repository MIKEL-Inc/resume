<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Add/Edit User</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click="$emit('save', false)">Save</v-btn>
        <v-btn dark flat @click="$emit('cancel', false)">Cancel</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container fluid>
      <v-layout>
        <v-flex xs12 md8>
          <object
            width="100%"
            height="100%"
            data="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf"
          ></object>
        </v-flex>
        <v-flex xs12 md4>
          <form grid-list-sm class="pa-4" @submit.prevent="AddPerson">
            <v-layout row wrap>
              <v-text-field label="Applicant Name" v-model="name"></v-text-field>

              <v-combobox
                v-model="lastStatus"
                :items="applicationStatus.map(a => a.long)"
                label="Application Status"
              ></v-combobox>

              <v-flex xs12 md6>
                <p>Hire Status</p>
                <v-btn-toggle v-model="lastStatus">
                  <v-btn
                    v-for="(status, index) in hireStatuses.map(s => s.short)"
                    :key="index"
                  >{{ status }}</v-btn>
                </v-btn-toggle>
              </v-flex>
              <v-flex xs12 md6>
                <p>Employee Type</p>
                <v-btn-toggle v-model="lastEmployeeType">
                  <v-btn
                    v-for="(type, index) in employeeTypes.map(t => t.short)"
                    :key="index"
                  >{{ type }}</v-btn>
                </v-btn-toggle>
              </v-flex>

              <v-text-field type="email" label="Email" v-model="email"></v-text-field>

              <v-text-field
                type="tel"
                label="Phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
                v-model="phone"
              ></v-text-field>

              <v-text-field label="Mailing Address" v-model="mailingAddress"></v-text-field>

              <v-checkbox
                v-model="mailingCheckbox"
                label="Physical Address same as Mailing Address"
              ></v-checkbox>

              <v-text-field
                v-if="!mailingCheckbox"
                label="Physical Address"
                v-model="physicalAddress"
              ></v-text-field>

              <v-text-field label="Position Applied For" v-model="positionApplied"></v-text-field>

              <v-flex xs12>
                <p>Security Clearance</p>
                <v-btn-toggle v-model="clearance">
                  <v-btn
                    v-for="(clearance, index) in clearanceList.map(c => c.short)"
                    :key="index"
                  >{{ clearance }}</v-btn>
                </v-btn-toggle>
              </v-flex>

              <v-flex xs12>
                <p>Education</p>
                <v-btn-toggle v-model="education">
                  <v-btn
                    v-for="(edu, index) in educationList.map(e => e.short)"
                    :key="index"
                  >{{ edu }}</v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import db from '@/firebase/init'

export default {
  data: () => ({
    name: null,
    applicationStatus: [],
    lastStatus: null,
    hireStatuses: [],
    lastEmployeeType: null,
    employeeTypes: [],
    email: null,
    phone: null,
    mailingAddress: null,
    mailingCheckbox: false,
    physicalAddress: null,
    positionApplied: null,
    clearance: null,
    clearanceList: [],
    education: null,
    educationList: [],
    degreeList: []
  }),
  props: {
    // TODO: Add validation
    person: {
      id: Number,
      name: String
    }
  },
  created () {
    // Fetch data from the firestore
    this.listFromDB('applicationStatus', this.applicationStatus, ['long'])
    this.listFromDB('hireStatus', this.hireStatuses, ['short', 'long'], true)
    this.listFromDB('employeeTypes', this.employeeTypes, ['short'])
    this.listFromDB('clearanceList', this.clearanceList, ['short'], true)
    this.listFromDB('educationLevel', this.educationList, ['short'], true)

    this.degreeList = [
      { short: 'unk', long: 'Unknown' },
      { short: 'COE', long: 'Computer Engineering' },
      { short: 'CS', long: 'Computer Science' }
    ]
  },
  methods: {
    /**
     * Return array from Firestore collection.
     * 
     * Sorting is an optional parameter and defaults to false.
     * 
     * - Assumes `db` already initialized.
     * - Does not check for property existence.
     * - Assigns same property name to return.
     * 
     * @example listFromDB('actors', this.actorDropDownList, ['name'])
     * @example listFromDB('actors', this.actorDropDownList, ['name', 'debutFilm'])
     * @example listFromDB('actors', this.actorDropDownList, ['name'], true)
     * @example listFromDB('actors', this.actorDropDownList, ['name'], { sort: true })
     * @param {string} collectionName String name of collection in database to retrieve
     * @param {array} dropdownList Array to populate with items from collection
     * @param {string[]} propertyList Array of strings naming properties to include
     * @param {boolean} [sort = false] Optional (default `false`) boolean for ordering collection items by their `sort` property (Assuming all items have a `sort` property)
     */
    listFromDB (collectionName, dropdownList, propertyList, sort = false) {
      let collectionRef
      if (sort) {
        collectionRef = db.collection(collectionName).orderBy('sort')
      } else {
        collectionRef = db.collection(collectionName)
      }
      collectionRef
        .get()
        .then(snapshot =>
          snapshot.forEach(doc => {
            let dropdownItem = {}
            propertyList.forEach(property => {
              dropdownItem[property] = doc.data()[property]
            })
            dropdownList.push(dropdownItem)
          })
        )
    }
  }
}
</script>
