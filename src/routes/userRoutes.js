const express = require("express");
const userRouter = express.Router();
const { uploadUser} = require("../config/multer.config")
//CONTROLADOR
const userController = require("../controllers/userController")

userRouter.get("/login", userController.login);
userRouter.get("/register",userController.registerView)
userRouter.post("/register",uploadUser.single("image"),userController.register)



module.exports = userRouter;