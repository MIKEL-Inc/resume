<template>
<v-app id="inspire">

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >

      <v-avatar tile>
        <img
          src="@/assets/logo-white.svg"
          alt="inMIKEL Logo"
        >
      </v-avatar>
      <v-title class="subheading px-1">inMIKEL</v-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search Coming Soon"
        disabled
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn flat small @click="logout">Logout</v-btn>
    </v-toolbar>
    <v-content>
      <!-- Display all the tiles here -->
      <CardGrid @edit="personId = $event; isDialogDisplayed = true"/>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="personId = null; isDialogDisplayed = true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="isDialogDisplayed" fullscreen hide-overlay transition="dialog-bottom-transition">
      <EditDetails @cancel="isDialogDisplayed = false" @save="isDialogDisplayed = false" :id="personId"/>
    </v-dialog>

  </v-app>
</template>

<script>
import CardGrid from './CardGrid'
import EditDetails from '../components/EditDetails'
import { auth } from '@/firebase/init'

export default {
  name: 'Home',
  components: {
    CardGrid,
    EditDetails
  },
  data: () => ({
    isDialogDisplayed: false,
    drawer: null,
    personId: null,
    items: [
      { icon: 'contacts', text: 'Contacts' },
      { icon: 'history', text: 'Frequently contacted' },
      { icon: 'content_copy', text: 'Duplicates' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Labels',
        model: true,
        children: [
          { icon: 'add', text: 'Create label' }
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' }
        ]
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Go to the old version' }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    logout () {
      auth.signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
