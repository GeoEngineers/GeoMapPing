var services = require('../src/services.js');
var when = require('when');
var geoUtilities = require('../../appServer/lib/geoUtilities.js');


exports.get = function(req, res, next){
    services.getCurrentServicesList()
    .then(function(result){
        res.send(result);
        return next();
    })
    .otherwise(function(error){
        res.send(error);
        return next(error);
    });
};


exports.put = function(req, res, next) {    
    services.saveServicesListItem(req.params.ServicesListItem)
    .then(function(result){
        res.send(result);
        return next();
    })
    .otherwise(function(error){
        res.send(error);
        return next(error);
    });
};



exports.destroy = function(req, res, next) {
    services.removeServicesListItem(req.params.id)
    .then(function(result){
        console.log("Destroy Complete");
        res.send(result);
        return next();
    })
    .otherwise(function(error){
        res.send(error);
        return next(error);
    });
};
