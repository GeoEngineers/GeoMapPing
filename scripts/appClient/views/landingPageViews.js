var LandingPageView = Backbone.Marionette.Layout.extend({
    template: function (serialized_model) {
        return Handlebars.buildTemplate(serialized_model, MainApplication.Templates.LandingPageView);
    },
    initialize: function (options) {
		//this.bikePathModel = options.bikePathModel;
        this.servicesCollection = options.servicesCollection;
        _.bindAll(this, 'onShow');
    },
    events: {
        "click #btnAddService": "showAddService",
        "click #lnkHome": "loadHome",
        "click .dispatcher": "dispatcherInstantiate"
    },
    onShow: function () {        
        this.services = eval(JSON.stringify(this.servicesCollection));
        var servicesUp = 0;
        var servicesDown = 0;
        var averageUpTime = 0;
        var serviceCount = 0;
        var upTotal = 0;
        var downTotal = 0;
        var totaltests = 0;
        _.each(this.services, function (service) {
            if (service.Status == "Available")
                servicesUp += 1;
            else
                servicesDown += 1;
            upTotal += service.Up;
            downTotal += service.Down;
            serviceCount += 1;
        });
        totaltests = upTotal + downTotal;
        if(upTotal == 0)    averageUpTime = 0;
	if(totaltests == 0) averageUpTime = 100;
        if(totaltests !=0)  averageUpTime = (upTotal / totaltests) * 100;

        $("#lblAverageUp").html(averageUpTime.toFixed(2) + '%' );
        $("#lblServicesUp").html(servicesUp + "<i class=\"fa fa-arrow-up fa-4\"></i>");
        $("#lblServicesDown").html(servicesDown + "<i class=\"fa fa-arrow-down fa-4\"></i>");
        this.loadGrid();

    },
    showAddService: function()
    {
        this.serviceModalView = new ServiceModalView({
            modalStatus: "New Service Montitor",
            services: this.services,
            Id: 0
        });
        MainApplication.modalRegion.show(this.serviceModalView);
    },
    showService: function (service) {
        this.serviceModalView = new ServiceModalView({
            modalStatus: "Edit Service Montitor",
            services: this.services,
            Id: service
        });
        MainApplication.modalRegion.show(this.serviceModalView);
    },
    showDeleteService: function (service) {
        this.serviceDeleteModalView = new ServiceDeleteModalView({
            modalStatus: "Delete Service Montitor",
            Id: service
        });
        MainApplication.modalRegion.show(this.serviceDeleteModalView);
    },
    getGridColumns: function () {
        return [
            { id: "Id", name: " ", field: "Id", sortable: false, maxWidth: 30, formatter: this.EditServiceButton },
            { id: "DeleteId", name: " ", field: "Id", sortable: false, maxWidth: 30, formatter: this.DeleteServiceButton },
            { id: "Name", name: "Service Name", field: "Name", minWidth: 150, maxWidth: 250, sortable: false, },
            { id: "Url", name: "Url", field: "Url", minWidth: 350, sortable: false },
            { id: "Status", name: "Status", field: "Status", minWidth: 150, maxWidth: 250, sortable: false }
        ];
    },
    getGridOptions: function () {
        return {
            enableCellNavigation: true,
            forceFitColumns: true,
            enableColumnReorder: true,
            rowHeight: 40
        };
    },
    getGridData: function () {
        var data = [];
        _.each(this.services, function (service) {
            data.push({
                Id: service.ID,
                Name: service.Name,
                Url: service.Url,
                Status: service.Status
            });
        });
        return data;
    },
    loadGrid: function (services) {
        var data = this.getGridData();
        this.grid = new Slick.Grid("#gridContainer", data, this.getGridColumns(), this.getGridOptions());
        this.grid.visible = true;
        this.grid.render();
    },
    EditServiceButton: function (row, cell, value, columnDef, dataContext) {
        return "<a style=\"cursor: pointer; color:#ccff00;\" class=\"dispatcher\" id=\"dispatcher_showService_" + value + "\" data-service=\"" + value + "\"> <img src='./Content/themes/base/glyphicons/glyphicons_030_pencil_yellow.png' class='pencil-icon'  /></a>";
    },
    DeleteServiceButton: function (row, cell, value, columnDef, dataContext) {
        return "<a style=\"cursor: pointer; color:#cc4400;\"  class=\"dispatcher\" id=\"dispatcher_showDeleteService_" + value + "\" data-service=\"" + value + "\"> <img src='./Content/themes/base/glyphicons/glyphicons_016_bin_red.png' class='trash-icon' /></a>";
    },
    dispatcherInstantiate: function (e) {
        var dispatcher_name_arr = e.currentTarget.id.split("_");
        var dispatcher_name = dispatcher_name_arr[1];
        this[dispatcher_name]($("#" + e.currentTarget.id).data('service'));
    }
});	

