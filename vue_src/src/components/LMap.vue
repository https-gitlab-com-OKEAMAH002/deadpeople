<template>

  <center>
  <h2>Grove St. Map</h2>
  <p>Scroll to zoom. Click and drag to pan.<br>Select a plot to view information.</p>
  <div id="image-map"></div>
  </center>

</template>

<script>
import * as L from "leaflet";

export default {
  name: 'LMap',
  mounted () {
    // Using leaflet.js to pan and zoom a big image.
    // dimensions and url of the image
    const w = 2000,
        h = 1125,
        url = 'https://raw.githubusercontent.com/sketsdever/deadpeople/master/vue_src/src/assets/grovest_map.png';
    const maxZoom = 3, pzoom = maxZoom - 1; // use pzoom for unprojecting

    // init map
    let map = L.map('image-map', {
      minZoom: 1,
      maxZoom: maxZoom,
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
        iconUrl: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
    // pre-placed markers
    // maybe want to hide markers if zoom < 2 ?
    let marker1 = L.marker(map.unproject([w/2+12, h/2], pzoom), {icon: notableIcon}).addTo(map);
    let marker2 = L.circleMarker(map.unproject([w/2-32, h/2-3], pzoom)).addTo(map);
    L.circleMarker(map.unproject([w/2-32, h/2-20], pzoom)).addTo(map);
    let circle1 = L.circleMarker(map.unproject([w/2-32, h/2-36], pzoom), {radius: 7}).addTo(map);
    L.circleMarker(map.unproject([w/2-32, h/2-54], pzoom), {radius: 7}).addTo(map);
    // click event
    marker1.bindPopup('<p>Notable person!</p><br><br><br>');
    marker2.bindPopup('<p>Plot Number</p>');
    circle1.bindPopup('<p>Plot Number</p>');
  }
}
</script>

<style>
#image-map {
  width: 80%;
  height: 600px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
