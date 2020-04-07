const express = require ('express');
const router = express.Router();

const Courier = require('../models/courier.model')

let vehicle = null;

router.get('/', (req, res) => {
    if (vehicle === null) {
        Courier.find((err, couriers) => {
            if(err) {
                console.log(err);
            } else {
                let lat = 54.30001;
                let lng = 18.60001;    
    
                for (let i = 0; i < couriers.length; i++) {
                    let wayLat = Math.floor((Math.random()) * 10000) / 100000;
                    let wayLng = Math.floor((Math.random()) * 10000) / 100000;
                    couriers[i].lat = lat + wayLat;
                    couriers[i].lng = lng + wayLng;
                }
                
                res.json(couriers)
            }
        })
    } else {
        Courier.find({vehicle: vehicle}, (err, couriers) => {
            if (err) {
                console.log(err);
            } else {
                let lat = 54.30001;
                let lng = 18.60001;    
    
                for (let i = 0; i < couriers.length; i++) {
                    let wayLat = Math.floor((Math.random()) * 10000) / 100000;
                    let wayLng = Math.floor((Math.random()) * 10000) / 100000;
                    couriers[i].lat = lat + wayLat;
                    couriers[i].lng = lng + wayLng;
                }
                
                res.json(couriers)
            }
        })
    }
    
})

router.post('/', (req, res) => {
    vehicle = req.body.vehicleType
    res.json(vehicle)
})

module.exports = router;