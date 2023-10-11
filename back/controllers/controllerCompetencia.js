const fs = require('fs')
const { mkdir } = require('fs/promises');
const md5 = require('md5')
exports.getTimerClasificaciones = (req, res, con)=>{
    con.query(`exec spGetTimerClasificaciones 1`, (err, resp)=>{
        if(err){
            res.status(500).send("Error en la base de datos")
        }else{
            res.status(200).send(resp.recordset[0])
        }
    })
}

exports.ingresarIntegrales = (req, res, con)=>{
    console.log("3- Num integral", req.body.numIntegral)
    try{
        if(req.body.numIntegral == 0){
    
            if(fs.existsSync('./back/back/controllers/integrales'))
                fs.rmSync('./back/back/controllers/integrales', {recursive:true, force: true})
            console.log("Acá 2")
            mkdir('./back/back/controllers/integrales', { recursive: true });
            con.query(`EXEC spDropRespuestas`, (error, result)=>{
                if(!error)
                    saveIntegral(req,res,con)
            })
        }else{
            saveIntegral(req,res,con)
        }
    }catch(error){
        console.log(error)
    }
    
    
}

exports.getTopUniversidades = (req, res, con)=>{
    con.query("EXEC getTopUniversidades", (error, result)=>{
        if(error) res.send([false])
        else res.send(result.recordsets[0])
    })
}
exports.getEliminatoriaActiva = (req, res, con)=>{
    con.query("EXEC spGetEliminatoriaActiva", (error, result)=>{
        if(error) res.send([false])
        else res.send(result.recordsets[0])
    })
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
    const ruta = `./back/back/controllers/integralesFinales`
    console.log(ruta)
    if(!fs.existsSync(ruta))
        mkdir(ruta, { recursive: true }).then(()=>{
            saveIntegralEliminatoria(req.body.imagen.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2], res, con)
        })
    else
        saveIntegralEliminatoria(req.body.imagen.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2], res, con)
}
exports.borrarIntegral = (req, res, con)=>{
    const ruta = `.back/back/controllers/integralesFinales/${req.body.idIntegral}.png`
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
            result.recordsets.forEach(el=>{
                if(el.length>0)
                    el[0].idIntegral = md5(el[0].idIntegral)
            })
            res.send(result.recordsets)
        }
    })
}
exports.updatePuntaje = (req, res, con)=>{
    con.query(`EXEC spUpdatePuntaje ${req.body.idParticipante}, ${req.body.encuentro}, ${req.body.ronda}, ${req.body.puntaje}`, (error, result)=>{
        if(error) res.send(error)
        else{
            res.send([true])
        }
    })
}
exports.updateEncuentro = (req, res, con)=>{
    con.query(`EXEC spUpdateEncuentro 
    ${req.body.encuentro}, 
    ${req.body.ronda}, 
    ${req.body.idGanador}, 
    ${req.body.idPerdedor},
    ${req.body.nuevaRonda},
    ${req.body.nuevoEncuentro},
    ${req.body.encuentroPasar},
    ${req.body.rondaPasar},
    ${req.body.tercerPuesto}
    `, (error, result)=>{
        if(error) res.send(error)
        else{
            res.send([true])
        }
    })
}

saveIntegralEliminatoria = (imagen, res, con)=>{
    con.query(`spGuardarIntegral`, (err, result)=>{
        if(err)
            res.send(err)
        else{
            const imagenBuff = Buffer.from(imagen,'base64')

            fs.writeFile(`./back/back/controllers/integralesFinales/${md5(result.recordsets[0][0].id)}.png`,imagenBuff , (error)=>{
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
    const ruta = `./back/back/controllers/integrales/integral${req.body.numIntegral + 1}`;
    console.log(ruta)
    if(fs.existsSync(ruta))
        fs.rmSync(ruta, {recursive:true, force: true})
    mkdir(ruta,  { recursive: true }).then(()=>{
        console.log(fs.existsSync(ruta), "Ruta creada")
        mkdir(ruta + "/respuestas", { recursive: true }).then(()=>{
            let imagen =  req.body.imagenes.selectedImage0.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
            let imagenBuff = Buffer.from(imagen,'base64')
            fs.writeFile(ruta+"/integral.png", imagenBuff, (err)=>{
                imagen =  req.body.imagenes.selectedImage1.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                imagenBuff = Buffer.from(imagen,'base64')
                fs.writeFile(ruta + "/respuestas/respuesta1.png", imagenBuff, (err)=>{
        
                    imagen =  req.body.imagenes.selectedImage2.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                    imagenBuff = Buffer.from(imagen,'base64')
                    fs.writeFile(ruta + "/respuestas/respuesta2.png", imagenBuff, (err)=>{
                
                        imagen =  req.body.imagenes.selectedImage3.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                        imagenBuff = Buffer.from(imagen,'base64')
                        fs.writeFile(ruta + "/respuestas/respuesta3.png", imagenBuff, (err)=>{
                            imagen =  req.body.imagenes.selectedImage4.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
                            imagenBuff = Buffer.from(imagen,'base64')
                            fs.writeFile(ruta + "/respuestas/respuesta4.png", imagenBuff, (err)=>{
                                con.query(`guardarIntegral 'integral${req.body.numIntegral + 1}', ${parseInt(req.body.imagenes.correctOption)}`, (err, result)=>{
  
                                    res.send(["Done"])
                                })
                            })
                        })
                    })
                })
            })
        });
    }).catch((err)=>{
        console.log("Error: ",error)
    });
}
crearEncuentro = (index, arreglo, data, con, res)=>{
    let estado = 0;
    if(index == 0) estado = 1;
    con.query(`EXEC crearEncuentro ${data[arreglo[index][0] - 1].idParticipante}, ${data[arreglo[index][1] - 1].idParticipante}, ${index+1}, 8, ${estado}`, (err, result)=>{
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