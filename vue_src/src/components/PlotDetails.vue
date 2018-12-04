<template>
    <div class="plotDetails">
      <table border="1">
        <th>
          Object Id
        </th>
        <th>
          Location
        </th>
        <th>
          Type
        </th>
        <tr v-for="object in contents" :key="object.object_id">
          <td>
            {{ object.object_id }}
          </td>
          <td>
            {{ object.location }}
          </td>
          <td>
            {{ object.type }}
          </td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
  name: 'PlotDetails',
  props: {
    contents: [],
  },
  mounted () {
    console.log(this.contents); // TODO: Actually load the details.
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
