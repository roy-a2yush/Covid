const fs = require('fs')

const PlasmaDonor = require('../models/Plasma')
const plasmaToDB = require('../helpers/plasma.js')

exports.createPlasmaDonor = async (req, res, next) => {

    //add verification for all fields
    var newPlasmaDonor = {
        Name: req.body.name,
        State: req.body.state,
        District: req.body.district,
        Pincode: req.body.pincode,
        Contact: req.body.contact,
        Email: req.body.email,
        PerWeek: req.body.perWeek,
    }

    newPlasmaDonor = new PlasmaDonor(newPlasmaDonor)

    plasmaToDB.upload(req, res, newPlasmaDonor)

}