const express = require("express");
const userRouter = express.Router();

//CONTROLADOR
const userController = require("../controllers/userController")

userRouter.get("/login", userController.login);
userRouter.get("/register",userController.registerView)
userRouter.post("/register",userController.register)



module.exports = userRouter;