var allPorts = [];
onconnect = function (e) {
    var port = e.ports[0], _data;
    allPorts.push(port);
    port.onmessage = function (me) {
        // var _content = mes.data;
        var mes =  me.data === 'GetPortsLength' ? allPorts.length : me.data;
        allPorts.forEach(function (p) {
            p.postMessage(mes);
        });
    };
    port.start();
};