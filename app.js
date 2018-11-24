//#region snippet_Requires

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

//#endregion

//#region snippet_ConfigureAPI

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//#endregion

//[GET]
//#region snippet_GetHomePage

app.get('/', function(req, res) {
    res.render('index');
});

//#endregion

//#region snippet_GetAbout

app.get('/about', function(req, res) {
    res.render('about');
});

//#endregion

//#region snippet_GetContact

app.get('/contact', function(req, res) {
    res.render('contact');
});

//#endregion

//[POST]
//#region snippet_PostContact

app.post('/contact/send', function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Your email address',
            pass: 'Your password'
        }
    });

    var mailOptions = {
        from: 'Your name <Your email address>',
        to: 'The destination address',
        subject: 'Website Submission',
        text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email
              + 'Message: ' + req.body.message,
        html: '<p>You have a submission with the following details...</p><ul><li>' + 
              req.body.name + '</li><li>Email: ' + req.body.email+'</li><li>Message: ' + req.body.message + '</li></ul>'
        };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.redirect('/');
        }
        else {
            console.log('Message sent: ' + info.response);
            res.redirect('/');
        }
    });
});

//#endregion

app.listen(3000);
console.log('Server is running on port 3000');