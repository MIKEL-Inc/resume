<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex
        v-for="card in cards"
        :key="card.id"
        xs4
      >
        <Card @edit="$emit('edit', $event)" v-bind="card"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Card from '../components/Card'
import db from '@/firebase/init'

export default {
  data: () => ({
    cards: []
  }),
  components: {
    Card
  },
  created () {
    // Fetch data from the firestore
    db.collection('deleteMePerson').get()
      .then(snapshot => {
        this.cards = []
        snapshot.forEach(doc => {
          this.cards.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date.substr(0, 10),
            clearance: doc.data().clearance.long,
            type: doc.data().lastEmployeeType.long
          })
        })
      })
  }
}
</script>
