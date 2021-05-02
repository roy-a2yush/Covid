const express = require('express')
const router = express.Router()
const Email = require('../controllers/email/email')

router.post('/request', Email.requestEmail)

module.exports = router