const { getAllProducts, getSingleProduct, getCategories, getProductsInCategories, uploadProductImage, updateProduct, deleteProduct, createProduct } = require("../controllers/product")
const upload = require("../utils/multer")

const router = require("express").Router()

router.route("/").get(getAllProducts).post(createProduct)
router.get("/categories", getCategories)
router.route("/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct)
router.post("/image/:id", upload.single("productImage"), uploadProductImage)
router.get("/categories/:category", getProductsInCategories)

module.exports = router