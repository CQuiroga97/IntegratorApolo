const jwt = require("jsonwebtoken");
const md5 = require("md5")
var sql = require('mssql');
var config = {
user: 'sa',
password: 'Cristian2396980',
server: 'localhost',
database: 'integrator',
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
var con = new sql.Request();
exports.login = (req, res)=>{
    console.log(req.body);
    con.query(`exec loginAdmin "${req.body.name}", "${md5(req.body.pass)}"`, (err, result)=>{
        if(err){
            return res.status(401).send({msg:err})
        }
        const id = result.recordset[0]["resultado"];
        if(id){
            const token = jwt.sign({id:id}, "the-super-strong-secret", {expiresIn:"1h"});
            return res.status(200).send({msg:"Logueado", token})
        }else{
            return res.status(401).send({msg:"Usuario no encontrado"})
        }
    })
    
    /* 
    var pass = md5("contraseñaAdministrador")
    con.query(`exec crearAdmin "adminAmerica", "${pass}"`, function(err){
        if(err) console.log(err);
        console.log("Done")
    }); */
    
}