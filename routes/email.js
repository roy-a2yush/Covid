const express = require('express')
const router = express.Router()
const Email = require('../controllers/email/email')

router.post('/', Email.email)

module.exports = router