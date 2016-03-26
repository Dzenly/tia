var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

gTE.mailUtils = {};

// create reusable transporter object using SMTP transport
// Some antiviruses can block sending with self signed certificate.
// If this is your case - uncomment commented strings.
var transport = smtpTransport({
	host: 'smtp.yandex.ru',
	secure: true,
	//secure : false,
	//port: 25,
	auth: {
		user: 'build@rvision.pro',
		pass: 'hhoic565'
	},
	//tls: {
	//  rejectUnauthorized: false
	//}
});

var transporter = nodemailer.createTransport(transport);

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

gTE.mailUtils.sendMail = function(subj, attachment, archive) {
	if (!gTE.params.mail) {
		console.log('Mail disabled.');
		return;
	}
	if (!gTE.suiteConfig.mailList) {
		gTE.tracer.traceErr('Mail list is empty.');
		return;
	}
	mailOptions.subject = subj;
	mailOptions.to = gTE.suiteConfig.mailList;
	mailOptions.attachments = [/*{path: gTE.engineConfig.gitPullLog}, */{path: attachment, contentType: 'text/plain'}];
	if (archive)
		mailOptions.attachments.push({path: archive, contentType: 'application/zip'});
	return gTE.sel.promise.checkedNodeCall(
			function(options, callback) { // callback will be provided by checkedNodeCall
				transporter.sendMail(options, function(err, info) {
					if (err) {
						gTE.tracer.traceErr(err);
					} else {
						//console.log('SendMail response: ' + info.response);
					}
					callback(err, info);
				});
			}
			, mailOptions
	);
};
