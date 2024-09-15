// REQUIRE DATABASE


const userController= {
    login: (req,res) =>{
        res.render("user/login")
    }
}

module.exports = userController;