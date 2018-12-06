<template>
    <div class="plotDetails">
      <h2>Graves</h2>
      <b-table striped hover :items="graves" :fields="graveFields"></b-table>
      <v-for
      <h2>Landmarks</h2>
      <b-table striped hover :items="landmarks" :fields="landmarkFields"></b-table>
    </div>
</template>

<script>
export default {
  name: 'PlotDetails',
  props: {
    graves: [],
    landmarks: [],
  },
  data () {
    return {
      graveFields: ["location", "id", "first_name", "middle_name", "last_name",
                    "date_of_birth", "date_of_death", "date_of_burial"],
      landmarkFields: ["location", "id", "description", "has_photos"],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
