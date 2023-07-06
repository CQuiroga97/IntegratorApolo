var sql = require('mssql');
const readExcel = require('read-excel-file/node')
const XLSX = require('xlsx');
const emailController = require("../controllers/email.controller.js")
const md5 = require('md5')
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

exports.generateExcelParticipante = (req, res)=>{

    let arregloExcel = [];
    sql.query("exec spGetUniversidadesParticipantes", function(err, resp){
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
        const workSheet = XLSX.utils.aoa_to_sheet(arregloExcel);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
        XLSX.writeFile(workBook, './temp/sample.xlsx');
        res.download('./temp/sample.xlsx');
    })
      

}
exports.registerEstudiantesMassive = (req, res) => {
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
                    para continuar el proceso ingresa al siguiente <a href="http://localhost:4200/">link</a></span>
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