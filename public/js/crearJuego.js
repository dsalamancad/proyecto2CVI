Physijs.scripts.worker = '../js/libs/physijs_worker.js';
Physijs.scripts.ammo = '../libs/ammo.js';

var render,
    superficie_material,
    renderer,
    scene,
    superficie,
    light,
    camaraActiva,
    camaraJuego,
    cameraCarro,
    cameraPersona,
    camaraCenital,
    carro,
    velocidad,
    giroTimon;

var mesh;

camaraActiva = 1;
velocidad = -15;
giroTimon = 0.5;

var idJugador;
var puntajeJugador1 = 0;
var puntajeJugador2 = 0;
var carro;
var carro1;
var terreno;
var posicionTteclado = [];

function inicioSuperficie1(selTerreno) {

	terreno = selTerreno;
	document.getElementById("puntajeJugador1").innerHTML = puntajeJugador1;
	document.getElementById("puntajeJugador2").innerHTML = puntajeJugador2;

	setupDeEscena();
	
	var map = createHeightMap(terreno);

	//cubo de prueba para evaluar la colisión
	mesh = new Physijs.BoxMesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshLambertMaterial({
		color : 0x0000ff
	}));

	mesh.addEventListener('collision', function(object) {

		if (object.children[0].name == "ladoSensible_jugador0") {
			puntajeJugador1++;
		} else if(object.children[0].name == "ladoSensible_jugador1"){
			puntajeJugador2++;
		}
		
		document.getElementById("puntajeJugador1").innerHTML = puntajeJugador1;
		document.getElementById("puntajeJugador2").innerHTML = puntajeJugador2;
		evaluarPuntaje();
	});
	mesh.position.set(80, 0, 0);
	scene.add(mesh);
	
};

function createHeightMap(terreno) {

	consultarTerreno(terreno, function() {

		var imagenTextura;
		switch(terreno) {
		case "terreno1":
			imagenTextura = '../assets/skybox/textura001.jpg';
			break;
		case "terreno2":
			imagenTextura = '../assets/skybox/textura002.jpg';
			break;
		case "terreno3":
			imagenTextura = '../assets/skybox/textura003.jpg';
			break;
		case "terreno4":
			imagenTextura = '../assets/skybox/textura004.jpg';
			break;
		case "terreno5":
			imagenTextura = '../assets/skybox/textura005.jpg';
			break;
		default:
			imagenTextura = '../assets/skybox/textura001.jpg';
		}

		var ground_material = Physijs.createMaterial(new THREE.MeshLambertMaterial({
			map : THREE.ImageUtils.loadTexture(imagenTextura)
		}), 0.3, // high friction
		0.8 // low restitution
		);

		var ground_geometry = new THREE.PlaneGeometry(500, 500, 100, 100);

		for (var i = 0; i < ground_geometry.vertices.length; i++) {
			var vertex = ground_geometry.vertices[i];

			for (var j = 0; j < puntos_terreno.length; j++) {
				if (vertex.x == puntos_terreno[j].x && vertex.y == puntos_terreno[j].y) {
					vertex.z = puntos_terreno[j].z;
					break;
				}
			}
		}
		ground_geometry.computeFaceNormals();
		ground_geometry.computeVertexNormals();

		var ground = new Physijs.HeightfieldMesh(ground_geometry, ground_material, 0, // mass
		100, 100);
		ground.rotation.x = Math.PI / -2;
		ground.rotation.y = 0;
		ground.position.y = -6;
		ground.receiveShadow = true;

		scene.add(ground);

		requestAnimationFrame(render);

		joingame(terreno);
	});
}

