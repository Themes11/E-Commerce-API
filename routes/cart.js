const express = require("express")
const { addProductToCart, deleteProduct, updateProductQuantity, getSingleCartProduct, getCartProducts } = require("../controllers/cart")
const cartRouter = express.Router()

cartRouter.route("/:id").delete(deleteProduct).patch(updateProductQuantity).get(getSingleCartProduct)
cartRouter.route("/").get(getCartProducts).post(addProductToCart)

module.exports = cartRouter