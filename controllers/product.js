const { StatusCodes } = require("http-status-codes")
const { NotFound } = require("../Errors")
const { asyncWrapper } = require("../Middleware/async")
const Product = require("../models/products")
const {uploadToCloudinary, deleteFromCloudinary} = require("../utils/cloud")
const getAllProducts = async (req, res) => {
    const {page} = req.query
    const pageNumber = Number(page) || 1
    const limit = 10
    const skipItems = limit*(pageNumber-1)  
    const products = await Product.find().sort("price").skip(skipItems).limit(10)
    res.status(StatusCodes.OK).json(products)
}

const getSingleProduct = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const product = await Product.findOne({"id": Number(id)})
    if(!product){
        throw new NotFound("Product not found")
    }
    res.status(StatusCodes.OK).json(product)
})

const createProduct = asyncWrapper(
    async (req, res) => {
        const products = Product.create(...req.body)
        res.status(StatusCodes.OK).json({products})
    }
)

const updateProduct = async (req, res) => {
    const {id} = req.params
    const product = await Product.findOneAndUpdate({"id": id}, req.body, { new: true, runValidators: true })
    if(!product){
        throw new NotFound("Product to be updated can not be found")
    }
    res.status(StatusCodes.OK).json({product})

}

const deleteProduct = async (req, res) => {
    const {id, imageId} = req.params
    const product = await Product.findOneAndDelet({"id": id})
    if(!product){
        throw new NotFound("Product to be deleted can not be found")
    }
    await deleteFromCloudinary(imageId)
    res.status(StatusCodes.OK).json({product})
}

const getCategories = async (req, res) => {
    const categories = await Product.distinct("category")
    res.status(StatusCodes.OK).json(categories)
}

const getProductsInCategories = async (req, res) => {
    const {category} = req.params
    const products = await Product.find({"category": category})
    if(!products) {
        throw new NotFound("No product found for this query")
    }
    res.status(StatusCodes.OK).json({products})

}
const uploadProductImage = async (req, res) => {
    const {id} = req.params
    const productImage = await uploadToCloudinary(req.file.path, "Ecommerce")
    const product = await Product.findOneAndUpdate({"id": id}, {"image": productImage.url}, {new: true, runValidators: true})
    res.status(StatusCodes.OK).send({product})
}

const updateProductImage = async (req, res) => {
    const {id, imageId} = req.params
    await deleteFromCloudinary(imageId)
    const productImage = await uploadToCloudinary(req.file.path, "Ecommerce")
    const product = await Product.findOneAndUpdate({"id": id}, {"image": productImage.url}, {new: true, runValidators: true})
    res.status(StatusCodes.OK).send({product})
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getCategories,
    getProductsInCategories,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    createProduct
}