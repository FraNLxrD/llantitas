const express = require("express");
const productRouter = express.Router();
const { uploadProduct} = require("../config/multer.config")
//CONTROLADOR
const productController = require("../controllers/productController")

productRouter.get("/sell",productController.formget)
productRouter.post("/sell",uploadProduct.single("image"),productController.storeProduct)

module.exports = productRouter;