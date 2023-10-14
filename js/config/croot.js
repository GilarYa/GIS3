import {map} from './peta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from '../controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from '../controller/cog.js';


document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("https://asia-southeast2-gilartest.cloudfunctions.net/gilarch3") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("https://asia-southeast2-gilartest.cloudfunctions.net/gilarch3") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("https://asia-southeast2-gilartest.cloudfunctions.net/gilarch3") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

// import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
// import { Vector as VectorLayer } from 'https://cdn.skypack.dev/ol/layer.js';
// import GeoJSON from 'https://cdn.skypack.dev/ol/format/GeoJSON.js';

// // Definisikan URL GeoJSON untuk masing-masing jenis fitur
// const polygonGeoJSONUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/geojson.json';
// const lineStringGeoJSONUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/geojson.json';
// const pointGeoJSONUrl = 'https://raw.githubusercontent.com/harisriyoni/gis/main/geojson.json';

// Buat sumber vektor dan lapisan vektor untuk masing-masing jenis fitur
const waypointSource = new ol.source.Vector({
  url: './Aceh.json',
  format: new ol.format.GeoJSON()
});

const lineStringSource = new ol.source.Vector({
  url: 'Aceh.json',
  format: new ol.format.GeoJSON()
});

const polylineSource = new ol.source.Vector({
  url: 'Aceh.json',
  format: new ol.format.GeoJSON()
});

const waypointLayer = new ol.layer.Vector({
  source: waypointSource,
  style: new ol.style.Style({
      image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
              color: 'purple'
          })
      })
  })
});

const lineStringLayer = new ol.layer.Vector({
  source: lineStringSource,
  style: new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: 'blue',
          width: 2
      })
  })
});

const polylineLayer = new ol.layer.Vector({
  source: polylineSource,
  style: new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: 'black',
          width: 5
      })
  })
});



// Tambahkan lapisan-lapisan ke peta
map.addLayer(polygonLayer);
map.addLayer(lineStringLayer);
map.addLayer(pointLayer);

onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
