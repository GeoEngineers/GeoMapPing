var GeoJSON = require('geojson');
var sqliteQuery = require('../lib/geoSqliteQuery.js');
var utilities = require('../lib/utilities.js');

exports.get = function (req, res, next) {
    var queryServices = 'SELECT ID, Name, Url, Status, Notified, Up, Down from Service;';    
    var queryManager = new sqliteQuery.QueryExecutor(queryServices,
        function (result) {            
            res.send(result);
        },
        function (errorMessage) {
	    console.log(errorMessage);
            res.send(errorMessage);
        });
    queryManager.executeQuery();
}


exports.put = function (req, res, next) {
    var query = buildQuery(req);
    var queryManager = new sqliteQuery.QueryExecutor(query,
        function (result) {
            res.send("Service Saved");
        },
        function (errorMessage) {
	    console.log(errorMessage);
            res.send(errorMessage);
        });
    queryManager.executeQuery();
}

exports.destroy = function (req, res, next) {
    var id = utilities.getParameterByName('i', req.url);
    var query = 'Delete from Service Where ID = ' + id + ';';
    var queryManager = new sqliteQuery.QueryExecutor(query,
        function (result) {
            res.send("Service Deleted");
        },
        function (errorMessage) {
	    console.log(errorMessage);
            res.send(errorMessage);
        });
    queryManager.executeQuery();
}


function buildQuery(req) {

    var id = utilities.getParameterByName('i', req.url);
    var name = utilities.getParameterByName('n', req.url);
    var service = utilities.getParameterByName('u', req.url);
    var query = "Insert into Service (Name, Url, Notified, Up, Down, Status) Values ";
    query = query + "('" + name + "', '" + service + "', 0,0,0,'Available');";
    if (id != 0) {
        query = "Update Service Set Name = '" + name + "', Url ='"+service+"', Notified = 0 Where ID =" + id + ';';
    }
    return query;
}