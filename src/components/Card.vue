<template>
  <v-layout>
    <v-flex>
      <v-card color="primary lighten-4" @click="$emit('edit', {id: 1})">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">First Last Name</h3>
            <p class="subheading font-weight-light">03/13/18</p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-chip color="gray">Clearance</v-chip>
          <v-spacer></v-spacer>
          <p class="caption font-weight-thin">Candidate</p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    }
  }
}
</script>
