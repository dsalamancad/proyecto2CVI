var socket = io.connect();
var playerId;
var players;

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
	//console.log("llego cliente " + coordenadas[0]);
	socket.emit( "insertar_puntos_terreno", {
		puntos : coordenadas
	});
}
