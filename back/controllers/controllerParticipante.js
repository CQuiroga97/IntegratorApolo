const sql = require('mssql');
const readExcel = require('read-excel-file/node')
const XLSX = require('xlsx');
const emailController = require("../controllers/email.controller.js")
const jwt = require("jsonwebtoken");
const md5 = require("md5")
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
let CryptoJS = require("crypto-js");
const fs = require('fs');
const path = require('path');
let con = new sql.Request();

exports.generateExcelParticipante = (req, res, con)=>{

    let arregloExcel = [];
    con.query("exec spGetUniversidadesParticipantes", function(err, resp){
        resp.recordset.forEach(element =>{
            let i = 0
            element.participantes = element.participantes != null ? JSON.parse(element.participantes):element.participantes;
            if(element.participantes != null){
                i = element.participantes.length;
            }
            if(i!=element["cantParticipantes"]){
                arregloExcel.push([element["idUniversidad"], element["nombreUniversidad"]])
                arregloExcel.push(["Número","Nombre participante", "Correo participante"])
                for(i; i<element["cantParticipantes"]; i++){
                    arregloExcel.push([(i+1), "", ""])
                }
            }
            
        })
        try{

            const workSheet = XLSX.utils.aoa_to_sheet(arregloExcel);
            const workBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
            XLSX.writeFile(workBook, './back/back/temp/sample.xlsx');
            res.download('./back/back/temp/sample.xlsx');
        }catch(error){
            console.log(error)
            res.send([false])
        }
    })
      

}
exports.registerEstudiantesMassive = (req, res, con) => {
    readExcel(req).then((data) => {
        var flag = false;
        var id = 0;
        var idBuff = 0;
        var data2 = [];
        data.forEach(val =>{
            if(val[0]=="Número"){
                idBuff = id;
            }else if(val[2]!=null){
                data2.push([ val[1], val[2],"",idBuff])
                
            }
            id = val[0];
        })
        
        let json = JSON.stringify(data2);
        JSON.parse(json).forEach(el=>{
            el[2] = `${el[0].replace(/\s/g, '')}${el[3]}`
            let mailOptions = {
                from: 'apolodigitalsolutions@gmail.com',
                to: el[1],
                subject: '¡Bienvenido al noveno encuentro de integrales!',
                html: `
                    <h1>Bienvenido, ${el[0]}</h1>
                    <br>
                    <span>Tu universidad te ha inscrito a nuestro noveno encuentro de integrales, puedes ingresar a nuestro aplicativo con tu correo y la contraseña '${el[2]}'
                    puedes iniciar sesión con el siguiente <a href="https://www.integratorapolo.com/">link</a></span>
                    `
            };
            emailController.enviarCorreo(mailOptions)
            el[2] = md5(el[2])
            
        })
        con.query(`exec sp_setParticipanteList '${json}'`, (err, res2)=>{
            if(err)
                res.status(401).send({titulo:"Error", texto:"Se ha producido un error en la base de datos", icono:"alert-triangle-outline"})
            else
                res.status(200).send({titulo:"Participantes registrados", texto:`Se han registrado ${data2.length} participantes.`, icono:"file-add-outline"})
        });
      })
}
exports.borrarParticipante = (req,res, con)=>{
    con.query(`spBorrarParticipante ${parseInt(req.body.idEstudiante)}`, (err, res2)=>{
        if(err){
                res.status(401).send({titulo:"Error", texto:"Se ha producido un error en la base de datos", icono:"alert-triangle-outline"})
            }else
                res.status(200).send({titulo:"Participantes eliminado", texto:`El participante ha sido eliminado con éxito.`, icono:"checkmark-circle-2-outline"})
    })
}
exports.insertarParticipante = (req,res, con)=>{
    let correoEncrypt = CryptoJS.AES.encrypt(req.body.data.correo, "key").toString();    
    let pass = `${req.body.data.nombre.replace(/\s/g, '')}${req.body.data.idUniversidad}`
    let mailOptions = {
        from: 'apolodigitalsolutions@gmail.com',
        to: req.body.data.correo,
        subject: '¡Bienvenido al noveno encuentro de integrales!',
        html: `
            <h1>Bienvenido, ${req.body.data.nombre}</h1>
            <br>
            <span>Tu universidad te ha inscrito a nuestro noveno encuentro de integrales, puedes ingresar a nuestro aplicativo con tu correo y la contraseña '${pass}'
            puedes iniciar sesión con el siguiente <a href="https://www.integratorapolo.com/">link</a></span>
            `
    };
    con.query(`spInsertarParticipante '${req.body.data.nombre}', '${req.body.data.correo}', '${md5(pass)}', ${parseInt(req.body.data.idUniversidad)}`, (err, res2)=>{
        if(err){
                res.status(401).send({titulo:"Error", texto:"Se ha producido un error en la base de datos", icono:"alert-triangle-outline"})
            }else
                res.status(200).send({titulo:"Participantes creado", texto:`El participante ha sido creado con éxito.`, icono:"checkmark-circle-2-outline"})
    })
    emailController.enviarCorreo(mailOptions)
    
}
exports.modificarParticipante = (req,res, con)=>{
    
    con.query(`spModificarParticipante ${req.body.data.id}, '${req.body.data.nombre}', '${req.body.data.correo}', '${req.body.data.pass}', ${parseInt(req.body.data.idUniversidad)}`, (err, res2)=>{
        if(err){
                res.status(401).send({titulo:"Error", texto:"Se ha producido un error en la base de datos", icono:"alert-triangle-outline"})
            }else
                res.status(200).send({titulo:"Participantes creado", texto:`El participante ha sido creado con éxito.`, icono:"checkmark-circle-2-outline"})
    })
}
exports.modificarContrasenaParticipante = (req,res, con)=>{
    con.query(`spModificarContrasenaParticipante '${req.body.data.correo}', '${md5(req.body.data.pass)}'`, (err, res2)=>{
        if(err){
                res.status(401).send({titulo:"Error", texto:"Se ha producido un error en la base de datos", icono:"alert-triangle-outline"})
            }else
                res.status(200).send({titulo:"Participantes creado", texto:`El participante ha sido creado con éxito.`, icono:"checkmark-circle-2-outline"})
    })
}
exports.loginParticipante = (req, res, con)=>{
    con.query(`exec loginParticipante '${req.body.correo}', '${md5(req.body.pass)}'`, (err, result)=>{
        if(err){
            return res.status(401).send({msg:err})
        }
        if(result.recordset.length != 0){
            result.recordset[0]["rol"]="Participante";
            const token = jwt.sign({data:result.recordset[0]}, "the-super-strong-secret", {expiresIn:"1h"});
            return res.status(200).send({msg:"Logueado", token})
        }else{
            return res.status(401).send({msg:"Usuario no encontrado"})
        }
    })
}


