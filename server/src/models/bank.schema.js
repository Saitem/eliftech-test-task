const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId

const BankSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    maximumLoan: {
        type: Number,
        required: true
    },
    minimumDownPayment: {
        type: Number,
        required: true
    },
    loanTerm: {
        type: Number,
        required: true
    }
})

const Bank = mongoose.model('Bank', BankSchema)

module.exports = Bank