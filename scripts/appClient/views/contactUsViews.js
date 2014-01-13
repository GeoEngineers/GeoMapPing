var ContactUsView = Backbone.Marionette.ItemView.extend({
    template: function (serialized_model) {
        return Handlebars.buildTemplate(serialized_model, MainApplication.Templates.ContactUsView);
    },
    initialize: function (options) {
        //this.variableName = options.variableName
    },
    onRender: function () {
        //do nothing
        return this;
    }
});
