
var restify = require('restify');
var fs = require("fs");
var siteController = require('./scripts/appServer/controllers/siteController.js');
var servicesController = require('./scripts/appServer/controllers/servicesController.js');
var config = JSON.parse(fs.readFileSync("config.json"));


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


server.listen(config.port, config.host, function(){
	console.log("listening: " + config.host + ":" + config.port);
});