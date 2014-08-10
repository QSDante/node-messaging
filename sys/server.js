var http = require("http"),
	url = require("url"),
	net = require("net"),
	router = require("./router"),
	config = require("../app/config");

function startHttp(handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");
		router.route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(config.HTTP.PORT);
	console.log("HTTP Server has started.");
}

function startSock(succCb, errCb){
	var server = net.createServer(function(sock){
		var client = sock.remoteAddress +':'+ sock.remotePort,
			json = "";
		console.log('CONNECTED: ' + client);

		sock.setEncoding('utf8');
		sock.on('data', function(buf) {
			json += buf;
		});

		sock.on('close', function(isErr) {
			if(isErr){
				if(typeof errCb !== "function"){
					console.log("ERROR DISCONNECTED: "+client);
					console.log("Received Data: "+json);
					return;
				}
				else return errCb(json, client);
			}
			succCb(JSON.parse(json));
			console.log('CLOSED: '+client);
		});
	});
	var listen = ':'+ config.SOCK.PORT;
	if(typeof config.SOCK.HOST !== "undefined"){
		server.listen(config.SOCK.PORT, config.SOCK.HOST);
		listen = config.SOCK.HOST + listen;
	}
	else server.listen(config.SOCK.PORT);
	console.log('Socket Server listening on '+ listen);
}

exports.startHttp = startHttp;
exports.startSock = startSock;