//Models
var GenericModel = Backbone.Model.extend({
    urlRoot: 'api/modelname',
    idAttribute: 'Id'
});

var ServiceModel = Backbone.Model.extend({
    urlRoot: MainApplication.hostURL + '/serviceData',
    idAttribute: 'Id'
});


//Collections
var GenericCollection = Backbone.Collection.extend({
    url: 'api/modelname',
    model: GenericModel
});


var ServiceCollection = Backbone.Collection.extend({
    url: MainApplication.hostURL + '/serviceData',
    model: ServiceModel
});