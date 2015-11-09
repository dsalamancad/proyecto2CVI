function setupDeEscena(){
	
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
	camaraCenital.position.set(0, 700, 0);
	camaraCenital.lookAt(new THREE.Vector3(0, 0, 0));
	camaraCenital.rotation.z= 1.5*(Math.PI);
	scene.add(camaraCenital);

	// luz
	light = new THREE.SpotLight(0xFFFFFF);
	light.position.set(20, 500, 50);
	light.castShadow = true;
	scene.add(light);
	
	
	
}