var lat_longs = require('./lat_long_Schema.js');
var geolib = require("geolib");

function latLongSave(req, res){
    var data = req.body;
    if (data) {
        var test = new lat_longs(data);

        test.save(function(err, data) {
            console.log("saved?")
            if (err) {
                console.log("error");
                res.status(404).send({ status: false, message: "ERROR While save" })
            }else{
                res.status(200).send({ status: true, message: "Successfully Update Activity.", data: data });
            }
        });
    }else{
        res.status(404).send({ status: false, message: "Room Id And User Id Should be Mandatory" })
    }
}

function fetchData(req, res){
    lat_longs.find({}).exec(function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).send({ status: false, message: "Data Processing Error.", error : err })
        } else {
            if (docs) {
                res.status(200).send({ status: true, message: "Access For Room Create", data: docs });
            } else {
                res.status(500).send({ status: false, message: "Data Not Found Error." })
            }
        }
    })
}

function checkNearest(req, res){

    var data = req.body;
    console.log(data);
    if(data && data.lat && data.long){
        lat_longs.find({}).exec(function (err, docs) {
            if (err) {
                console.log(err);
                res.status(500).send({ status: false, message: "Data Processing Error.", error : err })
            } else {
                if (docs) {
                    var mainObj = {}
                    docs.forEach(function(val, index){
                        mainObj[val.name] = {
                            latitude: parseFloat(val.lat),
                            longitude: parseFloat(val.long),
                            index: index
                        }
                    })
                    var result = geolib.findNearest({latitude: data.lat, longitude: data.long}, mainObj, 1);
                    if(result){
                        var key = result.key;
                        console.log(key);
                        var ind = mainObj[key].index;
                        var resData = docs[ind];
                        console.log(resData);
                        res.status(200).send({ status: true, message: "Data Available.", result: [resData] });
                    }else{
                        res.status(500).send({ status: false, message: "Data not found." });
                    }
                } else {
                    res.status(500).send({ status: false, message: "Data Not Found Error." });
                }
            }
        })
    }else{
        res.status(500).send({ status: false, message: "Proper Data Not Available." });
    }
}
module.exports = {
    latLongSave     : latLongSave,
    fetchData       : fetchData,
    checkNearest    : checkNearest
}


