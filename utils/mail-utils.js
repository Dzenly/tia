'use strict';
/* globals gIn: true */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

/* globals gT: true */

// create reusable transporter object using SMTP transport
// Some antiviruses can block sending with self signed certificate.
// If this is your case -

function getSmtpTransporter() {
  return nodemailer.createTransport(
    smtpTransport({
      host: gT.suiteConfig.mailSmtpHost,
      secure: true,
      //secure : false,
      //port: 25,
      auth: {
        user: gT.suiteConfig.mailUser,
        pass: gT.suiteConfig.mailPassword
      }
      //, tls: {
      //  rejectUnauthorized: false
      //}
    })
  );
}

// All text fields (e-mail addresses, plaintext body, html body) use UTF-8 as the encoding.
// Attachments are streamed as binary.
var mailOptions = {
  from: 'AutoTest <build@rvision.pro>',
  to: '', // list of receivers
  subject: '',
  text: '', // plaintext body
  //html: '', // html body
  //attachments: [{
  //  // can be URL, i.e. we can save our logs history and access it by http.
  //  path: '', // filename derived from path.
  //  contentType: 'text/plain' // by default derive from path.
  //}]

};

/**
 * Sends email.
 *
 * @param subj
 * @param {Array of Strings} txtAttachments
 * @param {Array of Strings} [zipAttachments]
 * @returns {Promise<T>}
 */
exports.send = function (subj, txtAttachments, zipAttachments) {
  if (!gIn.params.email) {
    gIn.tracer.trace0('Mail disabled.');
    return;
  }
  if (!gT.suiteConfig.mailRecipientList) {
    gIn.tracer.traceErr('Mail list is empty.');
    return;
  }
  mailOptions.subject = subj;
  mailOptions.to = gT.suiteConfig.mailRecipientList;
  mailOptions.attachments = txtAttachments.filter(val => Boolean(val)).map(val => ({path: val, contentType: 'text/plain'}));

  /*{path: gT.engineConsts.gitPullLog}, */

  if (zipAttachments) {
    mailOptions.attachments = mailOptions.attachments.concat(
      zipAttachments.filter(val => Boolean(val)).map(val => ({path: val, contentType: 'application/zip'}))
    );
  }
  return gT.sOrig.promise.checkedNodeCall(
    function (options, callback) { // callback will be provided by checkedNodeCall
      getSmtpTransporter().sendMail(options, function (err, info) {
        if (err) {
          gIn.tracer.traceErr('sendMail ERR: ' + err);
        }
        /* else {
         console.log('SendMail response: ' + info.response);
         }*/
        callback(err, info);
      });
    }
    , mailOptions
  );
};
