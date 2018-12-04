<template>
  <div id="app">
    <Header/>
<!--     <b-modal id="welcome" size="lg" title="Welcome">
      <Welcome/>
    </b-modal> -->
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Welcome from './components/Welcome.vue';

export default {
  name: 'app',
  components: {
    Header,
    Welcome,
    Footer
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
  
  margin-top: 65px;
  margin-bottom: 10px;
  
  height:100%;
  min-height:100%;

  background: url(https://github.com/sketsdever/deadpeople/blob/master/vue_src/src/assets/background.jpg?raw=true) no-repeat center center fixed; 
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
</style>
