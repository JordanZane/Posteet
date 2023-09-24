const nodemailer = require('nodemailer');
const path = require('path');
const validator = require('validator');
const User = require('../models/User');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const outlookEmailPassword = process.env.OUTLOOK_EMAIL_PASSWORD;
const outlookEmail = process.env.OUTLOOK_EMAIL;
const smtpServer = process.env.SMTP_SERVER;
const smtpPort = process.env.SMTP_PORT;

exports.sendEmail = async (req, res) => {
  console.log('Send email route called');
  const { email, message } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Adresse email invalide' });
  }

  if (validator.isEmpty(message) || typeof message !== 'string') {
    return res
      .status(400)
      .json({ message: 'Le message ne peut pas être vide' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: smtpPort,
      secure: false,
      auth: {
        user: outlookEmail,
        pass: outlookEmailPassword,
      },
    });

    const mailOptions = {
      from: outlookEmail,
      to: outlookEmail,
      subject: 'Nouveau message de contact',
      text: `De : ${email}\n\nMessage : ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.response);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.log("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email" });
  }
};

exports.sendEmailResetPw = (req, res, next) => {
  console.log('Send Mail Reset Pw User route called');
  const email = req.body.email;

  /* Verification sur email user : Format email + Champs vide, Presence dans BDD */
  if (!validator.isEmail(email) && validator.isEmpty(email)) {
    return res.status(400).json({ message: 'Adresse email invalide' });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: 'Adresse email introuvable' });

        /* Definir transporter avec nodeMailer + options (envoi from posteet to email user) */
      } else {
        const transporter = nodemailer.createTransport({
          host: smtpServer,
          port: smtpPort,
          secure: false,
          auth: {
            user: outlookEmail,
            pass: outlookEmailPassword,
          },
        });

        const mailOptions = {
          from: outlookEmail,
          to: email,
          subject: 'POSTEET : Demande de rénitialisation de mot de passe',
          text: `Veuillez cliquer sur ce lien pour rénitialiser votre mot de passe`,
        };

        /*Send mail + message reussite ou error */
        const info = transporter.sendMail(mailOptions);
        console.log('Email envoyé :', info.response);
        res.status(200).json({
          message: 'Demande de rénitialisation de mot de passe envoyée',
        });
      }
    })

    .catch((error) => res.status(500).json(error));
};
