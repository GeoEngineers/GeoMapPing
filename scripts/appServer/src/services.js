
var bookshelf = require('bookshelf');
var _ = require('lodash');
var when = require('when');
var geoUtilities = require('../../appServer/lib/geoUtilities.js');


bookshelf.services = bookshelf.initialize({
		client: 'sqlite3',
		connection: {
			filename: "servicemonitor.db"
		}
});

var ServicesItem = bookshelf.services.Model.extend({
	tableName: 'Service'
});

var ServicesItems = bookshelf.services.Collection.extend({
	model: ServicesItem
});

exports.getCurrentServicesList = function(){
	return new ServicesItems().fetch()
	.then(function(servicesItems){
		return _.map(servicesItems.models, function(servicesItem){
			return geoUtilities.upperCamelCaseify(servicesItem.attributes);
		});
	});
};

exports.saveServicesListItem = function(itemAttributes){
	var d = when.defer();
	exports.getServicesListItem(itemAttributes.Id)
	.then(function(existingItem){
		var dbItemAttributes = geoUtilities.snakeCaseify(itemAttributes);
		if (existingItem != undefined){			
			_.each(dbItemAttributes, function(val, key){
				existingItem.set(key, val);
			})
		} else {
			existingItem = new ServicesItem(dbItemAttributes);
		}
		return existingItem.save();
	})
	.then(function(result){
			d.resolve(geoUtilities.upperCamelCaseify(result.attributes));
	})
	.otherwise(function(result){
			d.reject(result);
	});
	return d.promise;
};

exports.getServicesListItem = function(itemId){
	return new ServicesItem({
		id: itemId
	})
	.fetch({require: true})
	.then(function(servicesItem){
		return geoUtilities.upperCamelCaseify(servicesItem.attributes);
	})
	.otherwise(function(){
		return null;
	});
};


exports.removeServicesListItem = function(id){
	var d = when.defer();
	new ServicesItems().fetch().then(
		function(servicesItems){
			servicesItems.query().where('ID', id).del().then(function(result){
				d.resolve("Service Deleted");
			});
	});
	return d.promise;
};
