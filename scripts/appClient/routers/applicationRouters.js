//Router information in here
var MainApplicationRouter = Backbone.Router.extend({
    routes: {
        "*actions/:id": "defaultRoute", // Backbone will try to match this route first
        "*actions": "defaultRoute"
    }
});
// Instantiate the router
MainApplication.router = new MainApplicationRouter;
MainApplication.router.on('route:defaultRoute', function (actions, id) {
    var routerAction = actions !== null ? actions : GeoAppBase.loggedinLandingPage;
    options = { "path": routerAction, "id": id };
    MainApplication.PageLoader.start(options);
});
