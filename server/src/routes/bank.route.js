const router = require('express').Router()
const bankController = require('../controllers/bank.controller')
const authMiddleware = require('../middleware/authToken.middleware')

router.post('/create', authMiddleware.authToken, bankController.create)
router.get('/', authMiddleware.authToken, bankController.getAll)
router.put('/edit/:id', authMiddleware.authToken, bankController.edit)
router.delete('/remove/:id', authMiddleware.authToken, bankController.remove)

module.exports = router