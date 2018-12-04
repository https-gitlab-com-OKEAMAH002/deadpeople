<template>

  <center>
  <br>
  <div class="info">
    <h2 id="title">Grove St. Map</h2>
  </div>
  <div class="info">
    <p>Scroll to zoom. Click and drag to pan.<br>Select a plot to view information.</p>
  </div>
  <b-modal ref="modalRef" @shown="modalShown" hide-footer size="lg">
    <b-container fluid>
      <div v-if="modalVisible">
        <PlotDetails v-bind:contents="plotContents"/>
      </div>
    </b-container>
  </b-modal>
  <div id="image-map"></div>
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
      plotContents: [],
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
      let response = await this.fetchAsync(new URL("http://localhost:3000/db-view-objects"));
      if (response != undefined) {
        let notables = [];
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
        response.forEach(result => {
          notables.push({
              id: result.object_id,
              type: result.type,
              location: result.location,
              X: locations[result.location - 1].X,
              Y: locations[result.location - 1].Y,
          });
        });
        return notables;
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
    setPlotContents: function(contents) {
      this.plotContents = contents;
    }
  },
  async mounted () {
    let notables = await this.fetchNotables();
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
      minZoom: 1,
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
    // icons
    const notableIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/sketsdever/deadpeople/master/vue_src/src/assets/star_icon.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

    let fetchAsync = this.fetchAsync;
    let showModal = this.showModal;
    let setPlotContents = this.setPlotContents;

    async function onClickPlot(plotNumber) {
      console.log("clicked plot! plotNumber: ", plotNumber);
      await plots[plotNumber - 1].forEach(async function(notable) {
        let url = new URL("http://localhost:3000/db-fetch-object-for-id");
        let params = {
          id: notable.id,
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        let response = await fetchAsync(url);
        console.log(response);
        setPlotContents(response);
        // TODO: Put information from this object in a modal :) Will also want to specifically query Graves table.
      });
      showModal();
    }

    await notables.forEach(async function(notable) {
      if (plots[notable.location - 1] == "EMPTY") {
        let marker = L.marker(map.unproject([w*notable.X, h*notable.X], pzoom), {icon: notableIcon}).addTo(map);
        let button = document.createElement("button");
        let buttontext = document.createTextNode("Click to view plot details");
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
  width: 80%;
  height: 500px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
}

.info {
  margin: 0 auto;
  background-color: #d3d3d3;
  width: 400px;
  height: auto;
}
</style>
