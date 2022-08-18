const mongoose = require("mongoose")

const   ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    colors: {
        type: Array
    },
    description: String,
    image: String,
    imageId: String,
    category: String,
    availability: String
})

module.exports = mongoose.model("Product", ProductSchema)