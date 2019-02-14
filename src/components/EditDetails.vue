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
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs12 align-center justify-space-between>
          <v-layout align-center>
            <h1>ID: {{person.id}}</h1>
            <h1>Name: {{person.name}}</h1>
            <v-avatar size="40px" class="mr-3">
              <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
            </v-avatar>
            <v-text-field placeholder="Name"></v-text-field>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field placeholder="Job title"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000" mask="phone"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    //
  }),
  props: {
    // TODO: Add validation
    person: {
      id: Number,
      name: String
    }
  }
}
</script>
