<template>
    <div class="plotDetails">
      <h2>Graves</h2>
      <b-table striped hover :items="graves"></b-table>
      <h2>Landmarks</h2>
      <b-table striped hover :items="landmarks"></b-table>
    </div>
</template>

<script>
export default {
  name: 'PlotDetails',
  props: {
    graves: [],
    landmarks: [],
  },
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
