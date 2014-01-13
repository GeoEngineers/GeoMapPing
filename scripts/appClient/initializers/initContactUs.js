var this_page_name = "ContactUs";
MainApplication.pageInitializer[this_page_name] = MainApplication.module(this_page_name+"Module", function () {
    this.startWithParent = false;
});
MainApplication.pageInitializer[this_page_name].on("start", function (options) {
    MainApplication.views.ContactUsView = new ContactUsView({
    });
    MainApplication.mainRegion.show(MainApplication.views.ContactUsView)
});
