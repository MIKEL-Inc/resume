<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Add/Edit User</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click="save">Save</v-btn>
        <v-btn dark flat @click="$emit('cancel', false)">Cancel</v-btn>
        <v-dialog v-if="id" width="500">
          <v-btn small flat icon dark slot="activator">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-card>
            <v-card-text>Warning, this is permanant! Are you sure you want to delete {{ name }}?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="warning" flat @click="deleteUser()">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn dark flat @click="resetFileList(); $emit('cancel', false)">Cancel</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container fluid>
      <v-layout>
        <v-flex xs12 md8>
          <object
            width="100%"
            height="100%"
            :data="resumeUrl"
          ></object>
        </v-flex>
        <v-flex xs12 md4>
          <form grid-list-sm class="pa-4" @submit.prevent="AddPerson">
            <v-layout row wrap>
              <v-flex >
                <v-btn block color="secondary lighten-3" @click.native="selectFile">Select Resume <v-icon right>cloud_upload</v-icon></v-btn>
                <input type="file" ref="uploadInput" @change.prevent="fileList = $event.target.files">
                <p class="caption">{{ fileList[0] ? fileList[0].name : '' }}</p>
              </v-flex>
              <v-text-field
                label="Applicant Name"
                v-model="name"
                :rules="[
                  () => !!name || 'Name is required',
                ]"
              ></v-text-field>

              <v-combobox
                v-model="lastStatus"
                :items="applicationStatus.map(a => a.long)"
                label="Application Status"
              ></v-combobox>

              <v-flex xs12 md6>
                <p>Hire Status</p>
                <v-btn-toggle v-model="hireStatus">
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

              <v-text-field
                type="email"
                label="Email"
                v-model="email"
                :rules="[
                  v => !!v || 'Email is required',
                  v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid valid email'
                ]"
              ></v-text-field>

              <v-text-field
                type="tel"
                label="Phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
                v-model="phone"
              ></v-text-field>

              <v-flex xs12>
                <v-checkbox
                  v-model="mailingCheckbox"
                  label="Physical Address same as Mailing Address"
                ></v-checkbox>
              </v-flex>

              <v-textarea
                label="Mailing Address"
                autoGrow
                rows="2"
                v-model="mailingAddress"
              ></v-textarea>

              <v-textarea
                v-if="!mailingCheckbox"
                label="Physical Address"
                autoGrow
                rows="2"
                v-model="physicalAddress"
              ></v-textarea>

              <v-flex xs12>
                <v-text-field label="Position Applied For" v-model="positionApplied"></v-text-field>
              </v-flex>

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
import { db, storage } from '@/firebase/init'

