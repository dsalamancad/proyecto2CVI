var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/inicio.html');
});

var server = http.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

var players = {};
var Player = function(params) {
	this.name = "";
	this.id = 0;
	this.position = {
		x : 0,
		y : 0,
		z : 0
	};
};

io.on('connection', function(socket) {
	socket.on('join_game', function(msg) {
		var p = new Player();
		p.id = generateId();
		console.log("player joined: " + msg.name + "id: " + p.id);
		p.name = msg.name;
		players[p.id] = p;

		socket.emit("joined", {
			number : p.id,
		});

		io.emit("new_player", {
			players : players
		});
	});
});

var idPlayer = 0;
function generateId() {
	return idPlayer++;
}

var mongodb = require('mongodb');
var serverBD = new mongodb.Server("127.0.0.1", 27017, {});
var dbTest = new mongodb.Db("juegoBD", serverBD, {});

io.on('connection', function(socket) {
	socket.on('insertar_puntos_terreno', function(msg) {
		
		dbTest.open(function(error, client) {
			if (error)
				throw error;

			dbTest.collection("puntosTerreno").insert(msg.puntos, function(err, records) {
				if (err)
					throw err;
				dbTest.close();
			});
			
		});
	});
});

io.on('connection', function(socket) {
	socket.on('consultar_puntos_terreno', function(msg) {
		
		dbTest.open(function(error, client) {
			if (error)
				throw error;
		
			var collection = dbTest.collection("puntosTerreno");
			  	collection.find({"terreno": "terreno1"}).toArray(function(err, docs) {
			    //console.dir(docs);
			    
			    socket.emit("puntos_terreno", {
					puntos_terreno : docs,
				});
			  });
		});
	});
});

