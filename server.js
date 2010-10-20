#!/usr/local/bin/node

/**
 *  Multiple node projects on a single server
 *  
 */

/** one port for all **/
var port = 8124;

/** Vhost definitions go here 
 *  
 *  Your appScript must contain a function defined as exports['handle'] which accepts a
 *  Node.js request and response object. Then do whatever you want!
 */
var vhosts = {
    
    //*
    'example.com': {
        appScript : "/Path/To/Script.js",
    },
    //*/
    
}

/** Node stuff below **/

var http = require('http');

var server = http.createServer(function (req, res) {
  
    var host = req.headers.host;
    
    // take out port if present
    if (host.indexOf(':') !== -1) {
        host = host.split(':')[0];
    }
    
    if (typeof vhosts[host] === 'object') {
        var host = vhosts[host];
        var appScript = require(host.appScript)
        if (appScript) {
            return appScript.handle(req,res);
        }
    }
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Something went wrong.\n');
  
}).listen(port);

console.log('Server running on port ' + port);