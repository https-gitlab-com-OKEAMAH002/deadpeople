<template>
    <div class="databaseEntry">
        <h2>Add and remove objects from database</h2>
        <b-input-group prepend="Type (Grave or Landmark):">
            <b-form-input v-model="objectType"></b-form-input>
        </b-input-group>
        <b-input-group prepend="Location (Address format eg. 24 Birch St.):">
            <b-form-input v-model="objectLocation"></b-form-input>
        </b-input-group>
        <b-button v-on:click="onClickAddObject">Add object</b-button>
        <b-button v-on:click="onClickDeleteObject">Delete object</b-button>
    </div>
</template>

<script>
export default {
    name: 'DatabaseEntry',
    data() {
        return {
            PATH: "https://deadpeople.herokuapp.com/", // "http://localhost:3000/"
            objectType: "",
            objectLocation: "",
        }
    },
    methods: {
        async onClickAddObject() {
            let params = {
                type: this.objectType,
                location: this.objectLocation,
            }
            let url = new URL(this.PATH + "db-add-object");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            let response = await this.fetchAsync(url);
        },
        async onClickDeleteObject() {
            let params = {
                type: this.objectType,
                location: this.objectLocation,
            }
            let url = new URL(this.PATH + "db-delete-object");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            let response = await this.fetchAsync(url);
        },
        async fetchAsync(url) {
            try {
                let response = await fetch(url);
                let data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
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
