const jwt = require('jsonwebtoken')

exports.authToken = (req, res, next) => {
    const token = req.header('access_token')
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        req.mortgage = decoded
        next()
    })
}