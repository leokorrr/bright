const mongoose = require('mongoose');

let Courier = require('../models/courier.model')

mongoose.connect('mongodb://admin:admin12345@ds135036.mlab.com:35036/bright', { useNewUrlParser: true}, (err)=>{
    if (err) throw err;
    console.log('server.js: database connected');
})

let name = 'Maciej';
let vehicle = 'car'
let lat = '';
let lng = '';


function insertCourier (name,  vehicle, lat, lng) {
    let courier = new Courier ({
        name: name,
        vehicle: vehicle,
        lat: lat,
        lng: lng
    })

    courier.save((err) => {
        if (err) throw err;
        console.log(`New courier ${name} was succesfully added`);
    })
}

insertCourier(name, vehicle, lat, lng);