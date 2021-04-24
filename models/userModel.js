const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model('Users', userShema);