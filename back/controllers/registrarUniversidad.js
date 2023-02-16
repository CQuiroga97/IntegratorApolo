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

exports.registrarUniversidad = (req, res)=>{
    console.log(`exec registrarUniversidad "${req.body.nombre}", "${req.body.sede}", "${req.body.pais}", ${req.body.cant}`);
    con.query(`exec registrarUniversidad "${req.body.nombre}", "${req.body.sede}", "${req.body.pais}", ${req.body.cant}`, (err, res2)=>{
        if(err)
            return res.status(401).send({msg:"Error en la base de datos"})
        return res.status(200).send({msg:"Dato almacenado con exito"})
    })

}