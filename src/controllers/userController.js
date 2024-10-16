// REQUIRE DATABASE
const db = require("../database/models");

const userController= {
    login: (req,res) =>{
        res.render("user/login")
    },
    registerView: (req,res) =>{
        res.render("user/register")
    },
    register: (req, res) => {
        console.log(req.body); // Para verificar qué datos se están recibiendo
        const { userName, email, password, image } = req.body;
        const newUser = { userName, email, password, image };
    
        db.Users.create(newUser)
            .then(() => {
                res.redirect("/user/login"); // Redirigir a la página de inicio de sesión
            })
            .catch((err) => console.log(err));
    }
    
}

module.exports = userController;