exports.getIntegrales = (req, res)=>{
    const directorio = path.join(__dirname, './integrales');
    fs.readdir(directorio, (error, archivos) => {
        if (error) {
          console.error('Error al leer el contenido de la carpeta:', error);
          return res.status(500).json({ error: 'Error al leer el contenido de la carpeta' });
        }
        // Filtra los elementos que sean carpetas
        let integrales = [];
        const carpetas = archivos.filter(archivo => fs.lstatSync(path.join(directorio, archivo)).isDirectory());
        carpetas.forEach((el) =>{
          const newDic = path.join('', `${directorio}/${el}`);
          const imgs = fs.readdirSync(newDic).filter(file => fs.lstatSync(path.join(newDic, file)).isFile())
          const respuestas = fs.readdirSync(`${newDic}/respuestas`)
          integrales.push({"Nombre": el, "Imagenes": imgs, "Respuestas": respuestas});
        })
        res.json({ integrales });
      });
}

exports.guardarRespuestaParticipante = (req, res, con) =>{
    con.query('spGetRespuestas', (err2, resp)=>{
        const respuestas = resp.recordsets[0]
        const buffRespuesta = respuestas.filter(el=>{return el.nombreIntegral == `integral${req.body.numeroIntegral}`})[0]
        let puntaje = 0;
        let puntajeU = 0;
        if(buffRespuesta.respuesta)
            if(req.body.numeroRespuesta == buffRespuesta.respuesta){
                puntaje = (10 + (req.body.tiempo / 10000))
                puntajeU = 1;
            }
        con.query(`spGuardarRespuestaParticipante 
            ${req.body.numeroIntegral}, 
            ${req.body.numeroRespuesta}, 
            ${req.body.tiempo}, 
            ${req.body.idParticipante}, 
            '${req.body.tiempoCompleto}', 
            ${puntaje},
            ${puntajeU}`,
            
            (err, result)=>{
            if(err){
                console.error(err);
                res.status(500).json({ error: 'Error en la base de datos' });
            }else{
                
                res.end();
            }
        })
    })
}
exports.calcularPuntaje = (req, res, con)=>{
    
}
exports.obtenerInfoParticipantes = (req, res, con)=>{
    con.query('EXEC spGetRespuestas', (error, resp)=>{

        con.query(`spObtenerInfoParticipantes`, (err, result)=>{
            if(err)
                res.send(err)
            else{
                const data = {};
                data["participantes"] = result.recordset;
                data["respuestas"]=resp.recordsets[0];
                res.send(data)
            }
        })
    })
}

exports.obtenerTopParticipantesPuntaje = (req, res, con)=>{
    con.query(`EXEC spObtenerTopParticipantesPuntaje`, (err, result)=>{
        if(err)
            res.send(err)
        else
            res.send(result.recordsets)
    })
}
exports.getRespuestasIntegrales = (req, res, con)=>{
    con.query('EXEC spGetRespuestas', (error, resp)=>{
        if(error)
            res.send(error)
        else  
            res.send(resp.recordsets[0])
    })
}
exports.getEliminatoriaParticipante = (req, res, con)=>{
    con.query(`EXEC spGetEliminatoriaParticipante ${req.body.idParticipante}`, (err, result)=>{
        if(err){
            res.send([false])
        }else{
            res.send(result.recordset)
        }
    })
}
exports.getPosicionParticipante = (req, res, con)=>{
    con.query(`EXEC spGetPosicionParticipante ${req.body.idParticipante}`, (err, result)=>{
        if(err){
            res.send([false])
        }else{
            res.send(result.recordset)
        }
    })
}
exports.updateTexto = (req, res, con)=>{
    con.query(`EXEC spUpdateTexto
     ${req.body.idParticipante[0]}, 
     ${req.body.encuentro}, 
     ${req.body.ronda}, 
     '${req.body.texto_1}',
     '${req.body.texto_2}',
     '${req.body.texto_3}',
     '${req.body.tiempo_1}',
     '${req.body.tiempo_2}',
     '${req.body.tiempo_3}'
     `, (error, result)=>{
        if(error) res.send(error)
        else{
            res.send([true])
        }
    })
}