<template>
  <div id="app">
    <img alt="Grove St. Gate" src="./assets/grovest_gate.png" height=400>
    <HelloWorld msg="Welcome to Grove St. Cemetery"/>
    <DatabaseEntry />
    <GMap />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import GMap from './components/GMap.vue'
import DatabaseEntry from './components/DatabaseEntry.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    GMap,
    DatabaseEntry,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
