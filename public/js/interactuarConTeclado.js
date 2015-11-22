interactuarConTeclado = function(carro, idJugador, terreno){
	document.addEventListener(
			'keydown',
			function( ev ) {
				switch( ev.keyCode ) {
					case 37:
						// Left
						carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: giroTimon, z: 0.1});
                    	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: giroTimon, z: 0});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: giroTimon, z: 0.1});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: giroTimon, z: 0});
                    	guardarPosicionTeclado(37, idJugador, terreno);
				
						//carro.position.x = 0;
						break;
					
					case 39:
						// Right
						carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: -giroTimon, z: 0.1});
                    	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: -giroTimon, z: 0});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: -giroTimon, z: 0.1});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: -giroTimon, z: 0});
						guardarPosicionTeclado(39, idJugador, terreno);
				
						break;
					
					case 38:
						// Up
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, velocidad, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, velocidad, 15000);
	                    carro.ruedaFrontalIzquierdaConstraint.enableAngularMotor(2);
   	            	    carro.ruedaFrontalDerechaConstraint.enableAngularMotor(2);
						guardarPosicionTeclado(38, idJugador, terreno);
				
						break;
					
					case 40:
						// Down
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, -velocidad, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, -velocidad, 15000);
	            		guardarPosicionTeclado(40, idJugador, terreno);
				 
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
						guardarPosicionTeclado(137, idJugador, terreno);
						break;
					
					case 39:
						// Right
						carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
                    	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
                    	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
						guardarPosicionTeclado(139, idJugador, terreno);
						break;
					
					case 38:
						// Up
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
						guardarPosicionTeclado(138, idJugador, terreno);
						break;
					
					case 40:
						// Down
						carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
                    	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
						guardarPosicionTeclado(140, idJugador, terreno);
						break;
				}
			}
		);
	
	
}

interactuarConTeclado2 = function(carro, tecla){
	switch( tecla ) {
		case 37:
			// Left
			carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: giroTimon, z: 0.1});
        	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: giroTimon, z: 0});
        	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: giroTimon, z: 0.1});
        	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: giroTimon, z: 0});
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
	
		case 137:
			// Left
			carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
        	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
        	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
        	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
			break;
		
		case 139:
			// Right
			carro.ruedaTraseraDerechaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
        	carro.ruedaTraseraDerechaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
        	carro.ruedaTraseraIzquierdaConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0.1});
        	carro.ruedaTraseraIzquierdaConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0});
			break;
		
		case 138:
			// Up
			carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
        	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
			break;
		
		case 140:
			// Down
			carro.ruedaFrontalIzquierdaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
        	carro.ruedaFrontalDerechaConstraint.configureAngularMotor(2, 0.1, 0, 0, 15000);
			break;
	}
}
