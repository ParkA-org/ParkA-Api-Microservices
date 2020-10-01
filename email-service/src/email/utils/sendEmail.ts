import * as nodemailer from 'nodemailer';
import { confirmEmailWithCode } from './templates/confirmEmailwithCode';
import { confirmEmailWithLink } from './templates/confirmEmailwithLink';

export const sendEmail = async (
  email: string,
  message: string,
  origin: string,
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

  let html = confirmEmailWithLink(message);
  if (origin == 'mobile') {
    html = confirmEmailWithCode(message);
  }
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'parka.contacto@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'ParkA Confirm Your Email', // Subject line
    text: 'Hello world?', // plain text body
    html: html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
