var socket = io.connect();
var playerId;
var players;
var puntos_terreno;

socket.on("joined", function(msg){
	playerId = msg.number;
});

socket.on("new_player" , function(msg){
	players = msg;
});

function joingame(){
	socket.emit( "join_game", {
		name : 'Player'
	});
} 

function guardarTerreno(coordenadas){
	socket.emit( "insertar_puntos_terreno", {
		puntos : coordenadas
	});
}

var callback_terreno;
function consultarTerreno(numeroTerreno, callback){
	callback_terreno = callback;
	socket.emit( "consultar_puntos_terreno", {
		numTerreno : numeroTerreno
	});
}

socket.on("puntos_terreno", function(msg){
	puntos_terreno = msg.puntos_terreno;
	callback_terreno();
});
