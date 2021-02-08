const router = require('express').Router()
const mortgageController = require('../controllers/mortgage.controller')
const authMiddleware = require('../middleware/authToken.middleware')

router.post('/mortgage/:user_id', authMiddleware.authToken, mortgageController.create)
router.get('/mortgage/:user_id', authMiddleware.authToken, mortgageController.getAll)
router.delete('/mortgage/:user_id/:id', authMiddleware.authToken, mortgageController.remove)

module.exports = router