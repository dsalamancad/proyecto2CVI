
Physijs.scripts.worker = '../js/libs/physijs_worker.js';
Physijs.scripts.ammo = '../libs/ammo.js';

var initScene, render, superficie_material, renderer, render_stats, scene, superficie, light, camaraActiva, camera, cameraCarro, cameraPersona, camaraCenital, carro, velocidad, giroTimon;

camaraActiva = 1;
velocidad = -8;
giroTimon = 0.5;


initScene = function () {

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.shadowMap.enabled = true;
	document.getElementById('viewport').appendChild(renderer.domElement);            

	//Crear la gravedad en la escena
	scene = new Physijs.Scene;
	scene.setGravity(new THREE.Vector3(0, -50, 0));
	
	
	//poner camara por defecto
	camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,1, 1000);
	camera.position.set(200, 150, 180);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);
	
	
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
            var r = 150;

            var x = Math.sin(u) * r;
            var z = Math.sin(v / 2) * 2 * r;
            var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

            return new THREE.Vector3(x, y, z);
        };


		var date = new Date();
		//var pn = new Perlin('rnd' + date.getTime());
		var pn = new Perlin('rnd' + 1000);
 		var map = createHeightMap(pn);
        scene.add(map);

		requestAnimationFrame(render);
};


 function createHeightMap(pn) {

            var ground_material = Physijs.createMaterial(
                   new THREE.MeshLambertMaterial( { color: 0x00FF00 }, .3, .8 ));

            var ground_geometry = new THREE.PlaneGeometry(500, 500, 100, 100);
            for (var i = 0; i < ground_geometry.vertices.length; i++) {
               	
                var vertex = ground_geometry.vertices[i];
                //console.log("x: " + vertex.x +  " y: " + vertex.y + " z: " + vertex.z);
                var value = pn.noise(vertex.x / 100, vertex.y / 100, 0);
                vertex.z = value * 1;
                
               
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

            return ground;
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

function crearRueda(position) {
	var rueda_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0x444444}),
			1.0, // high friction
			.5 // medium restitution
	);
	//CylinderGeometry (radio externo, radio interno, grosor, divisiones
	var rueda_geometria = new THREE.CylinderGeometry(4, 4, 2, 30);
	var rueda = new Physijs.CylinderMesh(
			rueda_geometria,
			rueda_material,
			100
	);

	rueda.rotation.x = Math.PI / 2;
	rueda.castShadow = true;
	rueda.position.copy(position);
	return rueda;
}

 function crearCarro() {
	 
	
	
	var carro = {};
	var carro_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0xff4444, opacity: 0.9, transparent: true}),
			.5, // high friction
			.5 // medium restitution
	);

	// crear Todo el carro
	
	var todoElCarro = new Physijs.BoxMesh(new THREE.BoxGeometry(15, 4, 4), carro_material, 500);
	todoElCarro.position.set(5, 5, 5);
	todoElCarro.castShadow = true;
	scene.add(todoElCarro);
	
	var carroArriba_material = new THREE.MeshLambertMaterial({color: 0xff4444, opacity: 0.9, transparent: true});
	var carroArriba_geometria = new THREE.CubeGeometry( 7, 4, 4);
	carroArriba = new THREE.Mesh( carroArriba_geometria, carroArriba_material );
	carroArriba.position.set(-4, 4, 0);
	todoElCarro.add( carroArriba );	
	
	
	//camara que me muestra el carro desde afuera
	cameraCarro = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,1, 1000);
	cameraCarro.position.set(-40, 15, 0);
	cameraCarro.lookAt(carroArriba.position);
	console.log(carroArriba.position);
	carroArriba.add(cameraCarro);
	
	//camara en primera persona
	cameraPersona = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,1, 1000);
	cameraPersona.position.set(3, 0, 0);
	cameraPersona.rotation.y = -Math.PI/2;
	
	//console.log(cameraPersona.position);
	carroArriba.add(cameraPersona);

	// crear las ruedas ruedas
	var ruedaFrontalDerecha = crearRueda(new THREE.Vector3(0, 4, 10));
	var ruedaFrontalIzquierda = crearRueda(new THREE.Vector3(0, 4, 0));
	var ruedaTraseraDerecha = crearRueda(new THREE.Vector3(10, 4, 10));
	var ruedaTraseraIzquierda = crearRueda(new THREE.Vector3(10, 4, 0));

	// poner las ruedas en la escena
	scene.add(ruedaFrontalDerecha);
	scene.add(ruedaFrontalIzquierda);
	scene.add(ruedaTraseraDerecha);
	scene.add(ruedaTraseraIzquierda);

	var ruedaFrontalDerechaConstraint = crearRuedaConstraint(ruedaFrontalDerecha, todoElCarro, new THREE.Vector3(0, 4, 8));
	scene.addConstraint(ruedaFrontalDerechaConstraint);

	var ruedaFrontalIzquierdaConstraint = crearRuedaConstraint(ruedaFrontalIzquierda, todoElCarro, new THREE.Vector3(0, 4, 2));
	scene.addConstraint(ruedaFrontalIzquierdaConstraint);

	var ruedaTraseraDerechaConstraint = crearRuedaConstraint(ruedaTraseraDerecha, todoElCarro, new THREE.Vector3(10, 4, 8));
	scene.addConstraint(ruedaTraseraDerechaConstraint);

	var ruedaTraseraIzquierdaConstraint = crearRuedaConstraint(ruedaTraseraIzquierda, todoElCarro, new THREE.Vector3(10, 4, 2));
	scene.addConstraint(ruedaTraseraIzquierdaConstraint);


	// backwheels don't move themselves and are restriced in their
	// movement. They should be able to rotate along the z-axis
	// same here, if the complete angle is allowed set lower higher
	// than upper.
	// by setting the lower and upper to the same value you can
	// fix the position
	// we can set the x position to 'loosen' the axis for the directional
	ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
	ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
	ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
	ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});


	// front wheels should only move along the z axis.
	// we don't need to specify anything here, since
	// that value is overridden by the motors
	ruedaFrontalDerechaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0});
	ruedaFrontalDerechaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
	ruedaFrontalIzquierdaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0});
	ruedaFrontalIzquierdaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});


	carro.ruedaFrontalIzquierdaConstraint = ruedaFrontalIzquierdaConstraint;
	carro.ruedaFrontalDerechaConstraint = ruedaFrontalDerechaConstraint;
	carro.ruedaTraseraIzquierdaConstraint = ruedaTraseraIzquierdaConstraint;
	carro.ruedaTraseraDerechaConstraint = ruedaTraseraDerechaConstraint;

	return carro;
}

function crearRuedaConstraint(rueda, todoElCarro, position) {
	var constraint = new Physijs.DOFConstraint(
			rueda, todoElCarro, position);

	return constraint;
}
		


function crearSuperficie() {
	var superficie_material = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xaaaaaa}),
			0.8, // high friction controla que tan rapido peuden moverse los carros (entre más alto el valor, más rapido pueden ir.
			.4 // low restitution controla que tanto rebota
	);
	var superficie = new Physijs.BoxMesh(new THREE.BoxGeometry(200, 1, 200), superficie_material, 0);
	superficie.receiveShadow = true;
	
	//superficie.rotation.x = Math.PI/10;
	scene.add(superficie);
}

render = function () {
	requestAnimationFrame(render);
	
	if(camaraActiva == 1){
	renderer.render(scene, camera);
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



window.onload = initScene;

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
