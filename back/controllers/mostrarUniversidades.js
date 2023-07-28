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

exports.mostrarUniversidades = (req, res)=>{
    con.query(`exec sp_getParticipantesByUniversidad`, (err, res2)=>{
        if(err)
            return res.status(401).send({msg:"Error en la base de datos"})
        else
            return res.status(200).send(res2.recordsets)
    })

}
exports.BorrarUniversidadesEstudiantes = (req, res)=>{
    con.query(`exec spBorrarUniversidadesEstudiantes ${req.body.idu}`, (err, res2)=>{
        if(err)
            return res.status(401).send({msg:"Error en la base de datos"})
        else
            return res.status(200).send(res2)
    })
}