var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact', project: 'ExpressProject' });
});

/* POST for the form. */
router.post('/send', function(req, res, next) {	
  var transporter = nodemailer.createTransport({
  	service: 'Gmail',
  	auth: {
  		user: 'user@gmail.com',
  		pass: 'pass'
  	}
  });

  var mailOptions = {
  	from: 'ExpressProject mailer <god@heaven.realm>',
  	to: 'user@gmail.com',
  	subject: 'Contact form submission',
  	text: 'New submission aquired from ' + req.body.name + '(' + req.body.email + '): ' + req.body.message,
  	html: '<p>New submission aquired from <b>' + req.body.name + '<i>(' + req.body.email + ')</i></b>:</p><p>' + req.body.message + '</p>'  	
  };

  transporter.sendMail(mailOptions, function(error, info) {
  	if (error) {
  		console.log(error);
  		res.redirect('/');
  	} else {
  		console.log('Message sent: ' + info.response);
  		res.redirect('/');
  	}
  });
});

module.exports = router;