const jwt = require('jsonwebtoken')
const config = require('../../config.json')

exports.authToken = (req, res, next) => {
    const token = req.header('access_token')
    jwt.verify(token, config.common.TOKEN_SECRET, (err, decoded) => {
        req.mortgage = decoded
        next()
    })
}