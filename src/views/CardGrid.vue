<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex
        v-for="n in 9"
        :key="n"
        xs4
      >
        <Card @edit="$emit('edit', $event)"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Card from '../components/Card'
import db from '@/firebase/init'

export default {
  data: () => ({
    //
  }),
  components: {
    Card
  },
  created() {
    // Fetch data from the firestore
    db.collection('hireStatus').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data())
      })
    })
  }
}
</script>
