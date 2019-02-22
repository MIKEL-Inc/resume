<template>
  <v-layout>
    <v-flex>
      <v-card :color="this.cardColor(type)" @click="$emit('edit', id)">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ name }}</h3>
            <p class="subheading font-weight-light">{{ date }}</p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-chip color="gray">{{ clearance }}</v-chip>
          <v-spacer></v-spacer>
          <p class="caption font-weight-thin">{{ type }}</p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  props: [
    'id',
    'name',
    'date',
    'clearance',
    'type'
  ],
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    }
  },
  methods: {
    cardColor (type) {
      let color = ''
      switch (type) {
        case 'Candidate':
          color = 'primary'
          break

        case 'Intern':
          color = 'secondary'
          break

        case 'Employee':
          color = 'accent'
          break

        default:
          break
      }

      return color + ' lighten-4'
    }
  }
}
</script>
