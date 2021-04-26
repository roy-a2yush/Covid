const express = require('express')
const router = express.Router()
const Plasma = require('../controllers/plasma')

router.post('/', Plasma.createPlasmaDonor)
router.get('/', Plasma.findAllPlasmaDonors)
router.get('/:id', Plasma.findAllPlasmaDonors)


module.exports = router