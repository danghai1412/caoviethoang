const mongoose = require("mongoose")
const MarvelModel = require("./MarvelModel")

var NarutoSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: String,
    material: String

})

var NarutoModel = mongoose.model('Do choi naruto', NarutoSchema, 'naruto')
module.exports = NarutoModel