const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId

const MortgageSchema = new Schema({
    _id: ObjectId,
    initialLoan: Number,
    downPayment: Number,
    historyTable: [{
        month: Number,
        totalPayment: Number,
        interestPayment: Number,
        loanBalance: Number,
        equity: Number
    }],
    bank: {
        name: String,
        interestRate: Number,
        loanTerm: Number
    }
})

const Mortgage = mongoose.model('Mortgage', MortgageSchema)

module.exports = Mortgage