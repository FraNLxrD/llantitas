const express = require("express");
const userRouter = express.Router();

//CONTROLADOR
const userController = require("../controllers/userController")

userRouter.get("/login", userController.login);

module.exports = userRouter;