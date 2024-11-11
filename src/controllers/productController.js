// REQUIRE DATABASE
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const destroy = require("destroy");
const PATH_PUBLIC_IMAGES = path.join(__dirname, "../../public/img/products/");
const Op = db.Sequelize.Op;

const productController= {
    formget: (req,res) => {
        const {
            usuario
        } = req.session;
        const showLinks = req.session.usuario ? true : false;
        res.render("product/create",{
            showLinks,
            idUsuario: usuario ? usuario.id : 0
        })
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

    },
    detalleProducto: (req,res)=>{
        const {
            id
        } = req.params;

        const {
            usuario
        } = req.session;
        const showLinks = req.session.usuario ? true : false;

        db.Products.findByPk(id)
            .then((prod) => {
                res.render("product/productDetail", {
                    prod,
                    showLinks,
                    idUsuario: usuario ? usuario.id : 0,
                });
            })
            .catch((err) => console.log(err));
    },
    search: async(req,res)=>{
        const parametro = req.query.search;
        const {
            usuario
        } = req.session;
        const showLinks = req.session.usuario ? true : false;
        try {
            const results = await db.Products.findAll({
                where: {
                    prod_name: {
                        [Op.like]: `%${parametro}%`,
                    },
                },
            });
            res.render('product/search', {
                results,
                showLinks,
                parametro,
                idUsuario: usuario ? usuario.id : 0
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en la búsqueda');
        }
    },
    destroy: (req,res)=>{
        const {
            id
        } = req.params;

        db.Products.findByPk(id)
            .then((prod) => {
                const pathFile = `${PATH_PUBLIC_IMAGES}${prod.image}`;

                // verifico si existe la imagen correspondiente al evento
                const existFile = fs.existsSync(pathFile);

                if (existFile) {
                    // Primero elimino la imagen correspondiente al evento
                    fs.unlinkSync(pathFile);

                    // elimino el evento de la base de datos
                    db.Products.destroy({
                            where: {
                                id
                            }
                        })
                        .then((data) => {
                            res.redirect("/");
                        })
                        .catch((err) => console.log(err));
                } else {
                    console.log("La imagen no existe");
                }
            })
            .catch((err) => console.log(err));
    }
}

module.exports = productController;