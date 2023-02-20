var sql = require('mssql');
var excel = require('excel4node');

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

exports.createExcel = (req, res)=>{
    var workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet('Sheet 1');
    var style = workbook.createStyle({
        font: {
          color: '#FF0800',
          size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
      });
    worksheet.cell(1,1).string('Nombre').style(style);
    worksheet.cell(1,2).string('País').style(style);
    worksheet.cell(1,3).string('Sede').style(style);
    worksheet.cell(1,4).string('Correo').style(style);
    worksheet.cell(1,5).string('Cantidad de estudiantes').style(style);
    workbook.write('Excel.xlsx');
    res.end();

}