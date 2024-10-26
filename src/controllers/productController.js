// REQUIRE DATABASE
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const Op = db.Sequelize.Op;

const productController= {
    formget: (req,res) => {
        res.render("product/create")
    },
    storeProduct: (req,res)=>{
        const form = req.body
        const fileUpload= req.file

        db.Products.create({
            prod_name: form.prod_name,
            image: fileUpload.filename, // El nombre del archivo subido
            brand: form.brand,
            price: Number(form.price), // Asegúrate de convertir el precio a número
            stock: Number(form.stock) 
        }).then(() => {
            res.redirect("/"); // Redirigir a la página de productos después de guardar
        })
        .catch((err) => console.log(err));

    }
}

module.exports = productController;