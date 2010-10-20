#!/usr/local/bin/node

/**
 *  Multiple node projects on a single server
 *  
 */

/** one port for all **/
var port = 8124;

/** Vhost definitions go here **/
var vhosts = {
    
    /*
    'example.com': {
        appScript : "/Path/To/Script.js",
    },
    //*/
    
    'protoworks': {
        appScript : "/Volumes/UserData/Users/smallik/Sites/protoworks/scripts/run.js",
    },
    
    'pretendo': {
        appScript : "/Volumes/UserData/Users/smallik/Sites/pretendo/scripts/run.js",
    },

    'local.sankho': {
        appScript : "/Volumes/UserData/Users/smallik/Sites/local.sankho/scripts/run.js",
    },
    
    /*
    'game': {
        appScript : "/Volumes/UserData/Users/smallik/Sites/game/scripts/run.js",
        webSocket : true,
    },
    //*/

}

/** Node stuff below **/

var http = require('http');
var sys  = require('sys');

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