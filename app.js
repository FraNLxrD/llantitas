
///REQUIRES CORE

const express = require('express')
const path = require('path')

// EXPRESS MAIN

const app = express();

//VARIABLES

const PORT = 912;

//TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'))

//REQUIRE DE MODULOS

const mainRoutes = require("./src/routes/mainRoutes");
/*
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
*/

//USES DE MODULOS

app.use("/", mainRoutes);
/* 
app.use("/", productRouter);
app.use("/", userRouter);
app.use("/api", apiRouter);
*/



//LISTEN
app.listen(PORT, ()=>{
    console.log(`Server iniciado en http://localhost:${PORT}`);
})