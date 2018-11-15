<template>
  <div id="app">
    <img alt="Grove St. Gate" src="./assets/grovest_gate.png" height=400>
    <HelloWorld msg="Welcome to Grove St. Cemetery"/>
    <GMap />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import GMap from './components/GMap.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    GMap
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
