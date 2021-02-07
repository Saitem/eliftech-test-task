const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    _id: ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User