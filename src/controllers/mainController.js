// REQUIRE DATABASE
const db = require("../database/models")

const mainController= {
    home: (req,res) =>{
        db.Products.findAll()
            .then((products) => {
                res.render("product/index", {
                    products: products,
                });
            })
    }
}

module.exports = mainController;