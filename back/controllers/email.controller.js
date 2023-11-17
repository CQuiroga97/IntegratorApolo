let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apolodigitalsolutions@gmail.com',
    pass: 'keiwyfodysygjcja'
  }
});

exports.enviarCorreo = (mailOptions)=>{
  setTimeout(()=>{
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + mailOptions.to);
      }
    });
  }, 2000)
}