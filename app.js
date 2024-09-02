const express = require('express')
const app = express();
const path = require('path')

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'src', 'views'))


app.get('/', (req,res)=>{
    res.render('product/index')
})


app.listen(3000, ()=>{
    console.log("server en 3000")
})