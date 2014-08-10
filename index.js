var server = require("./sys/server"),
	msg = require("./app/msg");

var handle = {
	"/get": msg.get,
	"/send": msg.send
};

server.startHttp(handle);
server.startSock(msg.notifySysMsg);