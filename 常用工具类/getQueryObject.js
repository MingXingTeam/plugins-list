 function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = window.location.search;//?name=张三&age=12
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (matchStr, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);                
        val = String(val);
        obj[name] = val;
        return matchStr;
    });
    return obj;
}
