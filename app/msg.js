/**
 * @author ZongPei Huang
 */
var qs = require("querystring"),
	url = require("url"),
	net = require("net");

var pollings = [];

/**
 * Response jsonp
 * @param <res> instance of http.ServerResponse
 * @param <jsonpCb> String, jsonp callback function name
 * @param <json> Object, the json data
 * @return void
 */
function resJsonp(res, jsonpCb, json){
	res.writeHead(200, {"Content-Type": "text/json-p"});
	res.write(jsonpCb +"("+ JSON.stringify(json) +");");
	res.end();
}

/**
 * Example of http handler
 * @param <res> instance of http.ServerResponse
 * @param <req> instance of http.IncomingMessage
 * @return void
 */
function get(res, req){
	// push request to the polling queue
	pollings.push({cb:qs.parse(url.parse(req.url).query).callback, res:res});
	console.log(pollings.length, "getting");
}

function send(res, req){
	var get = qs.parse(url.parse(req.url).query);
	// response the polling clients
	for(var lp; lp = pollings.shift();){
		resJsonp(lp.res, lp.cb, {"msg":get.msg, "sender":get.name});
	}

	res.writeHead(200, {"Content-Type": "text/json-p"});
	// res.write("OK");
	res.end();
}

/**
 * Socket handler, forwarding message from socket client
 * @param <dat> Object, data sent from socket client
 * @return void
 */
function notifySysMsg(dat){
	// response the polling clients
	for(var lp; lp = pollings.shift();){
		resJsonp(lp.res, lp.cb, {"msg":dat.msg, "sender":"System"});
	}
}

exports.get = get;
exports.send = send;
exports.notifySysMsg = notifySysMsg;