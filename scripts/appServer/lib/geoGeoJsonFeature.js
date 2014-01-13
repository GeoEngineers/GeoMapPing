var FeatureCollection = function() {
    return {"type":"FeatureCollection","features":[]};
};

var Feature = function() {
    return {
        "type":"Feature",
        "geometry":{"type":"Point","coordinates":[0, 0]},
        "properties":{}
    };
};

exports.buildCompactFeatureCollection = function(geojson) {

    var retval = new FeatureCollection();

    for(var f=0; f<geojson.features.length; f++){
        var srcFeature = geojson.features[f];

        retval.features[retval.features.length] = this.buildCompactFeature(srcFeature);
    }

    return retval;
};

exports.buildCompactFeature = function(srcFeature){
    var retval = new Feature();
    retval.geometry = srcFeature.geometry;

    for(var attributename in srcFeature.properties){
        var propertyValue = srcFeature.properties[attributename];
        if (propertyValue) {
            retval.properties[attributename] = propertyValue;
        }
    }
    return retval;
};

