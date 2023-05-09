function AJAXCALLER_POST(URL, json_params, onSucessCallback, onErrorCallback = null) {

    var AJAXSourceLinksMain = URL;
    var data = EncodeJSONToURL(json_params);
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("POST", URL, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            onSucessCallback(xmlhttp.responseText);
        }

        xmlhttp.onerror = function (e) {
            onErrorCallback();
        };

    };
    try {
        xmlhttp.send(data);
    }
    catch (e) {
        onErrorCallback();
    }
}

function EncodeJSONToURL(jsonObj)
{
    return Object.keys(jsonObj).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(jsonObj[k])
    }).join('&');
}


module.exports = 
{
    AJAXCALLER_POST: AJAXCALLER_POST,
    EncodeJSONToURL: EncodeJSONToURL
};
