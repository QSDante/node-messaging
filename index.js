var server = require("./sys/server");
var router = require("./sys/router");
var msg = require("./app/msg");

var handle = {
	"/get": msg.get,
	"/send": msg.send
};

server.start(router.route, handle);