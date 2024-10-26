// REQUIRE DATABASE
const db = require("../database/models");
const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");

const userController= {
    login: (req,res) =>{
        res.render("user/login")
    },
    registerView: (req,res) =>{
        res.render("user/register")
    },
    register: async (req, res) => {
        console.log(req.body); // Para verificar qué datos se están recibiendo
        const { userName, email, password, image } = req.body;
        const fileUpload = req.file
        const hasshedPassword = await bcryptjs.hash(password, 10)
        console.log("Contrahasehada=", hasshedPassword)
        


        const newUser = { userName, email, password:hasshedPassword, image: fileUpload.filename };


        db.Users.create(newUser)
            .then(() => {
                res.redirect("/user/login"); // Redirigir a la página de inicio de sesión
            })
            .catch((err) => console.log(err));
    }
    
}

module.exports = userController;