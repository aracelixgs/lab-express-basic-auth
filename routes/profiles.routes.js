const express = require('express');
const router = express.Router();
const { loggeado } = require("../middlewares/validation-middleware.js")



router.get("/profile", loggeado, (req, res, next) => {
    res.render("profile/profile.hbs")
})


router.get("/private", loggeado, (req, res, next) => {
    res.render("profile/personalProfile.hbs");
});

module.exports = router;