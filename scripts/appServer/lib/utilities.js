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



