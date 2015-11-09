
Physijs.scripts.worker = '../js/libs/physijs_worker.js';
Physijs.scripts.ammo = '../libs/ammo.js';

var render, superficie_material, renderer, scene, superficie, light, camaraActiva, camaraJuego, cameraCarro, cameraPersona, camaraCenital, carro, velocidad, giroTimon;

camaraActiva = 1;
velocidad = -8;
giroTimon = 0.5;


inicioSuperficie1 = function () {
	setupDeEscena();
	var carro = crearCarro();
 	interactuarConTeclado(carro);
	cambiarCamara();
	var date = new Date();
	var pn = new Perlin('rnd' + date.getTime());
 	var map = createHeightMap(pn);
              
	//cubo para poder ver como apunta mi camara
	var geometry = new THREE.BoxGeometry( 10, 10, 10 );
	var material = new THREE.MeshLambertMaterial( { color: 0x0000FF } );
	cube = new THREE.Mesh( geometry, material );
	cube.position.set(100,0,0);
	scene.add( cube );
};



function createHeightMap(pn) {

	consultarTerreno("terreno1", function(){
	
	    var ground_material = Physijs.createMaterial(
	           new THREE.MeshLambertMaterial( { color: 0x00FF00 }, .3, .8 ));
	
	    var ground_geometry = new THREE.PlaneGeometry(500, 500, 100, 100);
	    
	    console.log(puntos_terreno.length);
	    
	    for (var i = 0; i < ground_geometry.vertices.length; i++) {
	    	var vertex = ground_geometry.vertices[i];
			
			for(var j = 0; j < puntos_terreno.length; j++){
				if(vertex.x == puntos_terreno[j].x && vertex.y == puntos_terreno[j].y){
					vertex.z = puntos_terreno[j].z;	
					break;
				}
			}          
			//var value = pn.noise(vertex.x / 100, vertex.y / 100, 0);
	        //vertex.z = value * -100;
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

//Nuevo Deisy

function crearTerreno(){
	var numAleatorios = [];
	var i;
	for (i = 0; i < 16; i++){
		numAleatorios[i] = getRandomInt();
	}
	
	var constantesZ=[];
	var constantesY=[];
	for(i = 0; i < 5; i++){
		constantesZ[i] = calcularConstantes(numAleatorios[3*(i+1)-3],numAleatorios[3*(i+1)-2],numAleatorios[3*(i+1)-1],numAleatorios[3*(i+1)]);//z
		constantesY[i] = calcularConstantes(
			250-(20*(i+1)-20)*5,
			250-(20*(i+1)-15)*5,
			250-(20*(i+1)-5)*5,
			250-(20*(i+1))*5
			);//y
		
	}
	
	var coordenadas = [];
	for(i = 0; i < 100; i++){//y
		var t=(i%20)/20;
		var consY=constantesY[Math.floor(i/20)];
		var consZ=constantesZ[Math.floor(i/20)];
		
		console.log("consZ: "+ JSON.stringify(consZ) + " consY: " + JSON.stringify(consY));
		
		//var y = consY.a * t * t * t + consY.b * t * t + consY.c * t + consY.x0;
		var y = i*5-250;
		var z = consZ.a * t * t * t + consZ.b * t * t + consZ.c * t + consZ.x0;
			
		console.log("z: "+ z + " y ; " + y);	
		for(j = 0; j < 100; j++){//x
			var x=j*5-250;
			coordenadas[i*100 + j] = {x:x, y:y, z:z, t:t, 'terreno':'terreno1'};
			
		}
	}
	guardarTerreno(coordenadas);
	
}

function calcularConstantes(x0,x1,x2,x3){
	var a=0;
    var b=0;
    var c=0;
    
    c = 3 * (x1 - x0);
	b = 3 * (x2 - x1) - c;
	a = x3 - x0 - c - b;
	
	return {a:a, b:b, c:c, x0:x0};
}


function getRandomInt() {
  return Math.floor(Math.random() * (20 + 30)) -30;
}		





		