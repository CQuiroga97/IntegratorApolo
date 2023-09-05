const fs = require('fs')
const { mkdir } = require('fs/promises');

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
    const ruta = `./controllers/integrales/integral${req.body.numIntegral + 1}`;
    if(fs.existsSync(ruta))
        fs.rmSync(ruta, {recursive:true, force: true})
    mkdir(ruta);
    mkdir(ruta + "/respuestas");
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
    
}