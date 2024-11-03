// REQUIRE DATABASE
const db = require("../database/models")

const mainController= {
    home: (req,res) =>{
        const { usuario } = req.session;
        const showLinks = req.session.usuario ? true : false;
        db.Products.findAll()
            .then((products) => {
                res.render("product/index", {
                    products: products,
                    showLinks,
                    idUsuario: usuario ? usuario.id : 0
                });
            })
    }
}

module.exports = mainController;