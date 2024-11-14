// REQUIRE DATABASE
const db = require("../database/models");
const path = require("path");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const PATH_PUBLIC_IMAGES = path.join(__dirname, "../../public/img/users/");
const {
    Console
} = require("console");

const userController = {
    loginView: (req, res) => {
        const showLinks = req.session.usuario ? true : false
        res.render("user/login", {
            showLinks,
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
    },
    miPerfil: (req,res)=>{
        const { usuario } = req.session;
        const showLinks = req.session.usuario ? true : false;

        const id = usuario.id;

        db.Users.findByPk(id)
            .then((user) => {
                res.render("user/profile", {
                    miperfil: user,
                    idUsuario: usuario.id,
                    showLinks,
                });
            })
            .catch((err) => console.log(err));
    },
    editView: (req,res)=>{
        const { usuario } = req.session;
        const showLinks = req.session.usuario ? true : false;
        const id = usuario.id;
        db.Users.findByPk(id)
            .then((user) => {
                res.render("user/edit", {
                    miperfil: user,
                    idUsuario: usuario.id,
                    showLinks,
                });
            })
            .catch((err) => console.log(err));
    },
    edit: (req,res)=>{
        const { id } = req.params;
        const fileUpload = req.file;
        const { username, email, password } = req.body;

        const editedUser = {};

        if (username){
            editedUser.userName = username
        }
        if (email){
            editedUser.email = email
        }
        if (password) {
            editedUser.password = bcryptjs.hashSync(password, 10);
        }
        if (fileUpload) {
            // asigno la nueva imagen a cargar
            editedUser.image = fileUpload.filename;

            // elimino la imagen anterior
            db.Users.findByPk(id).then((user) => {
                if (user) {
                    const pathFile = `${PATH_PUBLIC_IMAGES}${user.image}`;

                    // verifico si existe la imagen correspondiente al evento
                    const existFile = fs.existsSync(pathFile);

                    if (existFile) {
                        // Primero elimino la imagen correspondiente al evento
                        fs.unlinkSync(pathFile);
                    }
                }
            });
        }

        db.Users.update(editedUser, { where: { id } })
            .then((data) => {
                res.redirect(`/user/MyProfile/${id}`);
            })
            .catch((err) => console.log(err));
    }

}

module.exports = userController;