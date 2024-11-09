const express = require("express");
const productRouter = express.Router();
const { uploadProduct} = require("../config/multer.config")
const log = require("../config/logMiddelWare")
//CONTROLADOR
const productController = require("../controllers/productController")

productRouter.get("/sell",log,productController.formget)
productRouter.post("/sell",uploadProduct.single("image"),productController.storeProduct)
productRouter.get("/:id/detail",log,productController.detalleProducto);
productRouter.get("/search",productController.search)
productRouter.delete("/destroy/:id", productController.destroy);
module.exports = productRouter;