function posicionarCarrosInicial(jugador, datosJugadores) {
	idJugador = jugador;
	carro = crearCarro(datosJugadores[0].todoElCarro.x, datosJugadores[0].todoElCarro.y, datosJugadores[0].todoElCarro.z, idJugador);
	if (datosJugadores[0].idJugador == idJugador) {
		interactuarConTeclado(carro, idJugador, terreno);
	}

	if (datosJugadores.length > 1) {
		carro1 = crearCarro(datosJugadores[1].todoElCarro.x, datosJugadores[1].todoElCarro.y, datosJugadores[1].todoElCarro.z, idJugador);
		if (datosJugadores[1].idJugador == idJugador) {
			interactuarConTeclado(carro1, idJugador, terreno);
		}
	}

	/*carro.todoElCarro.addEventListener('collision', function(object) {
		console.log("cccc " + object.name + " " + object.type);
		//if (object.children[0].children.name == "ladoSensible_jugador1") {
		if (object.type != "Mesh") {
			console.log("entro");
		
			puntajeJugador1++;
			document.getElementById("puntajeJugador1").innerHTML = puntajeJugador1;
			evaluarPuntaje();
		}
		else {
			console.log("nada");
		}
	});*/

	cambiarCamara();

	window.setInterval(function() {

		if (idJugador == 0) {
			consultarPosicionTeclado(1, terreno);
		}
		if (idJugador == 1) {
			consultarPosicionTeclado(0, terreno);
		}
		
	}, 1);
}

function ubicarCarro(tecla){
	if(tecla){
		console.log(tecla);
	}
	if (idJugador == 0) {
		if(carro1){
			interactuarConTeclado2(carro1, tecla);
		}else if(tecla==1){
			console.log("crear carro1");
			carro1 = crearCarro(50, 5, 50);
		}
	}
	if (idJugador == 1) {
		interactuarConTeclado2(carro, tecla);
	}
}

function posicionarCarroOtroJugador(posicion_carro) {
	console.log(posicion_carro);
	if (idJugador == 0) {
		if (carro1) {
		setTimeout(function() {
			scene.remove(carro1.todoElCarro);
			scene.remove(carro1.ruedaFrontalDerecha);
			scene.remove(carro1.ruedaFrontalIzquierda);
			scene.remove(carro1.ruedaTraseraDerecha);
			scene.remove(carro1.ruedaTraseraIzquierda);
		}, 100);	
		}
		if (posicion_carro)
			carro1 = crearCarro(posicion_carro[0].todoElCarro.x, posicion_carro[0].todoElCarro.y, posicion_carro[0].todoElCarro.z);
			

	} else if (idJugador == 1) {
		setTimeout(function() {
			scene.remove(carro.todoElCarro);
			scene.remove(carro.ruedaFrontalDerecha);
			scene.remove(carro.ruedaFrontalIzquierda);
			scene.remove(carro.ruedaTraseraDerecha);
			scene.remove(carro.ruedaTraseraIzquierda);
		}, 100);
		carro = crearCarro(posicion_carro[0].todoElCarro.x, posicion_carro[0].todoElCarro.y, posicion_carro[0].todoElCarro.z);
		
	}
}

render = function() {
	requestAnimationFrame(render);

	if (camaraActiva == 1) {
		renderer.render(scene, camaraJuego);
	} else if (camaraActiva == 2) {
		renderer.render(scene, cameraCarro);
	} else if (camaraActiva == 3) {
		renderer.render(scene, cameraPersona);
	} else if (camaraActiva == 4) {
		renderer.render(scene, camaraCenital);
	}
	scene.simulate(undefined, 1);
};

var puntajeGanador = 5;

function evaluarPuntaje() {
	console.log("llamo evalaucion");
	if (puntajeJugador1 >= puntajeGanador || puntajeJugador2 >= puntajeGanador) {
		if (puntajeJugador1 > puntajeJugador2) {
			document.getElementById("jugadorGanador").innerHTML = "jugador 1";
		} else if (puntajeJugador2 > puntajeJugador1) {
			document.getElementById("jugadorGanador").innerHTML = "jugador 2";
		}
		document.getElementById("gameOver").style.display = "block";
	} else {
	}

}

function resetearNivel() {
	/*document.getElementById("gameOver").style.display = "none";
	 puntajeJugador1 = 0;
	 puntajeJugador2 = 0;*/

	document.getElementById("puntajeJugador1").innerHTML = puntajeJugador1;
	document.getElementById("puntajeJugador2").innerHTML = puntajeJugador2;

	window.location.reload();
}

function volver() {
	console.log("volver");
	window.history.back();

}

