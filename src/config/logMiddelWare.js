function log(req,res,next){
    if(req.session.usuario!=undefined){
        next()
    }else{
        res.redirect("/user/login")
    }
}
module.exports= log