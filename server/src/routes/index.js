const router = require('express').Router()
const bankRoute = require('./bank.route')
const mortgageRoute = require('./mortgage.route')
const userRoute = require('./user.route')

router.use(bankRoute)
router.use(mortgageRoute)
router.use(userRoute)

module.exports = router