//This is where we extend various components of the application.  This is preferable to modifying the source JS files, 
//REMEMBER..NEVER build a function here unless it's really useful on a app scope

_.extend(Handlebars, {
    buildTemplate: function (dataModel, template) {
        var handleBarsTemplate = Handlebars.compile(template);
        var data = dataModel;
        return handleBarsTemplate(data);
    },
    buildSelectOptions: function (dataset, valueTemplate, displayTemplate, selectedValue) {
        var retval = "";
        if (dataset != null) {
            for (var i = 0; i < dataset.length; i++) {
				valueRendered = Handlebars.buildTemplate(dataset[i],valueTemplate);
				displayRendered = Handlebars.buildTemplate(dataset[i],displayTemplate);
                if (Handlebars.buildTemplate(dataset[i],valueTemplate) == selectedValue) {
                    retval = retval + "<option selected='true' value='" + valueRendered + "'>" + displayRendered + "</option>";
                } else {
                    retval = retval + "<option value='" + valueRendered + "'>" + displayRendered + "</option>";
                }				
            }
        }
        return retval;
    },
	buildSelectOptionsBB: function (dataset, valueTemplate, displayTemplate, selectedValue) {
        var retval = "";
        if (dataset != null) {
			dataset.each(function(data){
				valueRendered = Handlebars.buildTemplate(data.attributes,valueTemplate);
				displayRendered = Handlebars.buildTemplate(data.attributes,displayTemplate);
                if (Handlebars.buildTemplate(data.attributes,valueTemplate) == selectedValue) {
                    retval = retval + "<option selected='true' value='" + valueRendered + "'>" + displayRendered + "</option>";
                } else {
                    retval = retval + "<option value='" + valueRendered + "'>" + displayRendered + "</option>";
                }
			});
        }
        return retval;
    }
});

//running show(someNewView) blows away the current view within a region and the related view events, 
//essentally killing the event rules, so this is an alternative to the show(loadingView) technique, for already rendered views
//these functions do not affect the DOM status of the view, BUT this can only be used on a rendered view.
_.extend(Backbone.Marionette.View.prototype, {
    startLoading: function () {
        this.$el.hide();
        $("#" + this.$el.parent()[0].id).append("<div id='loading_" + this.cid + "'>" + GeoAppBaseTemplates.loadingIndicator + "</div>");
    },
    endLoading: function () {
        this.$el.show();
        $("#loading_" + this.cid).remove();
    }
});

_.extend(GeoAppBase, {
    getHashTag: function () {
        return window.location.hash.substring(1);
    }
});