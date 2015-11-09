function cambiarCamara(){
	document.addEventListener(
			'keydown',
			function( ev ) {
				switch( ev.keyCode ) {
					case 49:
						// camara juego
						console.log("espicho 1");
						camaraActiva = 1;
	
						break;
					case 50:
						// camara carro
						camaraActiva = 2;
	
						break;
					case 51:
						// camara primera persona
						camaraActiva = 3;
	
						break;
					case 52:
						// camara cenital
						camaraActiva = 4;
	
						break;					
					
				}
			}
		);
	
}
