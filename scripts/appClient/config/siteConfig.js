/////////////////////OVERRIDES - CONFIG INFO BELOW////////////////////
//fix for marionette template compilation process, advised via the Marionette JS GitHub Repo
Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
    return Handlebars.compile(rawTemplate);
};
/*
 * Overwrites the original Backbone.sync with a helper function, that
decides
 * whether a model should use the remote storage system, or a local
storage.
 * @param {String} method The crud method to be performed.
 * @param {Backbone.Model} The model that triggered this sync.
 * @param {Object} options The options to be handed on to the $.ajax
method.
 * @function
 */

//Backbone.emulateHTTP = true;
//This application declaration
var ApplicationName = "MainApplication";
window[ApplicationName] = new Backbone.Marionette.Application();
window[ApplicationName].appVersion = '0.1.20130730'
//Geoengineers main site loader
var GeoAppBase = new Backbone.Marionette.Application();
/////////////////////OVERRIDES - CONFIG INFO BELOW////////////////////


MainApplication.LandingPage = "LandingPage";
MainApplication.hostURL = window.location.protocol + "//" + window.location.host;
MainApplication.ConfigFiles = {
    //this page is the default page
    "LandingPage" : {
        "Id": 1,
        "hashPath": "*actions",
        "containerClass": "node-outline",
        "templates": [
            { "template" : "landingPageTemplate.js" }
        ],
        "views": [
            { "view": "landingPageViews.js" }
        ],
        "initializers": "initLandingPage.js"
    },
    "ContactUs": {
        "Id": 6,
        "sectionName": "Contact GeoEngineers",
        "containerClass": "node-outline",
        "hashPath": "ContactUs",
        "templates": [
            { "template": "contactUsTemplates.js" }
        ],
        "views": [
            { "view": "contactUsViews.js" },
        ],
        "initializers": "initContactUs.js"
    }
};  
