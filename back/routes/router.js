const express = require("express");
const loginAdmin = require("../controllers/loginAdminController.js")
const router = express.Router();
/* const {signUpValidation} */
const bcrypt = require("bcrypt")

//https://www.tutsmake.com/login-rest-api-in-node-js-with-mysql/
//https://codingpotions.com/angular-login-sesion
router.post("/login", (req, res, next) =>{
    console.log(req.body)
    loginAdmin.login(req, res)
})

module.exports = router;