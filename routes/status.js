const express = require('express')
const router = express.Router()
const Status = require('../controllers/requestStatus')

router.get('/:id/:status', Status.updateStatus)


module.exports = router