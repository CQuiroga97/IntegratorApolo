var sql = require('mssql');
var excel = require('excel4node');


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