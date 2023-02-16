const express = require("express");
const loginAdmin = require("../controllers/loginAdminController.js")
const regUni = require("../controllers/registrarUniversidad.js")
const router = express.Router();
/* const {signUpValidation} */
const bcrypt = require("bcrypt")

//https://www.tutsmake.com/login-rest-api-in-node-js-with-mysql/
//https://codingpotions.com/angular-login-sesion
router.post("/login", (req, res, next) =>{
    loginAdmin.login(req, res)
})
router.post("/registrarUniversidad", (req, res, next) =>{
    console.log(req.body)
    regUni.registrarUniversidad(req, res);
})

module.exports = router;