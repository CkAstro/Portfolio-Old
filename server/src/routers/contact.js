import express from 'express';
import nodeMailer from 'nodemailer';
import { MAIL_TOKEN } from '@/config';
import { logger } from '@/utils';

const router = express.Router();

router.post('/', (req, res) => {
   const { name, email, message } = req.body;
   if (email === 'test@e.mail' || email === 'te-st+em.ail@e.ma.iltest') return;
   const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'astro.cekolb@gmail.com',
         pass: MAIL_TOKEN,
      },
   });
   const mailOptions = {
      from: email,
      to: 'astro.cekolb@gmail.com',
      subject: `Contact Message: ${name} (${email})`,
      text: message,
   };
   transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
         logger(err);
         res.send({
            success: false,
            message:
               'Error sending message. Please try again later, or contact me directly at astro.cekolb@gmail.com',
         });
      } else {
         logger(info);
         res.send({
            success: true,
            message: 'Message sent. Thank you for contacting me.',
         });
      }
   });
});

export default router;
