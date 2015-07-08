// MODULES
var express      = require('express');
var app          = express();
var errorhandler = require('errorhandler');
var session      = require('express-session')
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan       = require('morgan');
var mongoose     = require('mongoose');
var swig         = require('swig');
var flash        = require('connect-flash');
var i18n         = require('i18n');
var local        = require('./config/local.js');


// TRANSLATION
i18n.configure({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  directory: __dirname + '/locales',
  cookie: 'lang'
});
global.i18n = i18n;


// CONFIGURATION
app.engine('html', swig.renderFile);
app.set('port', process.env.PORT || local.server.port);
app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', __dirname + '/views');
app.set('env', process.env.ENV || local.env);
app.use(morgan('dev'));
app.use(session({ secret: 'abitbol', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(i18n.init);
app.use(flash());
app.use(express.static(__dirname + '/assets'));
swig.setDefaults({ cache: false });


// DATABASE
mongoose.connect(local.db.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb erreur connexion:'));
db.once('open', function() { console.log('Mongodb connecté')})


// ROUTES
require('./routes/user')(app);
require('./routes/list')(app);
require('./routes/index')(app);
app.get('*', function(req, res) { 
  res.status(404).render('404');
});


// SERVER
if (local.env == 'development') {
  app.use(errorhandler());
}

app.listen(app.get('port'), function() {
  console.log('10tracksthat - Paf ' + app.get('port'));
});
