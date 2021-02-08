const mongoose = require('mongoose')
const User = require('../models/user.schema')
const Mortgage = require('../models/mortgage.schema')

exports.create = (req, res) => {
    const mortgage = new Mortgage({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    })
    console.log('jesd')
    mortgage
        .save()
        .then(mort => 
            res.status(200).send(mort)
        ).catch(err => 
            res.status(500).send(err)
        )
}