const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const UserData = mongoose.model('UserData', UserSchema);

module.exports= UserData;