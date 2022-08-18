const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide customer ID"]
    },
    quantity: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
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
    category: String,
})

module.exports = mongoose.model("Cart", cartSchema)