const fs = require('fs')

const PlasmaDonor = require('../models/Plasma')
const plasmaToDB = require('../helpers/plasma.js')
const plasmaHelper = require('../managers/plasma')

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

exports.findAllPlasmaDonors = async (req, res, next) => {
    // var state = req.body.state
    // var id = req.params.id
    // var pincode = req.body.pincode
    // var district = req.body.district
    // var name = req.body.name
    
    // var findParameter = plasmaHelper.assembleFindParameter(state, id, pincode, district, name)
    // plasmaToDB.find(req, res, findParameter)
    var blood = req.body.blood
    var state = req.body.state
    // Add authentication
    plasmaToDB.search(res, blood, state)
}