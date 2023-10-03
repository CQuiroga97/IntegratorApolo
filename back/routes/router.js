const express = require("express");
const sql = require('mssql');
const loginAdmin = require("../controllers/loginAdminController.js")
const regUni = require("../controllers/registrarUniversidad.js")
const mostrarUniversidades = require("../controllers/mostrarUniversidades")
const universidad = require("../controllers/universidad.js")
const participante = require("../controllers/controllerParticipante.js")
const competencia = require("../controllers/controllerCompetencia.js");
const router = express.Router();
const multer = require('multer');
const upload = multer();
let config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        }
    };

sql.connect(config, function(err){
    if (err) console.log(err)
    con = new sql.Request();
})
let con = new sql.Request();
/* const {signUpValidation} */
const bcrypt = require("bcrypt")
const fs = require("fs");

//https://www.tutsmake.com/login-rest-api-in-node-js-with-mysql/
//https://codingpotions.com/angular-login-sesion
router.post("/login", (req, res, next) =>{
    loginAdmin.login(req, res, con)
})
router.post("/loginParticipante", (req, res, next) =>{
    participante.loginParticipante(req, res, con)
})
router.post("/modificarUniversidad", (req, res, next) =>{
    regUni.modificarUniversidad(req, res, con);
})
router.post("/registrarUniversidad", (req, res, next) =>{
    regUni.registrarUniversidad(req, res, con);
})
router.post("/registrarUniversidadExcel", upload.single('filekey'), (req, res, next) => {
    regUni.registrarUniversidadMultiples(req.file.buffer, res, con);
})
router.post("/borrarParticipante", (req, res, next) =>{
    participante.borrarParticipante(req, res, con);
})
router.post("/registrarParticipantesExcel", upload.single('filekey'), (req, res, next) => {
    participante.registerEstudiantesMassive(req.file.buffer, res, con);
})
router.post("/sp_getUniversidades", (req, res, next) =>{
    mostrarUniversidades.mostrarUniversidades(req, res, con);
})
router.post("/mostrarUniversidadesNum", (req, res, next) =>{
    mostrarUniversidades.mostrarUniversidadesNum(req, res, con);
})
router.post("/BorrarUniversidadesEstudiantes", (req, res, next) =>{
    mostrarUniversidades.BorrarUniversidadesEstudiantes(req, res, con);
})
router.post("/insertarParticipante", (req, res, next) =>{
    participante.insertarParticipante(req, res, con);
})
router.post("/modificarParticipante", (req, res, next) =>{
    participante.modificarParticipante(req, res, con);
})
router.post("/modificarContrasenaParticipante", (req, res, next) =>{
    participante.modificarContrasenaParticipante(req, res, con);
})
router.post("/getExcelUniversidades", (req, res) =>{
    universidad.createExcel(req, res);
})
router.get("/generateExcelParticipante", (req, res) =>{
    participante.generateExcelParticipante(req, res, con)
    
})
router.post("/getIntegralesClasificaciones", (req, res)=>{
    participante.getIntegrales(req, res);
})
router.post("/guardarRespuestaParticipante", (req, res)=>{
    participante.guardarRespuestaParticipante(req, res, con);
})
router.post("/calcularPuntaje", (req, res)=>{
    participante.calcularPuntaje(req, res, con);
})
router.post("/obtenerInfoParticipantes", (req, res)=>{
    participante.obtenerInfoParticipantes(req, res, con);
})
router.post("/obtenerTopParticipantesPuntaje", (req, res)=>{
    participante.obtenerTopParticipantesPuntaje(req, res, con);
})
router.post("/getRespuestasIntegrales", (req, res)=>{
    participante.getRespuestasIntegrales(req, res, con);
})
router.post("/getTimerClasificaciones", (req, res)=>{
    competencia.getTimerClasificaciones(req, res, con);
})
router.post("/ingresarIntegrales", (req, res)=>{
    competencia.ingresarIntegrales(req, res, con);
})
router.post("/iniciarSegundaRonda", (req, res)=>{
    competencia.iniciarSegundaRonda(req, res, con);
})
router.post("/llamarEncuentros", (req, res)=>{
    competencia.llamarEncuentros(req, res, con);
})
router.post("/llamarIntegrales", (req, res)=>{
    competencia.llamarIntegrales(req, res, con);
})
router.post("/guardarIntegral", (req, res)=>{
    competencia.guardarIntegral(req, res, con);
})
router.post("/borrarIntegral", (req, res)=>{
    competencia.borrarIntegral(req, res, con);
})
router.post("/getIntegralesAdmin", (req, res)=>{
    competencia.getIntegralesAdmin(req, res, con);
})
router.post("/modificarIntegral", (req, res)=>{
    competencia.modificarIntegral(req, res, con);
})
router.post("/getTopUniversidades", (req, res)=>{
    competencia.getTopUniversidades(req, res, con);
})
module.exports = router;