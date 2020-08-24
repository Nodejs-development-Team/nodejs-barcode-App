const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
 
// userSL is name of database
module.exports = mongoose.model('userSL', userSchema)