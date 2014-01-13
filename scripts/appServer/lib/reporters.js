var _ = require('underscore');

exports.jsonReporter = function (res) {
	var response = res;
	
	return function (result) {
		response.send(result);
	};
};


exports.consoleReporter = function (res) {
	var response = res;
	
	return function (result) {
		console.log('Reporting');
		  _.each(result.models, function(model){
			console.log(model.attributes);
		  });
	};
};


exports.reportBookshelfModels = function (collection) {
		console.log('Reporting');
		
		  _.each(collection.models, function(model){
			console.log(model.attributes);
		  });
};