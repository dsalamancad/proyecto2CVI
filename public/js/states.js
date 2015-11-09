// global vars
 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
 var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

//var renderManager = new THREE.Extras.RenderManager(renderer);

var estado = 'planeta';

// main loop, such as phaser update()
function controlEstado(){
	
	//first lets check transition cleanup requests
	if (estado == 'planeta'){
		console.log("el estado es planeta");
		
		 inicioPlaneta();
	}
	else if (estado == 'juego1'){ 
		console.log("el estado es juego 1");
		webGLRenderer.clear();
		inicioSuperficie1("terreno4");
	}
	else if (estado == 'juego2'){ 
		webGLRenderer.clear();
		
		for( var i = scene.children.length - 1; i >= 0; i--){
     		obj = scene.children[i];
     		scene.remove(obj);
 		 }
		 
		iniciarJuego2();
	}
	
}

window.onload = controlEstado;


function llamarPlaneta() {
    estado = 'planeta';
	controlEstado();
}
function llamarjuego1() {
	
	estado = 'juego1';	
	controlEstado();   
	
}

function llamarjuego2() {
	
	estado = 'juego2';	
	controlEstado();   
}


