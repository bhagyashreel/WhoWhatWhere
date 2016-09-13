'use strict';

var express = require('express');
var serveStatic = require('serve-static');
var Yelp = require('yelp');
var yelpParse = require('./yelp-response-parse');
var Dodge = require('dodge');
/*Merge function to combine data from both the servers*/
var merge = require('./merge-results');
var fourParse = require('./four-square-response-parse');
var bodyParser = require('body-parser');
var opener = require('opener');

var w3App = express();
w3App.use(serveStatic(__dirname));
w3App.use(bodyParser.json());
w3App.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

/*Yelp middleware*/
var yelp = new Yelp({
    consumer_key: 'hyIQVkkGLREDsZobyPp5dQ',
    consumer_secret: 'UgKdpO46BHlEOT-3K3MIPilF-Ro',
    token: 'PCPmAjNSEpcZ4T7TFaQ3VKj8-nhhRhWJ',
    token_secret: 'uF-cSlKj9usvzCIjSeVzwR2OcS8'
});

/*Foursquare middleware*/
var fourSquare = new Dodge({
    clientId: 'EYKK5MEYA0CZDJKVZDAG40XDXGPTEAJDBJMKQJ0PVIXRVLQ3',
    clientSecret: 'CDMXZTPWMVUZHYYH4ORN2W5LULKRF5VQTHKOJXHSVTMXUKCC'
});

function getFourSquare(term, location,  callBack) {
    fourSquare.venues.search({near: location , query:term}, function(err, venues){
        if (err) {
            return callBack(err);
        }
        console.log( venues);
        return callBack(null, fourParse(venues));
    });
}

function getYelpData(term, location,  callBack) {
    yelp.search({ term: term, location: location })
        .then(function (data) {
            console.log( data);
            return callBack(null, yelpParse(data));
        }).catch(function (cause) {
        return callBack(cause);
    });
}


function getData(term, location,  callBack) {
    var gotError  = false;
    var firstData = null;

    getYelpData(term, location, function (err, data) {
        if (err) {
            if (gotError) {
                return callBack(err);
            } else {
                gotError  = true;
                firstData = [];
            }
        } else {
            if (firstData) {
                return callBack(null, merge(data, firstData));
            } else {
                firstData = data;
            }
        }
    });

    getFourSquare(term, location,  function (err, data) {
        if (err) {
            if (gotError) {
                return callBack(err);
            } else {
                gotError  = true;
                firstData = [];
            }
        } else {
            if (firstData) {
                console.log(merge(firstData, data));
                return callBack(null, merge(firstData, data));
            } else {
                firstData = data;
            }
        }
    });
}


w3App.get('/search', function (req, res) {
    var query         = req.query.term,
        location      = req.query.location;
    console.log(query,location);
    if (query && location) {
        return getData(query, location,  function (err, data) {
            if (err) {
                return res.send(JSON.stringify({err: true, code: err}));
            }
            return res.send(JSON.stringify(data));
        });
    } else {
        return res.send(JSON.stringify({err: true, code: 'INVALID_REQUEST'}));
    }
});


w3App.listen(3011, function () {
    opener('http://localhost:3011');
});
