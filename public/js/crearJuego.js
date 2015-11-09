
Physijs.scripts.worker = '../js/libs/physijs_worker.js';
Physijs.scripts.ammo = '../libs/ammo.js';

var initScene, render, superficie_material, renderer, render_stats, scene, superficie, light, camaraActiva, camaraJuego, cameraCarro, cameraPersona, camaraCenital, carro, velocidad, giroTimon;

camaraActiva = 1;
velocidad = -8;
giroTimon = 0.5;


inicioSuperficie1 = function (terreno) {
	
	console.log("llega aca inicio funcion de spuerficie1");
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.shadowMap.enabled = true;
	document.getElementById('viewport').appendChild(renderer.domElement);            

	//Crear la gravedad en la escena
	scene = new Physijs.Scene;
	scene.setGravity(new THREE.Vector3(0, -50, 0));
	
	
	//poner camara por defecto
	camaraJuego = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,1, 1000);
	camaraJuego.position.set(200, 150, 180);
	camaraJuego.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camaraJuego);
	
	
	//camaraCenital
	camaraCenital = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,1, 1000);
	camaraCenital.position.set(0, 400, 0);
	camaraCenital.lookAt(new THREE.Vector3(0, 0, 0));
	camaraCenital.rotation.z= 1.5*(Math.PI);
	scene.add(camaraCenital);

	// luz
	light = new THREE.SpotLight(0xFFFFFF);
	light.position.set(20, 300, 50);
	light.castShadow = true;
	scene.add(light);
	
	//crear superficie y poner el carro
	//crearSuperficie();	
	var carro = crearCarro();
 	
	//cubo para poder ver como apunta mi camara
	var geometry = new THREE.BoxGeometry( 10, 10, 10 );
	var material = new THREE.MeshLambertMaterial( { color: 0x00FF00 } );
	cube = new THREE.Mesh( geometry, material );
	cube.position.set(100,0,0);
	scene.add( cube );

	interactuarConTeclado(carro);
		
	 klein = function (u, v) {
            u *= Math.PI;
            v *= 2 * Math.PI;

            u = u * 2;
            var x, y, z;
            if (u < Math.PI) {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
                z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
            } else {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
                z = -8 * Math.sin(u);
            }

            y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

            return new THREE.Vector3(x, y, z);
        };

        radialWave = function (u, v) {
            var r = 100;

            var x = Math.sin(u) * r;
            var z = Math.sin(v / 2) * 2 * r;
            var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

            return new THREE.Vector3(x, y, z);
        };

        /*var mesh = createMesh(new THREE.ParametricGeometry(radialWave, 120, 120, false));
        scene.add(mesh);*/
		
		/*var param = new THREE.Mesh(
 				 new THREE.ParametricGeometry(radialWave, 8, 32),
                         // paramFunc
  					new THREE.MeshLambertMaterial( { color: 0x00ff00 } )
		);
		scene.add( param );*/
		var date = new Date();
		var pn = new Perlin('rnd' + date.getTime());
 		var map = createHeightMap(pn, terreno);
              
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
		
 function createMesh(geom) {
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(-25, 0, -25));
            // assign two materials
//            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
            //var meshMaterial = new THREE.MeshNormalMaterial();
			
			var meshMaterial = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xaaaaaa}),
			0.8, // high friction controla que tan rapido peuden moverse los carros (entre más alto el valor, más rapido pueden ir.
			.4 // low restitution controla que tanto rebota
	);
			
           /* var meshMaterial = new THREE.MeshPhongMaterial({
                specular: 0xaaaafff,
                color: 0x3399ff,
                shininess: 40,
                metal: true
            });*/
            meshMaterial.side = THREE.DoubleSide;
            // create a multimaterial
            var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
			
			

            return plane;
        }


interactuarConTeclado = function(carro){
	document.addEventListener(
			'keydown',
			function( ev ) {
				switch( ev.keyCode ) {
					case 49:
						// Left
						console.log("espicho 1");
						camaraActiva = 1;
	
						break;
					case 50:
						// Left
						camaraActiva = 2;
	
						break;
					case 51:
						// Left
						camaraActiva = 3;
	
						break;
					case 52:
						// Left
						camaraActiva = 4;
	
						break;					
					case 37:
						// Left
						carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: giroTimon, z: 0.1});
                    	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: giroTimon, z: 0});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: giroTimon, z: 0.1});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: giroTimon, z: 0});
						//carro.position.x = 0;
						
						break;
					
					case 39:
						// Right
						carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: -giroTimon, z: 0.1});
                    	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: -giroTimon, z: 0});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: -giroTimon, z: 0.1});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: -giroTimon, z: 0});
						
						break;
					
					case 38:
						// Up
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, velocidad, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, velocidad, 15000);
	                    carro.ruedaFrontalIzquierdaConstraint.enableAngularMotor(2);
   	                carro.ruedaFrontalDerechaConstraint.enableAngularMotor(2);
						break;
					
					case 40:
						// Down
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, -velocidad, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, -velocidad, 15000);
	             
						break;
				}
			}
		);
		
		document.addEventListener(
			'keyup',
			function( ev ) {
				switch( ev.keyCode ) {
					case 37:
						// Left
						carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
                    	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
						
						break;
					
					case 39:
						// Right
						carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
                    	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
						break;
					
					case 38:
						// Up
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
						
						break;
					
					case 40:
						// Down
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
						
						break;
				}
			}
		);
	
	
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





		