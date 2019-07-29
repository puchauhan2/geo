var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb://admin1:admin@ds135690.mlab.com:35690/ims_db';

var promise = mongoose.connect(uri, { useMongoClient: true });

mongoose.connection.on('connected', function(){
	console.log("Mongoose Default Connection.")
});