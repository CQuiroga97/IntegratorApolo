var sql = require('mssql');
const readExcel = require('read-excel-file/node')
var con = new sql.Request();

exports.registrarUniversidad = (req, res, con)=>{
    console.log(`exec sp_setUniversidad "${req.body.nombre}", "${req.body.pais}", "${req.body.ciudad}", ${req.body.cantEstudiantes}, '${req.body.correo}'`)
   con.query(`exec sp_setUniversidad "${req.body.nombre}", "${req.body.pais}", "${req.body.ciudad}", ${req.body.cantEstudiantes}, '${req.body.correo}'`, (err, res2)=>{
        if(err)
            return res.status(401).send({msg:"Error en la base de datos"})
        return res.status(200).send({msg:"Dato almacenado con exito"})
    })
}
exports.modificarUniversidad = (req, res, con)=>{
    console.log(req.body)
   con.query(`exec spModificarUniversidad ${req.body.idUniversidad}, "${req.body.nombre}", "${req.body.pais}", "${req.body.ciudad}", ${req.body.estudiantes}, '${req.body.correo}'`, (err, res2)=>{
        if(err)
            return res.status(401).send({msg:"Error en la base de datos"})
        return res.status(200).send({msg:"Dato almacenado con exito"})
    })
}
exports.registrarUniversidadMultiples = (excel, res, con)=>{
   /*  con.query(`exec registrarUniversidad "${req.body.nombre}", "${req.body.pais}", "${req.body.ciudad}", ${req.body.cantEstudiantes}`, (err, res2)=>{
        if(err)
            return res.status(401).send({msg:"Error en la base de datos"})
        return res.status(200).send({msg:"Dato almacenado con exito"})
    }) */
    readExcel(excel).then((data) => {
        var flag = false;
        data.shift();
        const json = JSON.stringify(data);
        con.query(`exec sp_setUniversidadList '${json}'`, (err, res2)=>{
            if(err)
                res.status(401).send({titulo:"Error", texto:"Se ha producido un error en la base de datos", icono:"alert-triangle-outline"})
            else
                res.status(200).send({titulo:"Universidades registradas", texto:`Se han registrado ${data.length} universidades.`, icono:"file-add-outline"})
        });
        
      })
}