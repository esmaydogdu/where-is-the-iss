const socket = io();

//this is how you do with traditional way//
//const baseUrl = 'http://localhost:3000/satellites/';
//let satId = '';
const map = L.map('issMap').setView([0, 0], 1);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileURL, {
    attribution: attribution,
});
const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

tiles.addTo(map);
socket.on('satellite', sats => { 
    const { latitude, longitude } = sats[25544];
    marker.setLatLng([latitude, longitude])
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
 })

//this is how you do with traditional way//

// async function getISSSat() {
//     const response = await fetch(baseUrl);
//     const data = await response.json();
//     satId = data[0].id
//     getISS(satId);
//     setInterval(() => {
//         getISS(satId);
//     }, 1000)
// }

// async function getISS(satId) {
//     const response = await fetch(`${baseUrl}${satId}`);
//     const data = await response.json();
//     const { latitude, longitude } = data;

//     marker.setLatLng([latitude, longitude])

//     document.getElementById('lat').textContent = latitude;
//     document.getElementById('lon').textContent = longitude;

// }

//getISSSat();