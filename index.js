var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var arrPosicionTeclado = {};

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

var mongodb = require('mongodb');
var serverBD = new mongodb.Server("127.0.0.1", 27017, {});

io.on('connection', function(socket) {
	//io.setMaxListeners(0);
		
	socket.on('join_game', function(msg) {
		var dbTest = new mongodb.Db("juegoBD", serverBD, {});
		console.log("player joined");
		
		var idJug = 0;
		dbTest.open(function(error, client) {
			if (error)
				throw error;

			var x = 5;
			var y = 5;
			var z = 5;
			
			var collection = dbTest.collection("datosPartida");
			  	collection.find( {"terreno": msg.terreno, "activa" : 1},{ "idJugador" : true, "todoElCarro" : true }).toArray(function(err, docs) {
			    
			    console.log("xxxxxxxxxxxx " +  docs.length);
			    var datosPartida;
			    if(docs.length > 0){
			    	idJug = parseInt(docs[0].idJugador) + docs.length;
			    	var cad = idJug + "/" + msg.terreno;
			    	console.log(cad);
			    	arrPosicionTeclado[cad] = [];
			    	arrPosicionTeclado[cad].push(1);
			    	console.log(arrPosicionTeclado[cad]);
			    	x = parseInt(docs[0].todoElCarro.x) + 50;
					z = parseInt(docs[0].todoElCarro.z) + 50; 
			 	}
			 	
			  	datosPartida = {idJugador: idJug, 
						terreno:msg.terreno, 
						todoElCarro:{x:x, y:y, z:z},
						activa : 1
				};	
				
				collection.insert(datosPartida, function(err, records) {
					if (err)
						throw err;
				});
				
				collection.find( {"terreno": msg.terreno, "activa" : 1},{ "idJugador" : true, "todoElCarro" : true }).toArray(function(err, docs1) {
				
					if (err)
						throw err;
					
					socket.emit("joined", {
						idJugador : idJug,
						datosJugadores : docs1,
					});
					client.close();
				});
			});	
		});
	});
	
	socket.on('actualizar_posicion_carro', function(msg) {
		console.log("---> llego servidor");	
		var dbTest = new mongodb.Db("juegoBD", serverBD, {});
		
		dbTest.open(function(error, client) {
			if (error)
				throw error;
		
				console.log("llego servidor");		
				dbTest.collection("datosPartida").update(
							{"idJugador" : msg.idJugador, "terreno": msg.terreno}, 
							{ $set: { "todoElCarro" : msg.todoElCarro } },
				
				function(err, records) {
					
					console.log("eeeeeeeeeeeeeeeeeeeee  " + err);
				if (!err)
					//throw err;
				dbTest.close();
			});
			
		});
	});
	
	socket.on('insertar_puntos_terreno', function(msg) {
		var dbTest = new mongodb.Db("juegoBD", serverBD, {});
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
	
	socket.on('consultar_puntos_terreno', function(msg) {
		var dbTest = new mongodb.Db("juegoBD", serverBD, {});
		dbTest.open(function(error, client) {
			if (error)
				throw error;
		
			var collection = dbTest.collection("puntosTerreno");
			  	collection.find({"terreno": msg.numTerreno}).toArray(function(err, docs) {
			    
			    socket.emit("puntos_terreno", {
					puntos_terreno : docs,
				});
				dbTest.close();
			  });
		});
	});
	
	socket.on('consultar_posicion_carro', function(msg) {
		
			var dbTest = new mongodb.Db("juegoBD", serverBD, {});
			console.log("llego servidor");
			dbTest.open(function(error, client) {
				if (error)
					throw error;
				
				var collection = dbTest.collection("datosPartida");
				  	collection.find( {"idJugador": msg.idJugador},{ "todoElCarro" : true }).toArray(function(err, docs) {
				    
				    socket.emit("posicion_carro", {
						posicion_carro : docs,
					});
					try{
						dbTest.close();
					}catch(ex){
						console.log(ex);
					}
				});
			});
			
	});
	
	socket.on('consultar_posicion_teclado', function(msg) {
		var cad = msg.idJugador + "/" + msg.terreno;
		var tecla;
		if (cad in arrPosicionTeclado)
		{
			tecla = arrPosicionTeclado[cad][0];
			arrPosicionTeclado[cad].splice(0, 1);
		}
		
	    socket.emit("posicion_carro_teclado", {
			'tecla' : tecla
		});
	});

	socket.on('guardar_posicion_teclado', function(msg) {
		
		var cad = msg.idJugador + "/" + msg.terreno;
		var arr = [];
		if (cad in arrPosicionTeclado)
		{
			arr = arrPosicionTeclado[cad];
		}
		arr.push(msg.tecla);
		arrPosicionTeclado[cad] = arr;
	
	});
	
});

