
///REQUIRES CORE

const express = require('express')
const path = require('path')

// EXPRESS MAIN

const app = express();

//VARIABLES

const PORT = 912;

//TEMPLATE ENGINE
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'))

//REQUIRE DE MODULOS

const mainRoutes = require("./src/routes/mainRoutes");
const userRoutes = require("./src/routes/userRoutes")
/*
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
*/

//USES DE MODULOS

app.use("/", mainRoutes);
app.use("/user", userRoutes);
/* 
app.use("/", productRouter);
app.use("/api", apiRouter);
*/



//LISTEN
app.listen(PORT, ()=>{
    console.log(`Server iniciado en http://localhost:${PORT}`);
})