const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    items: {
        type: Object,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Order", OrderSchema)