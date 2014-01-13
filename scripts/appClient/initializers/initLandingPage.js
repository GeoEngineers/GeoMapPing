//Initial View Loader
var this_page_name = "LandingPage";
MainApplication.pageInitializer[this_page_name] = MainApplication.module(this_page_name+"Module", function () {
    this.startWithParent = false;
});
//Initial View Loader
MainApplication.pageInitializer[this_page_name].on("start", function (options) {

	MainApplication.models.serviceCollection = new ServiceCollection();
	MainApplication.views.landingPageView = new LandingPageView({
	    servicesCollection: MainApplication.models.serviceCollection
	});

	MainApplication.models.serviceCollection.fetch({
	    reset: true,
	    dataType: 'jsonp',
	    cache: false,
	    success: function (model, response, options) {
	        MainApplication.mainRegion.show(MainApplication.views.landingPageView);
	    },
	    error: function (model, xhr, options) {
	        alert("There was an error recieving the services, please refresh your browser and try again.");
	    }
	});
	MainApplication.views.landingPageHeaderView = new LandingPageHeaderView({});
    MainApplication.headerRegion.show(MainApplication.views.landingPageHeaderView);
});