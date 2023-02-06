const express = require('express');
const app = express();
const port = 3000;
var sql = require('mssql');

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
var con;
app.get('/', (req, res) => {
  res.send('asd');
});
sql.connect(config, function(err){
  if (err) console.log(err)
  con = new sql.Request();
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});