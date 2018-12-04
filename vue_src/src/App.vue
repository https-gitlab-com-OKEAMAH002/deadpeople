<template>
  <div id="app">
    <Header/>
<!--     <b-modal id="welcome" size="lg" title="Welcome">
      <Welcome/>
    </b-modal> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Welcome from './components/Welcome.vue';

export default {
  name: 'app',
  components: {
    Header,
    Welcome
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
  /*background: url(images/bg.jpg) no-repeat center center fixed; */
  background-color:#D3D3D3;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
</style>
