const mongoose = require('mongoose')
const User = require('../models/user.schema')
const Mortgage = require('../models/mortgage.schema')

exports.create = (req, res) => {
    User.findById({ _id: req.mortgage._id })
        .then(() => {
            const mortgage = new Mortgage({
                _id: new mongoose.Types.ObjectId(),
                ...req.body,
                user_id: req.params.user_id
            })

            mortgage
                .save()
                .then(mort =>
                    res.status(200).send(mort)
                ).catch(err =>
                    res.status(500).send(err)
                )
        }).catch(err => res.status(500).send(err))
}

exports.getAll = (req, res) => {
    console.log('je;;')
    User.findById({ _id: req.mortgage._id })
        .then(() => {
            Mortgage.find({ user_id: req.params.user_id })
                .exec((err, mortgage) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    res.send(mortgage)
                })
        })
}

exports.remove = (req, res) => {
    Mortgage.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.status(200).send('Mortgage was be deleted!')
        }
    })
}