exports.mostrarUniversidades = (req, res, con)=>{
    con.query(`exec sp_getParticipantesByUniversidad`, (err, res2)=>{
        if(err)
            return res.status(401).send(err)
        else
            return res.status(200).send(res2.recordsets)
    })

}
exports.mostrarUniversidadesNum = (req, res, con)=>{
    con.query(`exec sp_getUniversidades`, (err, res2)=>{
        if(err)
            return res.status(401).send(err)
        else
            return res.status(200).send(res2.recordsets)
    })

}
exports.BorrarUniversidadesEstudiantes = (req, res, con)=>{
    
    con.query(`exec spBorrarUniversidadesEstudiantes ${req.body.idu}`, (err, res2)=>{
        if(err)
            return res.status(401).send(con)
        else
            return res.status(200).send(res2)
    })
}