const sql = require('mssql');
const config = {
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
let con = new sql.Request();

exports.getTimerClasificaciones = (req, res)=>{
    con.query(`exec spGetTimerClasificaciones 1`, (err, resp)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error en la base de datos")
        }else{
            res.status(200).send(resp.recordset[0])
        }
    })
}