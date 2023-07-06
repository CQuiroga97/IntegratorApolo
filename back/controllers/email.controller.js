var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apolodigitalsolutions@gmail.com',
    pass: 'keiwyfodysygjcja'
  }
});

exports.enviarCorreo = (mailOptions)=>{

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}