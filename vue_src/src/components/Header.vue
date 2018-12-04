<template>
  <b-navbar toggleable="md" type="dark" variant="info" fixed="top">

    <b-navbar-brand to="/map">
      <img alt="Grove St. Gate" src="https://github.com/sketsdever/deadpeople/blob/master/vue_src/src/assets/grovest_gate_icon_compressed.png?raw=true" width="40">
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item to="/">Map</b-nav-item>
      <b-nav-item to="/about" >The Team</b-nav-item>
      <b-nav-item to="/database" >Admin</b-nav-item>
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
