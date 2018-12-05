<template>
  <div>
    
<!--     <div v-if="welcomeShow" id="welcome" @entered="onEnter">
        <Welcome/>
    </div> -->
    <div id="app">
      <Header/>
      <router-view></router-view>
      <Footer/>
    </div>
    
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
  },
  data: {
    welcomeShow: true
  },
  methods: {
    onEnter(){
      this.welcomeShow = false;
    }
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

.text-box {
    margin: 0 auto;
    background-color: #d3d3d3;
    width: 400px;
    height: auto;
    opacity: 0.9;
    border-radius: 10px;
}
</style>
