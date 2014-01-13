var pg = require('pg');
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("../config.json"));


var errorMessages = {
    postgresConnectError: 'could not connect to postgres',
    postgresQueryError: 'error running query'
};

exports.pgQueryExecutor = function (query, success, error) {
    this.executeQuery = function() {
        var conString = config.connectionString;
        var client = new pg.Client(conString);
        client.connect(function (err) {
            if (err) error(errorMessages.postgresConnectError);
            client.query(query, function (err, result) {
                if (err) error(errorMessages.postgresQueryError);
                success(result);
                client.end();
            });
        });
    }
};