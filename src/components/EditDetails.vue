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
          <object width="100%" height="100%" data="https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf"></object>
        </v-flex>
        <v-flex xs12 md4>
          <form grid-list-sm class="pa-4" @submit.prevent="AddPerson">
            <v-layout row wrap>

                <v-text-field label="Applicant Name" v-model="name"></v-text-field>

                <v-combobox
                  v-model="lastStatus"
                  :items="applicationStatus.map(a => a.short)"
                  label="Application Status"
                ></v-combobox>

                <v-flex xs12 md6>
                  <p>Hire Status</p>
                  <v-btn-toggle v-model="lastStatus">
                    <v-btn v-for="(status, index) in hireStatuses.map(s => s.short)" :key="index">
                      {{ status }}
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>
                <v-flex xs12 md6>
                  <p>Employee Type</p>
                  <v-btn-toggle v-model="lastEmployeeType">
                    <v-btn v-for="(type, index) in employeeTypes.map(t => t.short)" :key="index">
                      {{ type }}
                    </v-btn>
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

                <v-text-field v-if="!mailingCheckbox" label="Physical Address" v-model="physicalAddress"></v-text-field>

                <v-text-field label="Position Applied For" v-model="positionApplied"></v-text-field>

                <v-flex xs12>
                  <p>Security Clearance</p>
                  <v-btn-toggle v-model="clearance">
                    <v-btn v-for="(clearance, index) in clearanceList.map(c => c.short)" :key="index">
                      {{ clearance }}
                    </v-btn>
                  </v-btn-toggle>
                </v-flex>

                <v-flex xs12>
                  <p>Education</p>
                  <v-btn-toggle v-model="education">
                    <v-btn v-for="(edu, index) in educationList.map(e => e.short)" :key="index">
                      {{ edu }}
                    </v-btn>
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
export default {
  data: () => ({
    name: null,
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
    degreeList: []
  }),
  props: {
    // TODO: Add validation
    person: {
      id: Number,
      name: String
    }
  },
  created() {
    this.applicationStatus = [
      { short: "status", long: "long status name" },
      { short: "status2", long: "long status2 name" }
    ]
    this.hireStatuses = [
      { short: "None", long: "None" },
      { short: "FT", long: "Full Time" },
      { short: "PT", long: "Part Time" },
      { short: "Past", long: "Former employment at our company" }
    ]
    this.employeeTypes = [
      { short: "Cand", long: "Candidate" },
      { short: "Intrn", long: "Intern" },
      { short: "Empl", long: "Employee" }
    ]
    this.clearanceList = [
      { short: "unk", long: "Unknown" },
      { short: "n/a", long: "Not Applicable" },
      { short: "S", long: "Secret" },
      { short: "TS", long: "Top Secret" },
      { short: "S-Exp", long: "Secret - Expired" },
      { short: "TS-Exp", long: "Top Secret - Expired" },
    ]
    this.educationList = [
      { short: "unk", long: "Unknown" },
      { short: "n/a", long: "Not Applicable" },
      { short: "hs", long: "High School" },
      { short: "aa", long: "Associates of Arts" },
      { short: "as", long: "Associates of Science" },
      { short: "ba", long: "Bachelors of Arts" },
      { short: "bs", long: "Bachelors of Science" }
    ]
     this.degreeList = [
      { short: "unk", long: "Unknown" },
      { short: "COE", long: "Computer Engineering" },
      { short: "CS", long: "Computer Science" },
    ]
  }
}
</script>
