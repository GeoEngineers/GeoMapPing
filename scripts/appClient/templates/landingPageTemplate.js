MainApplication.Templates = MainApplication.Templates || {};

MainApplication.Templates.LandingPageView = [
	"<div id=\"chartContainer\" style=\"width: 33%; min-width: 200px;  color: #222222; height: 100px; text-align:center; display: inline-block;\"><div style=\"width: 100%; min-width: 240px; text-align:center; margin-top: 30px;\"><h3><div id=\"lblAverageUp\"></div>Average Up Time</div></h3></div>",
	"<div id=\"upContainer\" style=\"width: 33%; min-width: 200px; color: #222222; height: 100px; text-align:center;  display: inline-block;\"><div style=\"width: 100%; min-width: 240px; text-align:center;  margin-top: 30px;\"><h3><div id=\"lblServicesUp\"></div>Services Up</div></h3></div>",
	"<div id=\"downContainer\" style=\"width: 33%; min-width: 200px  color: #222222; height: 100px; text-align:center; display: inline-block;\"><div style=\"width: 100%; min-width: 240px; text-align:center;  margin-top: 30px;\"><h3><div id=\"lblServicesDown\"></div>Services Down</div></h3></div>",
	"<div class=\"container\" style\"width: 100%;  margin: 20px \">",
        "<div style\"width: 100%; margin: 30px;\">",
        "<br/><button class=\"btn btn-primary\" type=\"button\"  id=\"btnAddService\" >Add New Service Monitor</button>",
		"<br/><div id=\"gridContainer\" style=\"width: 100%; height: 300px; margin-top: 10px\"></div>",
	    "</div>",
	"</div>"
].join("\n");


MainApplication.Templates.LandingPageHeaderView = [
	"<div class='navbar navbar-inverse navbar-fixed-top'>",
		"<div class='navbar-inner'>",
			"<div class='container'>",
				"<h3 style\"color: #dddddd; margin-left: 20px\">Web Service Monitor</h3>",
			"</div>",
		"</div>",
	"</div>"
].join("\n");


MainApplication.Templates.ServiceModalView = [
    "<div class='modal-dialog'>",
		"<div class='modal-content'>",
			"<div class=\"modal-header\">",
                "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" id=\"btnAbandonEditService\">×</button>",
                "<h3 id=\"myModalLabel\">{{serviceHeader}}</h3>",
            "</div>",
            "<div class=\"modal-body\">",
                "<strong>Service Name: </strong><input class='form-control' type='text' id='txtName' placeholder='Service Name' value='{{serviceName}}'><br />",
                "<strong>Url: </strong><input class='form-control' type='text' id='txtUrl' placeholder='Url' value='{{serviceUrl}}'><br />",
            "</div>",
            "<div class=\"modal-footer\">",
                "<button class=\"btn btn-primary\" id=\"btnSaveService\" >Save</button><button class=\"btn btn-warning\" id=\"btnCloseEditService\">Close</button>",
            "</div>",
		"</div>",
	"</div>"    
].join("\n");



MainApplication.Templates.ServiceDeleteModalView = [
    "<div class='modal-dialog'>",
		"<div class='modal-content'>",
			"<div class=\"modal-header\">",
                "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" id=\"btnAbandonDeleteService\">×</button>",
                "<h3 id=\"myModalLabel\">Delete Service Monitor</h3>",
            "</div>",
            "<div class=\"modal-body\">",
                "<strong>Are you sure you want to delete this service monitor? </strong>",
            "</div>",
            "<div class=\"modal-footer\">",
                "<button class=\"btn btn-primary\" id=\"btnDeleteService\" >Delete</button><button class=\"btn btn-warning\" id=\"btnCloseDeleteService\">Close</button>",
            "</div>",
		"</div>",
	"</div>"
].join("\n");