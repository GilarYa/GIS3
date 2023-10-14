import { get } from "https://jscroot.github.io/api/croot.js";
import {responseData} from "../controller/controller.js"
import {URLGeoJson} from "../controller/template.js"
import {map} from './peta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from '../controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from '../controller/cog.js';
// import
document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("gisTable").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/GilarYa/GISLAR/main/polyline.json") // Ganti "data.json" dengan nama file JSON Anda
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
    const pointTable = document.getElementById("gisTable2").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/GilarYa/GISLAR/main/polygon.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.nameb;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("gisTable3").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/GilarYa/GISLAR/main/waypoint.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.name ;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});
//panggil
onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
get(URLGeoJson,responseData);

  //download data point, polygon, dan polyline
  const pointSource = new ol.source.Vector({
    url: URLGeoJson,
    format: new ol.format.GeoJSON()
});

//buat layer untuk point, polygon, dan polyline
const layerpoint = new ol.layer.Vector({
    source: pointSource,
    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: '../kebutuhan/img/icon.png', 
            scale: 0.5, 
            opacity: 1
        })
    })
});

const polylayer = new ol.layer.Vector({
    source: pointSource,
    style: function (feature) {
        const featureType = feature.getGeometry().getType();
        
       
        if (featureType === 'Polygon') {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'orange', 
                    width: 2
                })
            });
        } else {
            
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'purple', 
                    width: 3
                })
            });
        }
    }
});

map.addLayer(polylayer);
map.addLayer(layerpoint);