<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex
        v-for="n in 9"
        :key="n"
        xs4
      >
        <Card />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Card from '../components/Card'

  export default {
    data: () => ({
      //
    }),
    components: {
      Card
    }
  }
</script>
