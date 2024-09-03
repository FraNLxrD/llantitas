const express = require("express");
const router = express.Router();

//CONTROLADOR
const mainController = require("../controllers/mainController")

router.get("/", mainController.home);

module.exports = router;