
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
		
		var y = i*5-250;
		var z = consZ.a * t * t * t + consZ.b * t * t + consZ.c * t + consZ.x0;
			
		console.log("z: "+ z + " y ; " + y);	
		for(j = 0; j < 100; j++){//x
			var x=j*5-250;
			coordenadas[i*100 + j] = {x:x, y:y, z:z, t:t, 'terreno':'terreno5'};
			
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
  return Math.floor(Math.random() * (20 + 10)) -15 ;
}		
