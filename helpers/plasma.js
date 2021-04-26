const PlasmaDonor = require('../models/Plasma')

exports.upload = async function(req, res, newPlasmaDonor) {
    try {
        const uploadResult = await newPlasmaDonor.save()
        res.json(uploadResult)
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.find = async function(req, res, findParameter) {
    PlasmaDonor.find(findParameter).exec(function(err, doc) {
        if(err) {
            res.status(400).send(err)
        }
        if(doc.length) {
            res.status(200).send(doc)
        } else {
            res.status(404).send("Not found")
        }
    })
}