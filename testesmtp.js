var nodemailer = require('nodemailer');

// Substitua '189.28.179.3' pelo endereço IP fixo do seu servidor de e-mail
var transport = nodemailer.createTransport({
    host: 'mail.estilofontana.com.br', // IP fixo do servidor de e-mail
    port: 465,
    secure: true, // true para SSL, false para outros
    auth: {
      user: 'esqueciminhasenha@estilofontana.com.br',
      pass: 'eQNd6x2tTifPBIaX3ZcA',
    },
});

transport.on('debug', console.log);
 
var mailOptions = {
  from: 'esqueciminhasenha@estilofontana.com.br',
  to: 'alessandro.geras@minertecnologia.com',
  subject: 'Recuperação de Senha',
  html: '<h1>Teste</h1>',
};
 
transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
