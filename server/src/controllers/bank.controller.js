const mongoose = require('mongoose')

const Bank = require('../models/bank.schema')

exports.create = (req, res) => {
    const bank = new Bank({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    })
    bank
        .save()
        .then(bank => res.status(200).send(bank))
        .catch(err => res.status(500).send(err))
}

exports.getAll = (req, res) => {
    Bank.find({})
        .then(banks => res.status(200).send(banks))
        .catch(err => res.status(500).send(err))
}

exports.edit = (req, res) => {
    const bank = new Bank({ ...req.body })

    Bank
        .updateOne({ _id: req.params.id }, bank)
        .then(x => res.status(200).send('Bank was updated'))
        .catch(err => res.status(500).send(err))
}

exports.remove = (req, res) => {
    Bank.deleteOne({ _id: req.params.id }, err => {
        if (err)
            return res.send(err)
        else
            return res.status(200).send('Bank was be deleted')
    })
}