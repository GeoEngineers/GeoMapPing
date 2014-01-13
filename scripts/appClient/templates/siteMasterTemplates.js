var GeoAppBaseTemplates = GeoAppBaseTemplates || {};

GeoAppBaseTemplates.pageTitleDisplay = [
     "<h5 style=\"margin-top: 25px;\">{{pageTitle}}</h5>"
].join("\n");

GeoAppBaseTemplates.GenericModalInterfaceTemplate = [
    "<div class=\"modal-header\">",
        "<a type=\"button\" class=\"close\" aria-hidden=\"true\" id=\"btnAbandonModal\">×</a>",
        "<h3 id=\"myModalLabel\">{{modalTitle}}</h3>",
    "</div>",
    "<div class=\"modal-body\" id=\"genericModalView\">",
        "{{{genericModalContents}}}",
    "</div>",
    "<div class=\"modal-footer\">",
        "<button class=\"btn btn-primary\" type=\"button\" id=\"btnOk\" style='display:{{okDisplay}}'>{{modalOKText}}</button>",
        "<a class=\"btn\" id=\"btnCancel\" style='display:{{cancelDisplay}}'>{{modalCancelText}}</a>",
    "</div>"
].join("\n");

GeoAppBaseTemplates.underConstruction = [
    "<h3>Under Construction</h3>"
].join("\n");