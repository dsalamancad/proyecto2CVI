
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
		





		