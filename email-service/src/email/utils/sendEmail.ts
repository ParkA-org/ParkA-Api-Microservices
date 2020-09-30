import * as nodemailer from 'nodemailer';

export const sendEmail = async (
  email: string,
  message: string,
  type: boolean,
) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: process.env.SENGRID_API_KEY, // generated ethereal password
    },
  });

  let html = `<b> Welcome to ParkA </b> <a href="${message}"> Confirm your Email </a>`;
  if (type) {
    html = `<b> Welcome to ParkA </b> <br> Open your ParkA app and put the code: ${message}`;
  }
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'parka.contacto@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
