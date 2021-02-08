const router = require('express').Router()
const mortgageController = require('../controllers/mortgage.controller')


router.post('/mortgage', mortgageController.create)


module.exports = router