export default {
  data: () => ({
    fileList: [],
    resumeUrl: null,
    name: null,
    lastStatus: null,
    applicationStatus: [],
    hireStatus: null,
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
  watch: {
    id: function watchId (val, oldVal) {
      if (val) {
        // if (val !== oldVal) { // Skip this test for now, fire every non-null
        const docRef = db.collection('deleteMePerson').doc(val)
        docRef.get().then(
          doc => {
            this.name = doc.data().name
            this.date = doc.data().date
            this.lastStatus = doc.data().lastStatus

            this.hireStatus = this.hireStatuses.findIndex(hs => hs.short === doc.data().hireStatus.short)
            this.lastEmployeeType = this.employeeTypes.findIndex(et => et.short === doc.data().lastEmployeeType.short)

            this.email = doc.data().email
            this.phone = doc.data().phone

            this.mailingAddress = doc.data().mailingAddress
            this.physicalAddress = doc.data().physicalAddress
            this.mailingCheckbox = this.mailingAddress === this.physicalAddress

            this.positionApplied = doc.data().positionApplied

            this.clearance = this.clearanceList.findIndex(c => c.short === doc.data().clearance.short)
            this.education = this.educationList.findIndex(e => e.short === doc.data().education.short)
            this.resumeUrl = doc.data().resume
          }
        )
      } else {
        // Id is nulll erase old person data
        this.resetPerson()
      }
      // }
    }
  },
  props: ['id'],
  created () {
    // Fetch data from the firestore
    this.listFromDB('applicationStatus', this.applicationStatus, ['long'])
    this.listFromDB('hireStatus', this.hireStatuses, ['short', 'long'], true)
    this.listFromDB('employeeTypes', this.employeeTypes, ['short', 'long'])
    this.listFromDB('clearanceList', this.clearanceList, ['short', 'long'], true)
    this.listFromDB('educationLevel', this.educationList, ['short', 'long'], true)

    this.degreeList = [
      { short: 'unk', long: 'Unknown' },
      { short: 'COE', long: 'Computer Engineering' },
      { short: 'CS', long: 'Computer Science' }
    ]
    this.resetPerson()
  },
  methods: {
    resetPerson () {
      this.resumeUrl = null
      this.name = 'John Doe'
      this.email = 'test@test.com'
      this.phone = '1234567890'
      this.mailingAddress = '123 Main st.\nAnytown, USA'
      this.physicalAddress = '123 Main st.\nAnytown, USA'
      this.mailingCheckbox = this.mailingAddress === this.physicalAddress
      this.positionApplied = 'Tester'
      this.clearance = 0
      this.education = 0
      this.hireStatus = 0
      this.lastEmployeeType = 0
      // Must exactly match lists
      this.lastStatus = 'Received Resume'
      this.resetFileList()
    },
    resetFileList () {
      this.fileList = []
    },
    selectFile () {
      this.$refs.uploadInput.click()
    },
    deleteUser () {
      // Delete doc from firestore
      db.collection('deleteMePerson').doc(this.id).delete()
        .then(() => {
          this.$emit('cancel', false)
        })
    },
    saveFile (id) {
      if (this.fileList.length >= 1) {
        const rootRef = storage.ref()
        const file = this.fileList[0]
        const fileName = this.id + '/' + file.name + (new Date()).toISOString()
        const fileRef = rootRef.child(fileName)
        const uploadTask = fileRef.put(file)
        uploadTask.on(
          'state_changed',
          snapshot => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused': // firebase.storage.TaskState.PAUSED: // or 'paused'
                // console.log('Upload is paused')
                break
              case 'running': // firebase.storage.TaskState.RUNNING: // or 'running'
                // console.log('Upload is running')
                break
            }
          },
          error => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break
              case 'storage/canceled':
                // User canceled the upload
                break
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break
            }
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              const docRef = db.collection('deleteMePerson').doc(this.id)
              docRef.update({
                resume: downloadURL
              })
            })
          }
        )
      }
    },

    save () {
      if (this.id) {
        const docRef = db.collection('deleteMePerson').doc(this.id)
        docRef.update({
          name: this.name,
          date: (new Date()).toISOString(), // FIXME: This is dependant on the client machine's time and timezone.
          lastStatus: this.lastStatus,
          hireStatus: this.hireStatuses[this.hireStatus],
          lastEmployeeType: this.employeeTypes[this.lastEmployeeType],
          email: this.email,
          phone: this.phone,
          mailingAddress: this.mailingAddress,
          physicalAddress: this.mailingCheckbox
            ? this.mailingAddress
            : this.physicalAddress,
          positionApplied: this.positionApplied,
          clearance: this.clearanceList[this.clearance],
          education: this.educationList[this.education]
        }).then(() => {
          this.saveFile(this.id)
          this.resetFileList()
          this.$emit('save', true)
        }).catch(err => {
        /* legit use */ console.log(err)
        })
      } else {
        db.collection('deleteMePerson').add({
          name: this.name,
          date: (new Date()).toISOString(), // FIXME: This is dependant on the client machine's time and timezone.
          lastStatus: this.lastStatus,
          hireStatus: this.hireStatuses[this.hireStatus],
          lastEmployeeType: this.employeeTypes[this.lastEmployeeType],
          email: this.email,
          phone: this.phone,
          mailingAddress: this.mailingAddress,
          physicalAddress: this.mailingCheckbox
            ? this.mailingAddress
            : this.physicalAddress,
          positionApplied: this.positionApplied,
          clearance: this.clearanceList[this.clearance],
          education: this.educationList[this.education]
        }).then(thingy => {
          this.saveFile(thingy.id)
          this.resetFileList()
          this.$emit('save', true)
        }).catch(err => {
        /* legit use */ console.log(err)
        })
      }
    },
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

<style lang="sass">
input[type="file"]
  position: absolute
  clip: rect(0,0,0,0)
</style>
