const express = require("express");
const userRouter = express.Router();
const { uploadUser} = require("../config/multer.config")
const log = require("../config/logMiddelWare");
const guest = require("../config/guestMiddelWare")

//CONTROLADOR
const userController = require("../controllers/userController")

userRouter.get("/login", guest,userController.loginView);
userRouter.post("/login",userController.login)
userRouter.get("/register",userController.registerView)
userRouter.post("/register",uploadUser.single("image"),userController.register)



module.exports = userRouter;