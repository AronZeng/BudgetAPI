const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stocks: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('User' , userSchema)