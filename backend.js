
const { json } = require('body-parser')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const got = require('got')
app.use(express.static('public'))

io.on('connection', function (socket) {
  console.log('a socket connected')
});


const port = 3000
const satellites = [
    {
        "name": "iss",
        "id": 25544
    }
];
const sats = { 25544: { "name": "iss", "id": 25544, "latitude": -8.8793263339762, "longitude": 93.654379963169, "altitude": 421.00176590277, "velocity": 27576.313989786, "visibility": "daylight", "footprint": 4512.5564883758, "timestamp": 1618658547, "daynum": 2459321.9739236, "solar_lat": 10.647090991865, "solar_lon": 9.2729724961743, "units": "kilometers" } }

setInterval(async () => {
    const response = await got('https://api.wheretheiss.at/v1/satellites/25544').then(res => JSON.parse(res.body))
    sats[25544] = response;
    io.emit('satellite', sats);
}, 1000)


app.get('/', (req, res) => {
    res.sendfile('public/index.html');
})


http.listen(3000, function () {
    console.log('listening on *:3000');
});

//this is how you do in traditional way
// app.get('/satellites/:esma', (req, res) => {
//     res.json(sats[req.params.esma]);
// })
// app.get('/satellites', (req, res) => {
//     res.json(satellites);
// })


