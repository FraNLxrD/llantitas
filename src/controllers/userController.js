// REQUIRE DATABASE
const db = require("../database/models");
const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const {
    Console
} = require("console");

const userController = {
    loginView: (req, res) => {
        const showLinks = req.session.usuario ? true : false
        res.render("user/login", {
            showLinks
        })
    },
    login: async(req, res) => {
        const { email } = req.body;
        const contraseña= req.body.password;
        const showLinks = req.session.usuario ? true : false;

        console.log("Contraseña ingresada:", contraseña); // Para depuración
        
        console.log(await bcryptjs.hash(contraseña, 10,))
        db.Users.findOne({ where: { email } })
            .then((user) => {
                if (user) {
                    console.log("Usuario encontrado:", user.password)
                    const correctPassword = bcryptjs.compareSync(contraseña, user.password);

                    console.log("correcta", correctPassword);

                    if (correctPassword) {
                        console.log("SESSION INICIADA");
                        req.session.usuario = user;
                        return res.redirect("/");
                    }

                    return res.render("user/login", {
                        errors: {
                            email: {
                                msg: "LA CONTRASEÑA ES INCORRECTA",
                            },
                        },
                        showLinks,
                    });
                }

                return res.render("user/login", {
                    errors: {
                        email: {
                            msg: "USUARIO NO ENCONTRADO",
                        },
                    },
                    showLinks,
                });
            })
    },
    registerView: (req, res) => {
        const showLinks = req.session.usuario ? true : false;
        res.render("user/register", { showLinks });
    },
    register: async (req, res) => {
        console.log(req.body); // Para verificar qué datos se están recibiendo
        const {
            userName,
            email,
            password,
            image
        } = req.body;
        const fileUpload = req.file
        const hasshedPassword = await bcryptjs.hash(password, 10)
        console.log("Contrahasehada=", hasshedPassword)



        const newUser = {
            userName,
            email,
            password: hasshedPassword,
            image: fileUpload.filename
        };


        db.Users.create(newUser)
            .then(() => {
                res.redirect("/user/login"); // Redirigir a la página de inicio de sesión
            })
            .catch((err) => console.log(err));
    },
    logout: (req, res)=>{
        req.session.destroy();
        return res.redirect("/")
    }

}

module.exports = userController;