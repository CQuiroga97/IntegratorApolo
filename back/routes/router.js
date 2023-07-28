const express = require("express");
const loginAdmin = require("../controllers/loginAdminController.js")
const regUni = require("../controllers/registrarUniversidad.js")
const mostrarUniversidades = require("../controllers/mostrarUniversidades")
const universidad = require("../controllers/universidad.js")
const participante = require("../controllers/controllerParticipante.js")
const competencia = require("../controllers/controllerCompetencia.js");
const router = express.Router();
const multer = require('multer');
const upload = multer();


/* const {signUpValidation} */
const bcrypt = require("bcrypt")
const fs = require("fs");

//https://www.tutsmake.com/login-rest-api-in-node-js-with-mysql/
//https://codingpotions.com/angular-login-sesion
router.post("/login", (req, res, next) =>{
    loginAdmin.login(req, res)
})
router.post("/loginParticipante", (req, res, next) =>{
    participante.loginParticipante(req, res)
})
router.post("/modificarUniversidad", (req, res, next) =>{
    regUni.modificarUniversidad(req, res);
})
router.post("/registrarUniversidad", (req, res, next) =>{
    regUni.registrarUniversidad(req, res);
})
router.post("/registrarUniversidadExcel", upload.single('filekey'), (req, res, next) => {
    regUni.registrarUniversidadMultiples(req.file.buffer, res);
})
router.post("/borrarParticipante", (req, res, next) =>{
    participante.borrarParticipante(req, res);
})
router.post("/registrarParticipantesExcel", upload.single('filekey'), (req, res, next) => {
    participante.registerEstudiantesMassive(req.file.buffer, res);
})
router.post("/sp_getUniversidades", (req, res, next) =>{
    mostrarUniversidades.mostrarUniversidades(req, res);
})
router.post("/BorrarUniversidadesEstudiantes", (req, res, next) =>{
    mostrarUniversidades.BorrarUniversidadesEstudiantes(req, res);
})
router.post("/insertarParticipante", (req, res, next) =>{
    participante.insertarParticipante(req, res);
})
router.post("/modificarParticipante", (req, res, next) =>{
    participante.modificarParticipante(req, res);
})
router.post("/modificarContrasenaParticipante", (req, res, next) =>{
    participante.modificarContrasenaParticipante(req, res);
})
router.post("/getExcelUniversidades", (req, res) =>{
    universidad.createExcel(req, res);
})
router.get("/generateExcelParticipante", (req, res) =>{
    participante.generateExcelParticipante(req, res)
    
})
router.post("/getIntegralesClasificaciones", (req, res)=>{
    participante.getIntegrales(req, res);
})
router.post("/guardarRespuestaParticipante", (req, res)=>{
    participante.guardarRespuestaParticipante(req, res);
})
router.post("/getTimerClasificaciones", (req, res)=>{
    competencia.getTimerClasificaciones(req, res);
})
module.exports = router;