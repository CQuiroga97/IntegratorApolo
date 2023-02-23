const express = require("express");
const loginAdmin = require("../controllers/loginAdminController.js")
const regUni = require("../controllers/registrarUniversidad.js")
const mostrarUniversidades = require("../controllers/mostrarUniversidades")
const universidad = require("../controllers/universidad.js")
const router = express.Router();
/* const {signUpValidation} */
const bcrypt = require("bcrypt")

//https://www.tutsmake.com/login-rest-api-in-node-js-with-mysql/
//https://codingpotions.com/angular-login-sesion
router.post("/login", (req, res, next) =>{
    loginAdmin.login(req, res)
})
router.post("/registrarUniversidad", (req, res, next) =>{
    regUni.registrarUniversidad(req, res);
})
router.post("/registrarUniversidadExcel", (req, res, next) =>{
    console.log(req.body.content.replace(/^data:.*,/, ''));
    res.end();
    /* regUni.registrarUniversidad(req, res); */
})
router.post("/sp_getUniversidades", (req, res, next) =>{
    console.log("asdasd")
    mostrarUniversidades.mostrarUniversidades(req, res);
})
router.post("/getExcelUniversidades", (req, res) =>{
    universidad.createExcel(req, res);
})

module.exports = router;