#!/usr/bin/env node

var commander     = require('commander')
var packageData   = require(__dirname + '/../package.json')
var http          = require('http')
var fs            = require('fs')
var engine        = require('engine.io')
var swig          = require('swig')
var Router        = require('router')
var finalhandler  = require('finalhandler')
var compression   = require('compression')
var config        = require(__dirname + '/../playground/server.json')
var router        = Router({ mergeParams: true });

var server = http.createServer(function onRequest(req, res) {
  router(req, res, finalhandler(req, res))
})

router.use(compression())

router.get(/^\/css\/(.*)$/, function (request, response) {
    var data = fs.readFileSync(__dirname + '/../node_modules/' + request.params[0])
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.end(data)
})

router.get(/^\/js\/(.*)$/, function (request, response) {
    var data = fs.readFileSync(__dirname + '/../node_modules/' + request.params[0])
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/javascript; charset=utf-8')
    response.end(data)
})

router.get('/', function (request, response) {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    var data = swig.renderFile(__dirname + '/../templates/index.html', config)
    response.end(data)
})

server.listen(8080)

var clients = [];

var socketServer = engine.listen(8000)

socketServer.on('connection', function(socket){

    socket.name = socket.remoteAddress + ":" + socket.remotePort
    clients.push(socket)

    socket.on('message', function(rawData){ 
        var data = JSON.parse(rawData);
        if (data.action === 'deploy') {
            run(data.name);
        }
    })

    socket.on('close', function(){
        clients.splice(clients.indexOf(socket), 1)
    })
});

function run(name) {
    console.log(config)
    console.log("run:" + name)
}

function broadcast(message, sender) {
    clients.forEach(function (client) {
        if (client === sender) return;
        client.write(message);
    });
}