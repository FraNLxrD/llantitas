// REQUIRE DATABASE
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const destroy = require("destroy");
const PATH_PUBLIC_IMAGES = path.join(__dirname, "../../public/img/products/");
const Op = db.Sequelize.Op;

const productController = {
    formget: (req, res) => {
        const {
            usuario
        } = req.session;
        const showLinks = req.session.usuario ? true : false;
        res.render("product/create", {
            showLinks,
            idUsuario: usuario ? usuario.id : 0
        })
    },
    storeProduct: (req, res) => {
        const form = req.body
        const fileUpload = req.file

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
    detalleProducto: (req, res) => {
        const {
            id
        } = req.params;

        const {
            usuario
        } = req.session;
        const showLinks = req.session.usuario ? true : false;
        console.log(usuario)
        db.Products.findByPk(id)
            .then((prod) => {
                res.render("product/productDetail", {
                    prod,
                    showLinks,
                    idUsuario: usuario ? usuario.id : 0,
                    admin: usuario ? usuario.admin : undefined
                });
            })
            .catch((err) => console.log(err));
    },
    search: async (req, res) => {
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
    destroy: (req, res) => {
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
    },
    cartView: async (req, res) => {
        const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        const productIds = cart.map(item => item.productId);
        const queryerror = req.query.errorMsg
        const {
            usuario
        } = req.session;
        const showLinks = req.session.usuario ? true : false;

        try {
            const products = await db.Products.findAll({ // Corrección aquí
                where: {
                    id: productIds
                }
            });

            const cartDetails = cart.map(item => {
                const product = products.find(prod => prod.id === item.productId);
                return {
                    ...product.toJSON(),
                    quantity: item.quantity,
                    total: product.price * item.quantity
                };
            });
            const cartTotal = cartDetails.reduce((acc, item) => acc + item.total, 0).toFixed(2);


            res.render('product/cart', {
                cart: cartDetails,
                cartTotal,
                queryerror,
                showLinks,
                idUsuario: usuario ? usuario.id : 0,
            });
        } catch (error) {
            console.error("Error al recuperar productos del carrito:", error);
            res.status(500).send("Error al cargar el carrito.");
        }
    },
    Cart: (req, res) => {
        const {
            productId,
            quantity
        } = req.body;

        const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

        console.log(cart)

        const existingProduct = cart.find((prod) => parseInt(prod.productId) === parseInt(productId));
        if (existingProduct) {
            existingProduct.quantity += parseInt(quantity);
        } else {
            cart.push({
                productId: parseInt(productId),
                quantity: parseInt(quantity)
            });
        }
        res.cookie('cart', JSON.stringify(cart), { httpOnly: true });
        res.redirect('/product/cart');
    },
    cartDestroy: (req,res)=>{
        const { productId } = req.body;
        let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

        cart = cart.filter(item => item.productId != productId);

        res.cookie('cart', JSON.stringify(cart), { httpOnly: true });
        res.redirect('/product/cart');
    },
    payView: (req,res)=>{
        const {
            usuario
        } = req.session;
        const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
        const showLinks = req.session.usuario ? true : false;
        const total = req.query.total
        if(total == 0){
            res.redirect('/product/cart?errorMsg=PORFAVOR AÑADA UN PRODUCTO')
        }else{
            res.render('product/payment',{
                showLinks,
                total,
                idUsuario: usuario ? usuario.id : 0,
            })
        }

        
    },
    successView: (req,res)=>{
        const {
            usuario
        } = req.session;
        const showLinks = req.session.usuario ? true : false;

        const datos= req.query;

        res.render('product/success',{
            showLinks,
            datos,
            idUsuario: usuario ? usuario.id : 0,
        })


    }



}

module.exports = productController;