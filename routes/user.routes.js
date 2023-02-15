const express = require("express");
const router = express.Router();

const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

// GET => "/user/registro" renderiza formulario de registro
router.get("/registro", (req, res, next) => {
    res.render("user/sign-user.hbs")
});


// POST => la info del formulario se añade a la DB

router.post("/registro", async (req, res, next) => {

    const { username, password } = req.body;
    try {
        const foundUser = await User.findOne({ username })
        if (foundUser !== null) {
            res.render("user/sign-user.hbs", {
                error: "El nombre de usuario ya existe"
            });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await User.create({
            username: username,
            password: hash,
        });
        res.redirect("/user/login");
    } catch (err) {
        next(err);
    }
});

// GET  => /user/login

router.get("/login", (req, res, next) => {

    res.render("user/login-user.hbs")
})

// POST  => /user/login
router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (username === "" || password === "") {
        res.render("user/login-user.hbs", {
            error: "Completar todos los campos"
        })
        return;
    }
   try {
    const usuario = await User.findOne({username: username})
    if ( usuario === null){
        res.render("user/login-user.hbs",{
            error: "Usuario no existe"
        })
        return
    }


    req.session.activeUser = usuario
    req.session.save(() => {
        
        res.redirect("/user/profile");
      })

   } catch (error) {
    next(error)
   }
})
 router.get("/profile", (req,res,next)=>{

res.render("profile/profile.hbs")
 })

module.exports = router;


