/***
 * Contains basic SlickGrid formatters.
 * @module Formatters
 * @namespace Slick
 */

(function ($) {
    // register namespace
    $.extend(true, window, {
        "Slick": {
            "Formatters": {
                "PercentComplete": PercentCompleteFormatter,
                "PercentCompleteBar": PercentCompleteBarFormatter,
                "YesNo": YesNoFormatter,
                "Checkmark": CheckmarkFormatter,
                "Date": DateFormatter,
                "EditIncidentButton": EditIncidentButtonFormatter,
                "EditBirdButton": EditBirdFormatter,
                "DeleteBirdButton": DeleteBirdFormatter,
                "EditEquipmentButton": EditEquipmentFormatter,
                "DeleteEquipmentButton": DeleteEquipmentFormatter,
                "EditContactButton": EditContactFormatter,
                "DeleteContactButton": DeleteContactFormatter,
                "DeleteHabitatButton": DeleteHabitatFormatter,
                "FWButton": FWButtonFormatter

            }
        }
    });

    function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "-";
        } else if (value < 50) {
            return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
        } else {
            return "<span style='color:green'>" + value + "%</span>";
        }
    }



    function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "";
        }

        var color;

        if (value < 30) {
            color = "red";
        } else if (value < 70) {
            color = "silver";
        } else {
            color = "green";
        }

        return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
    }

    function YesNoFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "Yes" : "No";
    }

    function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "<img src='../images/tick.png'>" : "";
    }

    function DateFormatter(row, cell, date, columnDef, dataContext) {
        var value = parseASPDate(date);
        return (value.getMonth() + 1) + "/" + value.getDate() + "/" + value.getFullYear();
    }
    function EditIncidentButtonFormatter(row, cell, value, columnDef, dataContext) {
        hostUrl = "/IncidentDetail/" + value;
        return "<i class=\"icon-pencil\" onclick='javascript:window.open(\"" + hostUrl + "\", \"_top\")' style=\"cursor: pointer; font-size: 20px\" ></i>";
    }

    function EditBirdFormatter(row, cell, value, columnDef, dataContext) {
        return "<a href=\"#BirdModalWindow\" data-toggle=\"modal\" style=\"cursor: pointer\" onclick=\"loadModal('Bird', 'BirdModalContent', '" + value + "', 'edit')\"> <i class=\"icon-pencil\"  style=\"cursor: pointer; font-size: 20px; margin-left: 4px; margin-bottom: 4px\" ></i></a>";
    }
    function DeleteBirdFormatter(row, cell, value, columnDef, dataContext) {
        return "<a href=\"#BirdModalWindow\" data-toggle=\"modal\" style=\"cursor: pointer\" onclick=\"loadModal('Bird', 'BirdModalContent', '" + value + "', 'delete')\"> <i class=\"icon-trash\"  style=\"cursor: pointer; font-size: 20px; margin-left: 4px; margin-bottom: 4px\" ></i></a>";
    }
    function EditContactFormatter(row, cell, value, columnDef, dataContext) {
        return "<a href=\"#ContactModalWindow\" data-toggle=\"modal\" style=\"cursor: pointer\" onclick=\"loadModal('Contact', 'ContactModalContent', '" + value + "', 'edit')\"> <i class=\"icon-pencil\"  style=\"cursor: pointer; font-size: 20px; margin-left: 4px; margin-bottom: 4px\" ></i></a>";
    }
    function DeleteContactFormatter(row, cell, value, columnDef, dataContext) {
        return "<a href=\"#ContactModalWindow\" data-toggle=\"modal\" style=\"cursor: pointer\" onclick=\"loadModal('Contact', 'ContactModalContent', '" + value + "', 'delete')\"> <i class=\"icon-trash\"  style=\"cursor: pointer; font-size: 20px; margin-left: 4px; margin-bottom: 4px\" ></i></a>";
    }
    function EditEquipmentFormatter(row, cell, value, columnDef, dataContext) {
        return "<a href=\"#EquipmentModalWindow\" data-toggle=\"modal\" style=\"cursor: pointer\" onclick=\"loadModal('Equipment', 'EquipmentModalContent', '" + value + "', 'edit')\"> <i class=\"icon-pencil\"  style=\"cursor: pointer; font-size: 20px; margin-left: 4px; margin-bottom: 4px\" ></i></a>";
    }
    function DeleteEquipmentFormatter(row, cell, value, columnDef, dataContext) {
        return "<a href=\"#EquipmentModalWindow\" data-toggle=\"modal\" style=\"cursor: pointer\" onclick=\"loadModal('Equipment', 'EquipmentModalContent', '" + value + "', 'delete')\"> <i class=\"icon-trash\"  style=\"cursor: pointer; font-size: 20px; margin-left: 4px; margin-bottom: 4px\" ></i></a>";
    }
    function DeleteHabitatFormatter(row, cell, value, columnDef, dataContext) {
        return "<a href=\"#HabitatModalWindow\" data-toggle=\"modal\" style=\"cursor: pointer\" onclick=\"loadModal('Habitat', 'HabitatModalContent', '" + value + "', 'delete')\"> <i class=\"icon-trash\"  style=\"cursor: pointer; font-size: 20px; margin-left: 4px; margin-bottom: 4px\" ></i></a>";
    }


    function FWButtonFormatter(row, cell, value, columnDef, dataContext) {
        return "<i class=\"icon-file-alt\" onclick='printFWForm(\"" + value + "\")' style=\"cursor: pointer\" ></i>";
    }



    function parseASPDate(s) {
        if (s) {
            return new Date(parseInt(s.substr(6), 10));
        } else {
            return null;
        }
    }
})(jQuery);