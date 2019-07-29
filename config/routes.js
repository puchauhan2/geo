var query = require('../query.js');

module.exports = function(app) {
	app.post('/', function(req, res){
		res.status(200).send('OK')
	})
	app.post('/save', query.latLongSave);
	app.post('/fetch', query.fetchData);
	app.post('/check', query.checkNearest);
}