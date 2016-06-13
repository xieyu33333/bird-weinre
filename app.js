var fileServer = require("./lib/file-server_bird/index");
var HttpTranspondBird = require("./lib/http-transpond_bird/index");
var serverSettings = require("./config.js").Server;
var child = require('child_process');
var config = require('./config');
var getIP = require("./lib/file-server_bird/getIP");

if (config.weinre && config.weinre.open) {
    var weinre = require('weinre');
    var weinrePort = config.weinre.port || 8080;
    weinre.run({
        httpPort: weinrePort,
        boundHost: getIP,
        verbose: false,
        debug: false,
        readTimeout: 5,
        deathTimeout: 15
    });
}

var httpTranspond = new HttpTranspondBird();

fileServer.start(serverSettings, httpTranspond.transpond);
