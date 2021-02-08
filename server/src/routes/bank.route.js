const router = require('express').Router()
const bankController = require('../controllers/bank.controller')
const authMiddleware = require('../middleware/authToken.middleware')

router.post('/create', bankController.create)
router.get('/', bankController.getAll)
router.put('/edit/:id', bankController.edit)
router.delete('/remove/:id', bankController.remove)

module.exports = router