<template>

  <center>
  <br>
  <div class="text-box">
    <h2 id="title">Grove St. Map</h2>
  </div>
  <div class="text-box">
    <p>Scroll to zoom. Click and drag to pan.<br>Select a plot to view information.</p>
  </div>
  <b-modal ref="modalRef" @shown="modalShown" hide-footer size="lg">
    <b-container fluid>
      <div v-if="modalVisible">
        <PlotDetails v-bind:graves="graves" v-bind:landmarks="landmarks"/>
      </div>
    </b-container>
  </b-modal>
  <div id="image-map"></div>
  <br><br><br><br>
  </center>

</template>

<script>
import L from "leaflet";
import PlotDetails from './PlotDetails.vue';

export default {
  name: 'LMap',
  data() {
    return {
      modalVisible: false,
      graves: [],
      landmarks: [],
    }
  },
  components: {
    PlotDetails,
  },
  methods: {
    async fetchAsync(url) {
        try {
            let response = await fetch(url);
            let data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    async fetchNotables() {
      let gravesResponse = await this.fetchAsync(new URL("http://localhost:3000/db-view-graves"));
      let landmarksResponse = await this.fetchAsync(new URL("http://localhost:3000/db-view-landmarks"));
      if (gravesResponse != undefined && landmarksResponse != undefined) {
        let notableGraves = [];
        let notableLandmarks = [];
        let locations = [];
        let locationResponse = await this.fetchAsync(new URL("http://localhost:3000/db-fetch-locations"));
        if (locationResponse != undefined) {
          locationResponse.forEach(locationResult => {
            locations.push({
              X: locationResult.relative_x,
              Y: locationResult.relative_y,
            });
          });
        }
        gravesResponse.forEach(result => {
          notableGraves.push({
            type: "grave",
            id: result.object_id,
            last_name: result.last_name,
            first_name: result.first_name,
            middle_name: result.middle_name,
            date_of_birth: result.date_of_birth.slice(0, 4),
            date_of_death: result.date_of_death.slice(0, 4),
            date_of_burial: result.date_of_burrial.slice(0, 4),
            is_notable: result.is_notable,
            location: result.location,
            X: locations[result.location - 1].X,
            Y: locations[result.location - 1].Y,
          });
        });
        landmarksResponse.forEach(result => {
          notableLandmarks.push({
            type: "landmark",
            id: result.object_id,
            description: result.description,
            has_photos: result.has_photos,
            location: result.location,
            X: locations[result.location - 1].X,
            Y: locations[result.location - 1].Y,
          });
        });
        return [notableGraves, notableLandmarks];
      }
    },
    showModal() {
      this.$refs.modalRef.show();
    },
    modalShown: function() {
      this.modalVisible = true;
    },
    modalHidden: function() {
      this.modalVisible = false;
    },
    setPlotContents: async function(plotContents) {
      plotContents.forEach(item => {
        if (item.type == "grave") {
          this.graves.push(item);
        } else if (item.type == "landmark") {
          this.landmarks.push(item);
        }
      })
    },
    resetPlotContents: function() {
      this.graves = [];
      this.landmarks = [];
    }
  },
  async mounted () {
    let [notableGraves, notableLandmarks] = await this.fetchNotables();
    let plots = [];
    for (let i = 0; i < 1049; i++) {
      plots.push("EMPTY");
    }
    // Reference: http://kempe.net/blog/2014/06/14/leaflet-pan-zoom-image.html
    // Using leaflet.js to pan and zoom a big image.
    // dimensions and url of the image
    const w = 1400,
         h = 1398,
         url = 'https://raw.githubusercontent.com/sketsdever/deadpeople/master/vue_src/src/assets/grovest_map.png';
    const maxZoom = 3, pzoom = maxZoom - 1; // use pzoom for unprojecting
    // init map
    let map = L.map('image-map', {
      minZoom: 0,
      maxZoom: 3,
      center: [0, 0],
      zoom: 2,
      attributionControl: false,
      crs: L.CRS.Simple,
    });
    map.setView(map.unproject([w/2, h/2], pzoom));
    L.control.attribution().addAttribution("Image by Claire Gorman").addTo(map);
    // calculate the edges of the image, in coordinate space
    let southWest = map.unproject([0, h], pzoom);
    let northEast = map.unproject([w, 0], pzoom);
    let bounds = new L.LatLngBounds(southWest, northEast);
    // add the image overlay so that it covers the entire map
    L.imageOverlay(url, bounds).addTo(map);
    // tell leaflet that the map is exactly as big as the image
    map.setMaxBounds(bounds);

    let fetchAsync = this.fetchAsync;
    let showModal = this.showModal;
    let setPlotContents = this.setPlotContents;
    let resetPlotContents = this.resetPlotContents;
    let nextTick = this.$nextTick;
    let root = this.$root;

    async function onClickPlot(plotNumber) {
      resetPlotContents();
      setPlotContents(plots[plotNumber - 1]);
      showModal();
    }

    await notableGraves.forEach(async function(notable) {
      if (plots[notable.location - 1] == "EMPTY") {
        let marker = L.circleMarker(map.unproject([w*notable.X, h*notable.Y], pzoom), {radius: 7}).addTo(map);
        let button = document.createElement("button");
        let str = "Plot " + String(notable.location) + ": Click to view details";
        let buttontext = document.createTextNode(str);
        button.appendChild(buttontext);
        marker.bindPopup(button);
        button.addEventListener("click", async function() { await onClickPlot(notable.location); });
        plots[notable.location - 1] = [];
      }
      plots[notable.location - 1].push(notable);
    });

    await notableLandmarks.forEach(async function(notable) {
      if (plots[notable.location - 1] == "EMPTY") {
        let marker = L.circleMarker(map.unproject([w*notable.X, h*notable.Y], pzoom), {radius: 7}).addTo(map);
        let button = document.createElement("button");
        let str = "Plot " + String(notable.location) + ": Click to view details";
        let buttontext = document.createTextNode(str);
        button.appendChild(buttontext);
        marker.bindPopup(button);
        button.addEventListener("click", async function() { await onClickPlot(notable.location); });
        plots[notable.location - 1] = [];
      }
      plots[notable.location - 1].push(notable);
    });
  },
}
</script>

<style>
#image-map {
  width: 70%;
  height: 600px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
}
</style>
