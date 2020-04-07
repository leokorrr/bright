const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Courier = new Schema ({
    name: {
        type: String,
        require: true,
    },
    vehicle: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    }
})

module.exports = mongoose.model('Courier', Courier)