const fs = require('fs')
const { mkdir } = require('fs/promises');
const md5 = require('md5')
exports.getTimerClasificaciones = (req, res, con)=>{
    con.query(`exec spGetTimerClasificaciones 1`, (err, resp)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error en la base de datos")
        }else{
            res.status(200).send(resp.recordset[0])
        }
    })
}

exports.ingresarIntegrales = (req, res, con)=>{
    if(req.body.numIntegral == 0){
        if(fs.existsSync('./controllers/integrales'))
            fs.rmSync('./controllers/integrales', {recursive:true, force: true})
        mkdir('./controllers/integrales');
        con.query(`EXEC spDropRespuestas`, (error, result)=>{
            if(!error)
                saveIntegral(req,res,con)
        })
    }else{
        saveIntegral(req,res,con)
    }
    
    
}

exports.iniciarSegundaRonda = (req, res, con)=>{
    const estructura = [
        [1, 9],
        [5, 13],
        [3, 11],
        [7, 15],
        [2, 10],
        [6, 14],
        [4, 12],
        [8, 16]
    ]
    con.query(`EXEC getTop16`, (err, result)=>{
        if(err)
            res.send(err)
        else{
            console.log(result.recordsets[0])
            crearEncuentro(0, estructura, result.recordsets[0], con, res)
        }
    })
}
exports.llamarEncuentros = (req, res, con)=>{
    con.query(`spLlamarEncuentros`, (err, result)=>{
        if(err)
            res.send(err)
        else
            res.send(result.recordsets[0])
    })
}
exports.llamarIntegrales = (req, res, con)=>{
    con.query(`spLlamarIntegrales`, (err, result)=>{
        if(err)
            res.send(err)
        else{
            result.recordsets[0].forEach(el=>{

                el.idIntegral = md5(el.idIntegral)
            })
            res.send(result.recordsets[0])
        }
    })
}
exports.guardarIntegral = (req, res, con)=>{
    const ruta = `./controllers/integralesFinales`
    if(!fs.existsSync(ruta))
        mkdir(ruta).then(()=>{
            saveIntegralEliminatoria(req.body.imagen.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2], res, con)
        })
    else
        saveIntegralEliminatoria(req.body.imagen.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2], res, con)
}
exports.borrarIntegral = (req, res, con)=>{
    const ruta = `./controllers/integralesFinales/${req.body.idIntegral}.png`
    fs.rmSync(ruta, {recursive:true, force: true})
    con.query(`spLlamarIntegrales`, (err, result)=>{
        if(err)
            res.send(err)
        else{
            let flag = true;
            result.recordsets[0].forEach(el=>{

                if(req.body.idIntegral == md5(el.idIntegral)){
                    con.query(`spBorrarIntegral ${el.idIntegral}`, (err, result)=>{
                        if(err){
                            res.send(err)}
                        else{
                            res.send(result)
                        }
                        
                    })
                    flag = false;
                }
            })
            if(flag)
                res.send([false])
        }
    })
    
}
exports.getIntegralesAdmin = (req, res, con)=>{
    con.query("EXEC spGetIntegralesAdmin", (error, result)=>{
        if(error) res.send(error)
        else{
            console.log(result.recordsets)
            result.recordsets.forEach(el=>{
                if(el.length>0)
                    el[0].idIntegral = md5(el[0].idIntegral)
            })
            res.send(result.recordsets)
        }
    })
}
saveIntegralEliminatoria = (imagen, res, con)=>{
    con.query(`spGuardarIntegral`, (err, result)=>{
        console.log(result.recordsets[0])
        if(err)
            res.send(err)
        else{
            const imagenBuff = Buffer.from(imagen,'base64')

            fs.writeFile(`./controllers/integralesFinales/${md5(result.recordsets[0][0].id)}.png`,imagenBuff , (error)=>{
                if(error)
                    res.send(error)
                else
                    res.send([true])
            })
        }
    })
}
exports.modificarIntegral = (req, res, con)=>{
    con.query(`spLlamarIntegrales`, (err, result)=>{
        if(err)
            res.send(err)
        else{
            let flag = true;
            result.recordsets[0].forEach(el=>{
                if(req.body.idIntegral == md5(el.idIntegral)){
                    console.log(`spModificarIntegral ${el.idIntegral}, ${el.estado}`)
                    con.query(`spModificarIntegral ${el.idIntegral}, ${req.body.estado}`, (err, result)=>{
                        if(err){
                            res.send(err)}
                        else{
                            res.send(result)
                        }
                        
                    })
                    flag = false;
                }
            })
            if(flag)
                res.send([false])
        }
    })
}
saveIntegral=(req, res, con)=>{
    const ruta = `./controllers/integrales/integral${req.body.numIntegral + 1}`;
    
    if(fs.existsSync(ruta))
        fs.rmSync(ruta, {recursive:true, force: true})
    mkdir(ruta).then(()=>{
        mkdir(ruta + "/respuestas").then(()=>{

            console.log(ruta)
            let imagen =  req.body.imagenes.selectedImage0.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
            let imagenBuff = Buffer.from(imagen,'base64')
            fs.writeFile(ruta+"/integral.png", imagenBuff, (err)=>{
                console.log(err)
                imagen =  req.body.imagenes.selectedImage1.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                imagenBuff = Buffer.from(imagen,'base64')
                fs.writeFile(ruta + "/respuestas/respuesta1.png", imagenBuff, (err)=>{
                    console.log(err)
        
                    imagen =  req.body.imagenes.selectedImage2.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                    imagenBuff = Buffer.from(imagen,'base64')
                    fs.writeFile(ruta + "/respuestas/respuesta2.png", imagenBuff, (err)=>{
                        console.log(err)
                
                        imagen =  req.body.imagenes.selectedImage3.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                        imagenBuff = Buffer.from(imagen,'base64')
                        fs.writeFile(ruta + "/respuestas/respuesta3.png", imagenBuff, (err)=>{
                            console.log(err)
                    
                            imagen =  req.body.imagenes.selectedImage4.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                            imagenBuff = Buffer.from(imagen,'base64')
                            fs.writeFile(ruta + "/respuestas/respuesta4.png", imagenBuff, (err)=>{
                                console.log(err)
                                con.query(`guardarIntegral 'integral${req.body.numIntegral + 1}', ${parseInt(req.body.imagenes.correctOption)}`, (err, result)=>{
                                    console.log(err)
                                    res.send(["Done"])
                                })
                            })
                        })
                    })
                })
            })
        });
    });
}
crearEncuentro = (index, arreglo, data, con, res)=>{
    
    con.query(`EXEC crearEncuentro ${data[arreglo[index][0] - 1].idParticipante}, ${data[arreglo[index][1] - 1].idParticipante}, ${index+1}, 8`, (err, result)=>{
        if(err){
            res.send(err)
        }else{
            if(arreglo.length - 1 == index)
                res.send(["Éxito"])
            else
                crearEncuentro(index+1, arreglo, data, con, res);
        }
    })
}