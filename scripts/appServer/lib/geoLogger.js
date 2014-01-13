var bookshelf = require('bookshelf');

exports.GeoLogLevel = {
	Low: "Low",
	High: "High",
};

exports.GeoLogCategory = {
	Api: "Api",
	Application: "Application",
	Email: "Email",
	TokenLogin: "TokenLogin",
	IncidentDetail: "IncidentDetail",
	UserLogin: "UserLogin",
	ProcessService: "ProcessService",
	WorkflowQueue: "WorkflowQueue",

};

bookshelf.geoLogger = bookshelf.initialize({
  client: 'postgres',
  connection: {
    host     : 'localhost',
	port     : '5432',
    user     : 'postgres',
    password : 'geopostgres',
    database : 'Database_Name',
    charset  : 'utf8'
  }
});

exports.GeoLogEntry = bookshelf.geoLogger.Model.extend({
  tableName: 'geo_log_entry'
});

exports.GeoLogEntries = bookshelf.geoLogger.Collection.extend({
  model: exports.GeoLogEntry
});

exports.logMessage = function (geoLogLevel, geoLogCategory, source, message) {
	console.log(geoLogLevel + ' ' + geoLogCategory + ' ' + source + ' ' + message);
	var newEntry = new GeoLogEntry({
		geo_log_level: geoLogLevel,
		geo_log_category: geoLogCategory,
		source: source,
		message: message,
	});
	return newEntry.save();
};

exports.getLastNGeoLogEntries = function(n) {
  var geoLogEntries = new GeoLogEntries();
  return geoLogEntries.fetch();

};