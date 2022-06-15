if (!process.env.PORT) {
  require('dotenv').config()
  process.env.NODE_ENV = "dev"
}

// initializing frameworks, middleware
// FRAMEWORK: express
const express = require('express');
// MIDDLEWARE: easier access and interaction with file system
const path = require('path');
// MIDDLEWARE: for favicon, caches in memory to improve performance
const favicon = require('serve-favicon');
// MIDDLEWARE: an HTTP request logger
const logger = require('morgan');
// MIDDLEWARE: parses a cookie header to make it easier to work with
const cookieParser = require('cookie-parser');
// MIDDLEWARE: takes body of request and parses it to JSON, URL encoded, text, raw so server can recieve it
const bodyParser = require('body-parser');
// MIDDLEWARE: lets you use HTTP verbs (put, delete, post) where client doesn't support it
const methodOverride = require('method-override')
// require our mailgun dependencies
// const nodemailer = require('nodemailer');
// const mg = require('nodemailer-mailgun-transport');

const app = express();

app.locals.PUBLIC_STRIPE_API_KEY = process.env.PUBLIC_STRIPE_API_KEY

// LIBRARY: ODM (object data modeling) library, connects mongodb and express
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petes-pets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// // auth with our mailgun API key and domain
// const auth = {
//   auth: {
//     api_key: process.env.MAILGUN_API_KEY,
//     domain: process.env.EMAIL_DOMAIN
//   }
// }

// // create a mailer
// const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// // SEND EMAIL
// const user = {
//   email: 'maliabarker@icloud.com',
//   name: 'Emily',
//   age: '43'
// };

// nodemailerMailgun.sendMail({
//   from: 'no-reply@example.com',
//   to: user.email, // An array if you have multiple recipients.
//   subject: 'Hey you, awesome!',
//   template: {
//     name: 'email.handlebars',
//     engine: 'handlebars',
//     context: user
//   }
// }).then(info => {
//   console.log('Response: ' + info);
// }).catch(err => {
//   console.log('Error: ' + err);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


require('./routes/index.js')(app);
require('./routes/pets.js')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
