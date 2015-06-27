// MODULES
var express      = require('express');
var app          = express();
var errorhandler = require('errorhandler');
var bodyParser   = require('body-parser');
var morgan       = require('morgan');
var mongoose     = require('mongoose');
var swig         = require('swig');
var local        = require('./config/local.js');


// CONFIGURATION
app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('port', process.env.PORT || local.server.port);
app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', __dirname + '/views');
app.set('env', process.env.ENV || local.env);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));
swig.setDefaults({ cache: false });


// SCRIPTS
mongoose.connect(local.db.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb erreur connexion:'));
db.once('open', function() { console.log('Mongodb connecté')})


// ROUTES
var router = express.Router();
require('./routes/index')(router);
require('./routes/list')(router);
require('./routes/user')(router);

// SERVEUR
if (local.env == 'development') {
  app.use(errorhandler());
}

app.listen(app.get('port'), function() {
  console.log('10tracksthat - Paf ' + app.get('port'));
});
