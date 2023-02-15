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
const foundUser = await User.findOne({username})
if(foundUser !== null) {
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
res.redirect("/");
 } catch(err) {
    next(err);
 }
});
module.exports = router;