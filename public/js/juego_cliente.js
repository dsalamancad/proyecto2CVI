var socket = io.connect();
var playerId;
var players;
var puntos_terreno;

//io.setMaxListeners(0);
		
socket.on("joined", function(msg){
	idJugador = msg.idJugador;
	datosJugadores = msg.datosJugadores;
	posicionarCarrosInicial(idJugador, datosJugadores);
});

socket.on("new_player" , function(msg){
	players = msg;
});

function joingame(terreno){
	socket.emit( "join_game", {
		terreno : terreno,
	});
} 

function actualizarPosicion(terreno, idJugador, carro){
	console.log("llego cliente");
	socket.emit( "actualizar_posicion_carro", {
		'terreno' : terreno,
		'idJugador' : idJugador,
		'todoElCarro' : {x:carro.todoElCarro.position.x, y:carro.todoElCarro.position.y, z:carro.todoElCarro.position.z}
	});
} 

function guardarTerreno(coordenadas){
	socket.emit( "insertar_puntos_terreno", {
		puntos : coordenadas
	});
}

var callback_terreno;
function consultarTerreno(terreno, callback){
	callback_terreno = callback;
	socket.emit( "consultar_puntos_terreno", {
		numTerreno : terreno
	});
}

socket.on("puntos_terreno", function(msg){
	puntos_terreno = msg.puntos_terreno;
	callback_terreno();
});


function consultarPosicion(idJugador){
	socket.emit( "consultar_posicion_carro", {
		idJugador : idJugador
	});
}

socket.on("posicion_carro", function(msg){
	posicion_carro = msg.posicion_carro;
	posicionarCarroOtroJugador(posicion_carro);
});

function guardarPosicionTeclado(tecla, idJugador, terreno){
	socket.emit( "guardar_posicion_teclado", {
		tecla : tecla,
		idJugador : idJugador,
		terreno : terreno
	});
}

function consultarPosicionTeclado(idJugador, terreno){
	socket.emit( "consultar_posicion_teclado", {
		idJugador : idJugador,
		terreno : terreno
	});
}

socket.on("posicion_carro_teclado", function(msg){
	ubicarCarro(msg.tecla);
});
