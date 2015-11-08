function crearSuperficieBezier(p0,p1,p2,p3)
{
	var x0 = p0[0];
    var x1 = p1[0];
    var x2 = p2[0];
    var x3 = p3[0];
    
    var y0 = p0[1];
    var y1 = p1[1];
    var y2 = p2[1];
    var y3 = p3[1];
    
    var z0 = p0[2];
    var z1 = p1[2];
    var z2 = p2[2];
    var z3 = p3[2];
    
    var a=[];
    var b=[];
    var c=[];
    
    c[0] = 3 * (x1 - x0);
	b[0] = 3 * (x2 - x1) - cx;
	a[0] = x3 - x0 - cx - bx;
	
	c[1] = 3 * (y1 - y0);
	b[1] = 3 * (y2 - y1) - cy;
	a[1] = y3 - y0 - cy - by;
	
	c[2] = 3 * (z1 - z0);
	b[2] = 3 * (z2 - z1) - cz;
	a[2] = z3 - z0 - cz - bz;
    
    return {'a':a,'b':b,'c':c, 'p0':p0};
}


function crearSuperficieBezier(p0,p1,p2,p3,p4,p5,p6,p7)
{
	var x0 = p0[0], x4 = p4[0];
    var x1 = p1[0], x5 = p5[0];
    var x2 = p2[0], x6 = p6[0];
    var x3 = p3[0], x7 = p7[0];
    
    var y0 = p0[1], y4 = p4[1];
    var y1 = p1[1], y5 = p5[1];
    var y2 = p2[1], y6 = p6[1];
    var y3 = p3[1], y7 = p7[1];
    
    var z0 = p0[2], z4 = p4[2];
    var z1 = p1[2], z5 = p5[2];
    var z2 = p2[1], z6 = p6[2];
    var z3 = p3[2], z7 = p7[2];
    
    var cx = 3 * (x1 - x0)       	,	c1x = 3 * (x5 - x4);
	var bx = 3 * (x2 - x1) - cx	 	,	b1x = 3 * (x6 - x5) - c1x;
	var ax = x3 - x0 - cx - bx	 	,	a1x = x7 - x4 - c1x - b1x;
	
	var cy = 3 * (y1 - y0) 			,	c1y = 3 * (y5 - y4);
	var by = 3 * (y2 - y1) - cy		,	b1y = 3 * (y6 - y5) - c1y;
	var ay = y3 - y0 - cy - by		,	a1y = y7 - y4 - c1y - b1y;
	
	var cz = 3 * (z1 - z0)			, 	c1z = 3 * (z5 - z4);
	var bz = 3 * (z2 - z1) - cz		, 	b1z = 3 * (z6 - z5) - c1z;
	var az = z3 - z0 - cz - bz		,	a1z = z7 - z4 - c1z - b1z;

	var xant = x0;
	var yant = y0;
	var zant = z0;
	
    var x1ant = x4;
	var y1ant = y4;
	var z1ant = z4;
    	
	for(i = 1; i <= 50; i++){	
		var t = i/50;
    	var x = ax * t * t * t + bx * t * t + cx * t + x0;
    	var y = ay * t * t * t + by * t * t + cy * t + y0;
    	var z = az * t * t * t + bz * t * t + cz * t + z0;
    	
    	var xa = a1x * t * t * t + b1x * t * t + c1x * t + x4;
    	var ya = a1y * t * t * t + b1y * t * t + c1y * t + y4;
    	var za = a1z * t * t * t + b1z * t * t + c1z * t + z4;
    	
    	var geometry = dibujarCuadrado(xant, yant, zant, x, y, z, xa, ya, za, x1ant, y1ant, z1ant);
    	
    	var square = new THREE.Mesh(geometry, material);
	    scene.add(square);
	
	    xant = x;
	    yant = y;
	    zant = z;
	
        x1ant = xa;
	    y1ant = ya;
	    z1ant = za;
    }
       
}

function getRandomInt() {
  return Math.floor(Math.random() * (20 + 5)) -5;
}