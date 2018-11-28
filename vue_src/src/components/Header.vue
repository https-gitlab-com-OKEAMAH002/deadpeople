<template>
  

  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-brand href="#">
      <img alt="Grove St. Gate" src="../assets/grovest_gate.png">
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item href="#" >Map</b-nav-item>
      <b-nav-item href="#" >The Team</b-nav-item>
      <b-nav-item href="#" >Admin</b-nav-item>
    </b-navbar-nav>

  </b-navbar>

</template>

<script>
export default {
  name: 'Header',
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
