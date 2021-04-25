const express = require('express')
const router = express.Router()
const Plasma = require('../controllers/plasma')

router.post('/', Plasma.createPlasmaDonor)

module.exports = router