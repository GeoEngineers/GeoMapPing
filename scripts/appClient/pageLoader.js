(function ($) {
    MainApplication.LoadedPages = [];
    MainApplication.viewObjs = [];
    MainApplication.views = [];
    MainApplication.models = [];
    MainApplication.pageInitializer = [];
    MainApplication.Templates = [];
    MainApplication.PageLoader = MainApplication.module("PageLoader", function () {
        //init this and store it for later use
        var page_options = {};
        this.startWithParent = false;
        this.on("before:start", function (options) {
            page_options = options;
			
            //kill the region display
            if (MainApplication.mainRegion !== undefined) { MainApplication.mainRegion.close(); }
            if (MainApplication.pageInitializer !== undefined && MainApplication.pageInitializer[page_options.path] !== undefined) { MainApplication.pageInitializer[page_options.path].stop(); }
            if (MainApplication.views !== undefined) {
                for (var viewToDelete in MainApplication.views) {
					if(viewToDelete !== "indexOf"){
						MainApplication.views[viewToDelete].close();
					}
                }
            }
            MainApplication.views = [];
            MainApplication.vent.unbind();
            //kill all active models/collections
            //kill all active templates
        });
        this.on("start", function() {
            //var scoped so we can use this within the module specifically
            var page_source_files = [];
            this.thisPath = page_options.path;
            if (page_options.path !== undefined && page_options.path !== null) {
                if (MainApplication.ConfigFiles !== undefined && MainApplication.ConfigFiles[page_options.path] !== undefined) {
                    var key;
					if (MainApplication.ConfigFiles[page_options.path].libraries !== undefined) {
                        for (key in MainApplication.ConfigFiles[page_options.path].libraries) {
                            page_source_files.push("/scripts/libraries/" + MainApplication.ConfigFiles[page_options.path].libraries[key].library + "?ver=" + MainApplication.appVersion);
                        }
                    }
					if (MainApplication.ConfigFiles[page_options.path].models !== undefined) {
                        for (key in MainApplication.ConfigFiles[page_options.path].models) {
                            page_source_files.push("/scripts/appClient/models/" + MainApplication.ConfigFiles[page_options.path].models[key].model + "?ver=" + MainApplication.appVersion);
                        }
                    }
                    if (MainApplication.ConfigFiles[page_options.path].templates !== undefined) {
                        for (key in MainApplication.ConfigFiles[page_options.path].templates) {
                            page_source_files.push("/scripts/appClient/templates/" + MainApplication.ConfigFiles[page_options.path].templates[key].template + "?ver=" + MainApplication.appVersion);
                        }
                    }
                    if (MainApplication.ConfigFiles[page_options.path].views !== undefined) {
                        for (key in MainApplication.ConfigFiles[page_options.path].views) {
                            page_source_files.push("/scripts/appClient/views/" + MainApplication.ConfigFiles[page_options.path].views[key].view + "?ver=" + MainApplication.appVersion);
                        }
                    }
                }
                require(page_source_files, function() {
                    MainApplication.PageLoader.stop();
                });
            }
        });
        this.addFinalizer(function () {
            var this_path = this.thisPath;
            MainApplication.LoadedPages.push(this.thisPath);
			if(MainApplication.ConfigFiles[this.thisPath] !== undefined ){
				require(["/scripts/appClient/initializers/" + MainApplication.ConfigFiles[this.thisPath].initializers  + "?ver=" + MainApplication.appVersion], function () {
					MainApplication.addInitializer(function () {
						//we pass in page options from the module
						MainApplication.mainRegion.once("show", function () {
							var configPageTitle = MainApplication.ConfigFiles[this_path].sectionName !== undefined ? MainApplication.ConfigFiles[this_path].sectionName : "";
							var configPageContainerClass = MainApplication.ConfigFiles[this_path].containerClass !== undefined ? MainApplication.ConfigFiles[this_path].containerClass : "";
							//once the initializers load, load the page title and custom styles
							MainApplication.views.sitePageTitle = new SiteMasterTitle({
								pageTitle: configPageTitle
							});
							MainApplication.titleRegion.show(MainApplication.views.sitePageTitle);
							MainApplication.mainRegion.$el.attr("class", configPageContainerClass);
						});
						//load application notification events
						MainApplication.ApplicationNotificationLoader.runNotifications(page_options);
						//run the main application
						MainApplication.pageInitializer[this_path].start(page_options);
					});
				});
			}else{
				$(MainApplication.mainRegion.el).html("The requested page could not be loaded.");
			}
        });
    });
	
    //notification loader
    MainApplication.ApplicationNotificationLoader = {};
    MainApplication.ApplicationNotificationLoader.runNotifications = function (options) {
		if(options.path === "AppNavigation" && $.cookie('siteFirstLoad')==='true' && ($.cookie('firstLoadModalDisplayed')===undefined || $.cookie('firstLoadModalDisplayed')===null || $.cookie('firstLoadModalDisplayed')===false)){
			this.intrusiveNotification = new GeoAppBase.GenericModalInterface({
				modalTitle: "Welcome",
				contentTemplate: "Welcome to the RCO application interface.  From here you may select available applications and contact support.",
				okText: "OK",
				okCallback: function() {
					$.cookie('firstLoadModalDisplayed',true);
					window[ApplicationName].modalRegion.hideModal();
				},
				cancelCallback: function() {
					$.cookie('firstLoadModalDisplayed',true);
					window[ApplicationName].modalRegion.hideModal();
				}
			});
			this.intrusiveNotification.once("show", function(){
				window[ApplicationName].modalRegion.lockModal();
			});
			window[ApplicationName].modalRegion.show(this.intrusiveNotification);
		}
    };	
})(jQuery);