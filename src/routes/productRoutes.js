const express = require("express");
const productRouter = express.Router();

//CONTROLADOR
const productController = require("../controllers/productController")

productRouter.get("/form",productController.formget)

module.exports = productRouter;