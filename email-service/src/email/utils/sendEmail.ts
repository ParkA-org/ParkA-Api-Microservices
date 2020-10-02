import * as nodemailer from 'nodemailer';
import { confirmEmailWithCode } from './templates/confirmEmailwithCode';
import { confirmEmailWithLink } from './templates/confirmEmailwithLink';
import { resetPasswordWithCode } from './templates/resetPasswordwithCode';
import { resetPasswordWithLink } from './templates/resetPasswordWithLink';

export const sendEmail = async (
  email: string,
  message: string,
  origin: string,
  type: number,
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

  let html, subject;

  if (type != 1) {
    html = confirmEmailWithLink(message);
    subject = 'ParkA Confirm Your Email';
    if (origin == 'mobile') {
      html = confirmEmailWithCode(message);
    }
  } else {
    html = resetPasswordWithLink(message);
    subject = 'ParkA Reset Your Password';
    if (origin == 'mobile') {
      html = resetPasswordWithCode(message);
    }
  }
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'parka.contacto@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
