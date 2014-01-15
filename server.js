
var restify = require('restify');
var fs = require("fs");
var schedule = require('node-schedule');

var siteController = require('./scripts/appServer/controllers/siteController.js');
var servicesController = require('./scripts/appServer/controllers/servicesController.js');
var checkservicesController = require('./scripts/appServer/controllers/checkservicesController.js');
var config = JSON.parse(fs.readFileSync("config.json"));

var rule = new schedule.RecurrenceRule();
var minuteInterval = config.checkInterval;
rule.minute = []; //Runs every 1 minutes
for(var i=0; i < 60; i++)
{
	if(i % minuteInterval == 0)
	rule.minute.push(i);
}
var job = schedule.scheduleJob(rule, function(){
	checkservicesController.checkServices();    
});


var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.jsonp());
server.use(restify.CORS());
server.use(restify.fullResponse());

//Define Endpoints for Site and CRUD functionality
server.get('/serviceData', servicesController.get);
server.get('/saveService', servicesController.put);
server.get('/deleteService', servicesController.destroy);
server.get('/.*', siteController.loadsite);

var port = process.env.PORT || 1337;

server.listen(port, function() {
	console.log('%s listening at %s', server.name, server.url);
});