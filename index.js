var express    = require('express');
var app      = express();
var bodyParser   = require('body-parser');

var config       = require('./config/config.json');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//load our routes and pass in our app and fully configured passport
require('./config/routes.js')(app);

var env = {
  "title"   : process.title,
  "version" : process.version,
  "platform"  : process.platform
}

var port = config.PORT;

app.listen(port,function () {

})