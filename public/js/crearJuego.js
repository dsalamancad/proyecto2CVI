
Physijs.scripts.worker = '../js/libs/physijs_worker.js';
Physijs.scripts.ammo = '../libs/ammo.js';

var render, superficie_material, renderer, scene, superficie, light, camaraActiva, camaraJuego, cameraCarro, cameraPersona, camaraCenital, carro, velocidad, giroTimon;

var mesh;

camaraActiva = 1;
velocidad = -15;
giroTimon = 0.5;


var puntajeJugador1=0;
var puntajeJugador2=0;



function inicioSuperficie1(terreno) {
	document.getElementById("puntajeJugador1").innerHTML = puntajeJugador1;
document.getElementById("puntajeJugador2").innerHTML = puntajeJugador2;

	setupDeEscena();
	var carro = crearCarro();
 	interactuarConTeclado(carro);
	cambiarCamara();
	var date = new Date();
	var pn = new Perlin('rnd' + date.getTime());
 	var map = createHeightMap(pn, terreno);
     
	//cubo de prueba para evaluar la colisión         
	mesh = new Physijs.BoxMesh(
		new THREE.BoxGeometry(10, 10, 10),
		new THREE.MeshLambertMaterial({ color: 0x0000ff })
	);
	
	//funcion para evalaur colision entre el carro y el cubo
	mesh.addEventListener( 'collision', function(object) {
		
		if (object.children[0].name == "ladoSensible_jugador1" ){
    		puntajeJugador1 ++;
			document.getElementById("puntajeJugador1").innerHTML = puntajeJugador1;
			evaluarPuntaje();
		}
		else{
			console.log("nada");
		}
  });
	mesh.position.set(30,0,0);
	scene.add(mesh);
};

function createHeightMap(pn, terreno) {

	consultarTerreno(terreno, function(){
	    
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
	    
		var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
			map: THREE.ImageUtils.loadTexture(imagenTextura)
		}),
		0.5, // high friction
		0.8 // low restitution
		);
		
	    var ground_geometry = new THREE.PlaneGeometry(500, 500, 100, 100);
	    
	    for (var i = 0; i < ground_geometry.vertices.length; i++) {
	    	var vertex = ground_geometry.vertices[i];
			
			for(var j = 0; j < puntos_terreno.length; j++){
				if(vertex.x == puntos_terreno[j].x && vertex.y == puntos_terreno[j].y){
					vertex.z = puntos_terreno[j].z;	
					break;
				}
			}          
	    }
	    ground_geometry.computeFaceNormals();
	    ground_geometry.computeVertexNormals();
	
	    var ground = new Physijs.HeightfieldMesh(
	            ground_geometry,
	            ground_material,
	            0, // mass
	            100,
	            100
	    );
	    ground.rotation.x = Math.PI / -2;
	    ground.rotation.y =0;
		ground.position.y = -6;
	    ground.receiveShadow = true;
	
		scene.add(ground);
	
		requestAnimationFrame(render);
    });
}


render = function () {
	requestAnimationFrame(render);
	
	if(camaraActiva == 1){
	renderer.render(scene, camaraJuego);
	}
	else if(camaraActiva == 2){
	renderer.render(scene, cameraCarro);
	}
	else if(camaraActiva == 3){
	renderer.render(scene, cameraPersona);
	}
	else if(camaraActiva == 4){
	renderer.render(scene, camaraCenital);
	}
	scene.simulate(undefined, 1);
};

var puntajeGanador = 5;
		
function evaluarPuntaje(){
	console.log("llamo evalaucion");
	if (puntajeJugador1>=puntajeGanador || puntajeJugador2>=puntajeGanador ){
		if (puntajeJugador1 > puntajeJugador2){
		document.getElementById("jugadorGanador").innerHTML = "jugador 1";
		}else if (puntajeJugador2 > puntajeJugador1){
		document.getElementById("jugadorGanador").innerHTML = "jugador 2";	
		}
		document.getElementById("gameOver").style.display = "block";
	}
	else{}
	
	
}


function resetearNivel(){
	/*document.getElementById("gameOver").style.display = "none";
	puntajeJugador1 = 0;
	puntajeJugador2 = 0;*/
	
	document.getElementById("puntajeJugador1").innerHTML = puntajeJugador1;
	document.getElementById("puntajeJugador2").innerHTML = puntajeJugador2;
	
	window.location.reload()
}

function volver(){
	console.log("volver");
	 window.history.back();
	
}


		