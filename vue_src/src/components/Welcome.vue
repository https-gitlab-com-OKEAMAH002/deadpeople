<template>
<b-container fluid>
	
	<img alt="Grove St. Gate" src="https://github.com/sketsdever/deadpeople/blob/master/vue_src/src/assets/grovest_gate.png?raw=true" width="300">

	 <b-button v-on:click="onEnter">Enter the Graveyard</b-button>

</b-container>

</template>

<script>

export default {
  name: 'Welcome',
  methods: {
    onEnter (event) {
    	console.log("Emited");
      	this.$emit('entered');
    }
  }
}
</script>