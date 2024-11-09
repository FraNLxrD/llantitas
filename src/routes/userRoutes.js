const express = require("express");
const userRouter = express.Router();
const { uploadUser} = require("../config/multer.config")
const log = require("../config/logMiddelWare");
const guest = require("../config/guestMiddelWare")

//CONTROLADOR
const userController = require("../controllers/userController")

userRouter.get("/login", guest,userController.loginView);
userRouter.post("/login",userController.login)
userRouter.get("/register",guest,userController.registerView)
userRouter.post("/register",uploadUser.single("image"),userController.register)
userRouter.get("/logout/", userController.logout);
userRouter.get("/myProfile/:id", log, userController.miPerfil);
userRouter.get("/edit/:id", log, userController.editView)
userRouter.put("/edit/:id",uploadUser.single("image"),userController.edit);



module.exports = userRouter;