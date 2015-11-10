/*function Carro(){
	this.variable = xxx;
	
	
}
Carro.prototype.create = function()
{
	
}
*/

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
	
	//crear geometría para definir el lado sensible
	var ladoSensible_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({color: 0xffff00, opacity: 0.9, transparent: true}),
			.5, // high friction
			.5 // medium restitution
	);
	var ladoSensible = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 4, 8), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
	ladoSensible.position.set(9, 0, 0);
	ladoSensible.name = "ladoSensible_jugador1";
	todoElCarro.add( ladoSensible );
	
	
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
		
