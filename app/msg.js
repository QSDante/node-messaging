var qs = require("querystring"),
	url = require("url");

var pollings = [];

function get(res, req){
	pollings.push({cb:qs.parse(url.parse(req.url).query).callback, res:res});
	console.log(pollings.length, "getting");
}

function send(res, req){
	var get = qs.parse(url.parse(req.url).query);
	for(var lp; lp = pollings.shift();){
		lp.res.writeHead(200, {"Content-Type": "application/json-p"});
		lp.res.write(lp.cb +"("+ JSON.stringify({"msg":get.msg, "sender":get.name}) +")");
		lp.res.end();
	}

	res.writeHead(200, {"Content-Type": "text/json-p"});
	// res.write("OK");
	res.end();
}

exports.get = get;
exports.send = send;