var LandingPageHeaderView = Backbone.Marionette.ItemView.extend({
    template: function (serialized_model) {
        return Handlebars.buildTemplate(serialized_model, MainApplication.Templates.LandingPageHeaderView);
    },
    initialize: function (options) {

    }
});



var ServiceModalView = Backbone.Marionette.Layout.extend({
    template: function (serialized_model) {
        var handleBarsTemplate = Handlebars.compile(MainApplication.Templates.ServiceModalView);
        var data = serialized_model;
        return handleBarsTemplate(data);
    },
    templateHelpers: function () {
        var dc = this;
        var name = "";
        var url = "";
        _.each(this.services, function (service) {
            if (service.ID.toString() == dc.id) {
                name = service.Name;
                url = service.Url;
            }
        });
        return {
            serviceHeader: this.modalStatus,
            serviceName: name,
            serviceUrl: url
        };
    },
    initialize: function (options) {
        this.modalStatus = options.modalStatus;
        this.id = options.Id;
        this.services = options.services;
    },
    onShow: function()
    {

    },
    events: {
        "click #btnAbandonEditService": "closeModal",
        "click #btnSaveService": "saveService",
        "click #btnCloseEditService": "closeModal"
    },
    onRender: function () {
        return this;
    },
    closeModal: function () {
        MainApplication.modalRegion.hideModal();
    },
    saveService: function () {
        postdata = {
            i: this.id,
            n: $('#txtName').val(),
            u: $('#txtUrl').val()
        };
        var urltarget = MainApplication.hostURL + '/saveService';
        $.getJSON(urltarget, postdata, function (data) {
            MainApplication.models.serviceCollection.fetch({
                reset: true,
                dataType: 'jsonp',
                cache: false,
                success: function (model, response, options) {
                    MainApplication.views.landingPageView.onShow();
                },
                error: function (model, xhr, options) {

                }
            });
        });

        this.closeModal();
    }
});


var ServiceDeleteModalView = Backbone.Marionette.Layout.extend({
    template: function (serialized_model) {
        var handleBarsTemplate = Handlebars.compile(MainApplication.Templates.ServiceDeleteModalView);
        var data = serialized_model;
        return handleBarsTemplate(data);
    },
    templateHelpers: function () {
        return {
        };
    },
    initialize: function (options) {
        this.id = options.Id;
    },
    onShow: function () {

    },
    events: {
        "click #btnAbandonDeleteService": "closeModal",
        "click #btnDeleteService": "deleteService",
        "click #btnCloseDeleteService": "closeModal"
    },
    onRender: function () {
        return this;
    },
    closeModal: function () {
        MainApplication.modalRegion.hideModal();
    },
    deleteService: function () {
        postdata = {
            i: this.id
        };
        var urltarget = MainApplication.hostURL + '/deleteService';
        $.getJSON(urltarget, postdata, function (data) {
            MainApplication.models.serviceCollection.fetch({
                reset: true,
                dataType: 'jsonp',
                cache: false,
                success: function (model, response, options) {
                    MainApplication.views.landingPageView.onShow();
                },
                error: function (model, xhr, options) {

                }
            });
        });
        this.closeModal();
    }
});