const { StatusCodes } = require("http-status-codes")
const { NotFound } = require("../Errors")
const Cart = require("../models/cart")
const Product = require("../models/products")

const addProductToCart = async (req, res) => {
    req.body.userId = req.user.userId
    const product = await Cart.create(req.body)
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    const userId = req.user.userId
    const product = await Cart.findOneAndDelete({productId: id, userId })
    res.status(StatusCodes.OK).json({product})
}
const updateProductQuantity = async (req, res) => {
    const id = req.params.id
    const userId = req.user.userId
    const product = await Cart.findOneAndUpdate({productId: id, userId }, req.body, {new: true, runValidators: true})
    if(!product){
        throw new NotFound("Product not found in your cart")
    }
    res.status(StatusCodes.OK).json({product})

}
const getCartProducts = async (req, res) => {
    const userId = req.user.userId
    const products = await Cart.find({productId: req.params.id, userId })
    if(!products){
        throw new NotFound("No product found in your cart")
    }
    res.status(StatusCodes.OK).json({products})
}
const getSingleCartProduct = async (req, res) => {
    const id = req.params.id
    const userId = req.user.userId
    const product = await Cart.findOne({_id: id, userId })
    if(!product){
        throw new NotFound("Product not found in your cart")
    }
    res.status(StatusCodes.OK).json({product})
}

module.exports = {
    getSingleCartProduct,
    getCartProducts,
    deleteProduct,
    updateProductQuantity,
    addProductToCart
}