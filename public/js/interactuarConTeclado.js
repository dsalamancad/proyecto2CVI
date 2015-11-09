interactuarConTeclado = function(carro){
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
