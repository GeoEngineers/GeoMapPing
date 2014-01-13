var SiteMasterTitle = Backbone.Marionette.ItemView.extend({
    template: function (serialized_model) {
        return Handlebars.buildTemplate(serialized_model, GeoAppBaseTemplates.pageTitleDisplay);
    },
    initialize: function(options){
        this.pageTitle = options.pageTitle;
    },
    templateHelpers: function () {
        return {
            pageTitle:this.pageTitle
        }
    }
});