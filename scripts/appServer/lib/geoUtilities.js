var changeCase = require('change-case');
var should = require('should');
var _ = require('lodash');

exports.upperCamelCaseify = function(obj){
	var retval = {};
	for(prop in obj){
		retval[changeCase.upperCaseFirst(changeCase.camelCase(prop))] = obj[prop];
	};	
	return retval;
};

exports.snakeCaseify = function(obj){
	var retval = {};
	for(prop in obj){
		retval[changeCase.snakeCase(prop)] = obj[prop];
	};	
	return retval;
};

exports.rot13 = function (txt) {

    var map = []
    var tmp = "abcdefghijklmnopqrstuvwxyz"
    var buf = ""

    for (j = 0; j < tmp.length; j++) {
        var x = tmp.charAt(j); var y = tmp.charAt((j + 13) % 26)
        map[x] = y; map[x.toUpperCase()] = y.toUpperCase()
    }

    for (j = 0; j < txt.length; j++) {
        var c = txt.charAt(j)
        buf += (c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' ? map[c] : c)
    }

    return buf
};

exports.getParameterByName = function (name, resultstring) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(resultstring);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};