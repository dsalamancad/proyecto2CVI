var mongodb = require('mongodb');

// obtenemos el server MongoDB que dejamos corriendo
// *** el puerto 27017 es el default de MongoDB
var server = new mongodb.Server("127.0.0.1", 27017, {});

// obtenemos la base de datos
var dbTest = new mongodb.Db("juegoBD", server, {});

// abrimos la base pasando el callback para cuando esté lista para usar
dbTest.open(function (error, client) {
  if (error) throw error;

  //en el parámetro client recibimos el cliente para comenzar a hacer llamadas
  
  //Obtenemos la coleccion jugador
  var collection = dbTest.collection("jugador");
  	collection.find({"nombre": "Deisy"}).toArray(function(err, docs) {
    console.dir(docs);
  });
});

function insertarTerrenoBD(coordenadas)
{
	console.log("llego mongo");
	for(i=0;i<coordenadas.length;i++){
		dbTest.collection('puntosTerreno').insertOne(coordenadas[i]);	
	}
}

