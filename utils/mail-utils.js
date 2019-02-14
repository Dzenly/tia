'use strict';

/* globals gIn: true */

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const fileUtils = require('./file-utils');

/* globals gT: true */

// create reusable transporter object using SMTP transport
// Some antiviruses can block sending with self signed certificate.
// If this is your case -

function getSmtpTransporter() {
  return nodemailer.createTransport(
    smtpTransport({
      // service: 'tia',
      host: gT.suiteConfig.mailSmtpHost,
      secure: true,

      // secure : false,
      // port: 25,
      auth: {
        user: gT.suiteConfig.mailUser,
        pass: gT.suiteConfig.mailPassword,
      },

      // , tls: {
      //  rejectUnauthorized: false
      // }
    })
  );
}

// All text fields (e-mail addresses, plaintext body, html body) use UTF-8 as the encoding.
// Attachments are streamed as binary.
const mailOptions = {
  // from: '',
  // to: '', // list of receivers
  // subject: '',
  // text: '', // plaintext body
  // html: '', // html body
  // attachments: [{
  //  // can be URL, i.e. we can save our logs history and access it by http.
  //  path: '', // filename derived from path.
  //  contentType: 'text/plain' // by default derive from path.
  // }]
};

/**
 * Sends email.
 *
 * @param subj
 * @param {Array of Strings} txtAttachments
 * @param {Array of Strings} [zipAttachments]
 * @returns {Promise<T>}
 */
exports.send = function send(subj, htmlDif, txtDif, txtAttachments, zipAttachments) {
  if (!gT.cLParams.enableEmail) {
    gIn.tracer.msg2('Mail is disabled.');
    return;
  }

  if (!gT.suiteConfig.mailRecipientList) {
    gIn.tracer.err('Mail list is empty.');
    return;
  }

  txtAttachments = txtAttachments.filter(txtAttachment => !fileUtils.isAbsent(txtAttachment));

  mailOptions.html = htmlDif;
  mailOptions.text = txtDif; // TODO: ansi colors, check that text mails support them.

  mailOptions.subject = subj;

  if (gT.suiteConfig.mailFrom) {
    mailOptions.from = gT.suiteConfig.mailFrom;
  } else {
    mailOptions.from = gT.suiteConfig.mailUser;
  }

  mailOptions.to = gT.suiteConfig.mailRecipientList;
  mailOptions.attachments = txtAttachments
    .filter(val => Boolean(val)).map(val => ({ path: val, contentType: 'text/plain' }));

  /* {path: gT.engineConsts.gitPullLog}, */

  if (zipAttachments) {
    mailOptions.attachments = mailOptions.attachments.concat(
      zipAttachments.filter(val => Boolean(val)).map(val => ({ path: val, contentType: 'application/zip' }))
    );
  }

  return new Promise(((resolve, reject) => {
    let attemptCounter = gT.engineConsts.mailAttemptsCount;

    function sendMail() {
      getSmtpTransporter().sendMail(mailOptions, (err, info) => {
        if (err) {
          gIn.tracer.err(`sendMail ERR: ${err}`);
          if (attemptCounter) {
            attemptCounter--;
            gIn.tracer.msg1(`sendMail: retry, attemptCounter${attemptCounter}`);
            setTimeout(sendMail, gT.engineConsts.mailWaitTimeout * 1000);
          } else {
            gIn.tracer.err('sendMail ERR: no more attempts');
            reject(err);
          }
        } else {
          gIn.tracer.msg3(`sendMail Info: ${info}`);
          resolve(info);
        }
      });
    }
    sendMail();
  }));
};
