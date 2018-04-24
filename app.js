/*jslint node: true */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cons = require('consolidate');
const fs = require('fs');
const hbs = require('handlebars');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
// Set up the express app
const app = express();

// TP added connection to mongoDB for mailling list
const mongoose = require('mongoose');
var dev_db_url = "mongodb://tgp22:account1@ds161493.mlab.com:61493/tp-todo-hmwk";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// Log requests to the console.
app.use(logger('dev'));

// Setting view engine
app.engine('html', cons.handlebars)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/static', express.static(__dirname + '/static/'));
hbs.registerHelper('if_equal', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
})
// Register partials
var partials = "./views/partials/";
fs.readdirSync(partials).forEach(function (file) {
    var source = fs.readFileSync(partials + file, "utf8"),
        partial = /(.+)\.html/.exec(file).pop();

    hbs.registerPartial(partial, source);
});

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'thisIsAFakeSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/inventory');
    } else {
        next();
    }
};
var loadError = (req, res, msg) => {
  res.status(401).redirect('/error?msg='+encodeURIComponent(msg))
}





// Require our routes into the application.
require('./server/routes')(app, sessionChecker, loadError);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(404).send({
  message: 'Could Not Find Page.',
}));

module.exports = app;
