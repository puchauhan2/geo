var mongoose = require('mongoose');
Schema = mongoose.Schema;

var latLong = new Schema({
    id:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },
    load_rating:{
        type: Number,
        require: true
    },
    rating:{
        type: Number,
        require: true
    },
    lat: {
        type: String,
        require : true
    },
    long: {
        type: String,
        require : true
    },
    name: {
        type: String,
        require : true
    }
});

//create the model for activity and expose it to our app
module.exports = mongoose.model('lat_longs', latLong);