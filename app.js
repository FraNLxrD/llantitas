
///REQUIRES CORE

const express = require('express')
const path = require('path')
const methodOverride = require("method-override");
const session= require("express-session")

// EXPRESS MAIN

const app = express();

//VARIABLES

const PORT = 912;

//ESTATICOS
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret: "frasesecretaepicarda"}))



//TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'))

//REQUIRE DE MODULOS

const mainRoutes = require("./src/routes/mainRoutes");
const userRoutes = require("./src/routes/userRoutes")
const productRouter = require("./src/routes/productRoutes");

//USES DE MODULOS

app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/product", productRouter);
/* 
app.use("/api", apiRouter);
*/



//LISTEN
app.listen(PORT, ()=>{
    console.log(`Server iniciado en http://localhost:${PORT}`);
})