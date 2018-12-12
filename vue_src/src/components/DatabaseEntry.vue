<template>
<div>
    <br>
    <div class="text-box">
        <h1>Admin features</h1>
        <p>Add and remove objects from the database:</p>
        <b-dropdown text="Select object type">
            <b-dropdown-item v-on:click="onClickGrave">Grave</b-dropdown-item>
            <b-dropdown-item v-on:click="onClickLandmark">Landmark</b-dropdown-item>
        </b-dropdown>
        <div v-if="showGraveDialog">
            <b-input-group prepend="Location (Address format eg. 24 Birch St.):">
                <b-form-input v-model="location"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Last name:">
                <b-form-input v-model="lastName"></b-form-input>
            </b-input-group>
            <b-input-group prepend="First name:">
                <b-form-input v-model="firstName"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Middle name:">
                <b-form-input v-model="middleName"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Date of Birth (M/D/YYYY):">
                <b-form-input v-model="DOBirth"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Date of Death (M/D/YYYY):">
                <b-form-input v-model="DODeath"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Date of Burial (M/D/YYYY):">
                <b-form-input v-model="DOBurial"></b-form-input>
            </b-input-group>
            <b-button v-on:click="onClickAddGrave">Add grave</b-button>
            <b-button v-on:click="onClickDeleteGrave">Delete grave</b-button>
        </div>
        <div v-if="showLandmarkDialog">
            <b-input-group prepend="Location (Address format eg. 24 Birch St.):">
                <b-form-input v-model="location"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Description:">
                <b-form-input v-model="description"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Has photos? (for now just true / false):">
                <b-form-input v-model="hasPhotos"></b-form-input>
            </b-input-group>
            <b-button v-on:click="onClickAddLandmark">Add landmark</b-button>
            <b-button v-on:click="onClickDeleteLandmark">Delete landmark</b-button>
        </div>
        <p>View all objects in the database</p>
        <b-button v-on:click="onClickViewObjects">View all objects</b-button>
        <b-button v-on:click="onClickHideObjects">Hide objects</b-button>
        <div v-if="showObjects">
            <b-table striped hover :items="objectResults"></b-table>
        </div>
        <br><br><br>
    </div>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</div>
</template>

<script>
export default {
    name: 'DatabaseEntry',
    data() {
        return {
            PATH: "https://deadpeople.herokuapp.com/",
            location: "",
            showGraveDialog: false,
            showLandmarkDialog: false,
            showObjects: false,
            lastName: "",
            firstName: "",
            middleName: "",
            DOBirth: "",
            DODeath: "",
            DOBurial: "",
            description: "",
            hasPhotos: false,
            objectResults: [],
        }
    },
    methods: {
        async onClickGrave() {
            this.showGraveDialog = true;
            this.showLandmarkDialog = false;
        },
        async onClickLandmark() {
            this.showGraveDialog = false;
            this.showLandmarkDialog = true;
        },
        async onClickAddGrave() {
            let params = {
                type: "Grave",
                location: this.location,
                lastName: this.lastName,
                firstName: this.firstName,
                middleName: this.middleName,
                DOBirth: this.DOBirth,
                DODeath: this.DODeath,
                DOBurial: this.DOBurial,
            }
            let url = new URL(this.PATH + "db-add-grave");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            let response = await this.fetchAsync(url);
        },
        async onClickDeleteGrave() {
            let params = {
                type: "Grave",
                location: this.location,
            }
            let url = new URL(this.PATH + "db-delete-object");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            let response = await this.fetchAsync(url);
        },
        async onClickAddLandmark() {
            let params = {
                type: "Landmark",
                location: this.location,
                description: this.description,
                hasPhotos: this.hasPhotos,
            }
            let url = new URL(this.PATH + "db-add-landmark");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            let response = await this.fetchAsync(url);
        },
        async onClickDeleteLandmark() {
            let params = {
                type: "Landmark",
                location: this.location,
            }
            let url = new URL(this.PATH + "db-delete-object");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            let response = await this.fetchAsync(url);
        },
        async onClickViewObjects() {
            let url = new URL(this.PATH + "db-view-objects");
            let response = await this.fetchAsync(url);
            if (response != undefined) {
                response.forEach(result => {
                    this.objectResults.push({
                        Id: result.object_id,
                        Type: result.type,
                        Location: result.location,
                    });
                });
                this.showObjects = true;
            }
        },
        onClickHideObjects() {
            this.showObjects = false;
            this.objectResults = [];
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
.text-box {
    margin-top: 20;
}
</style>
