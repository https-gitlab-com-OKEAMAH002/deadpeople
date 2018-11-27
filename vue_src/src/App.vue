<template>
  <div id="app">
    <img alt="Grove St. Gate" src="https://raw.githubusercontent.com/sketsdever/deadpeople/master/vue_src/src/assets/grovest_gate.png" height=400>
    <HelloWorld msg="Welcome to Grove St. Cemetery"/>
    <DatabaseEntry />
    <LMap />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import DatabaseEntry from './components/DatabaseEntry.vue';
import LMap from './components/LMap.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    DatabaseEntry,
    LMap
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
