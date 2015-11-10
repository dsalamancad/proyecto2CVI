
 
function inicioPlaneta() {
   
		 var projector = new THREE.Projector();
        document.addEventListener('mousedown', seleccionarSuperficie, false);
       	
		//crear el fondo 
		var urls = [
		  'assets/skybox/0004.png',
		  'assets/skybox/0002.png',
		  'assets/skybox/0006.png',
		  'assets/skybox/0005.png',
		  'assets/skybox/0001.png',
		  'assets/skybox/0003.png'
		];
		
		var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
		cubemap.format = THREE.RGBFormat;
		
		var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
		shader.uniforms['tCube'].value = cubemap; // apply textures to shader
		
		// create shader material
		var skyBoxMaterial = new THREE.ShaderMaterial( {
		  fragmentShader: shader.fragmentShader,
		  vertexShader: shader.vertexShader,
		  uniforms: shader.uniforms,
		  depthWrite: false,
		  side: THREE.BackSide
		});
		
		// create skybox mesh
		var skybox = new THREE.Mesh(
		  new THREE.CubeGeometry(1000, 1000, 1000),
		  skyBoxMaterial
		);
		
		scene.add(skybox);

		
        //crear planeta
		var planeta_material = new THREE.MeshLambertMaterial({color: 0x2a4a9c });
		var planeta_geometria = new THREE.SphereGeometry( 13	, 40, 40);
		planeta = new THREE.Mesh( planeta_geometria, planeta_material );
        scene.add(planeta);
		
		//crear las superficies
		var superficie1_material = new THREE.MeshLambertMaterial({color: 0x23cfca});
		var superficie2_material = new THREE.MeshLambertMaterial({color: 0x9d1fb6});
		var superficie3_material = new THREE.MeshLambertMaterial({color: 0xb63916});
		var superficie4_material = new THREE.MeshLambertMaterial({color: 0xb69916});
		var superficie5_material = new THREE.MeshLambertMaterial({color: 0x23b61f});
		
		var superficies_geometria = new THREE.SphereGeometry( 3, 20, 20);
		
		superficie1 = new THREE.Mesh( superficies_geometria, superficie1_material );
		superficie1.position.set(0, 0,17);
		superficie1.name = "superficie1";
		planeta.add( superficie1 );
		
		superficie2 = new THREE.Mesh( superficies_geometria, superficie2_material );
		superficie2.position.set(16, 0, 5);
		superficie2.name = "superficie2";
		planeta.add( superficie2 );
		
		superficie3 = new THREE.Mesh( superficies_geometria, superficie3_material );
		superficie3.position.set(9, 0, -13);
		superficie3.name = "superficie3";
		planeta.add( superficie3 );	
		
		superficie4 = new THREE.Mesh( superficies_geometria, superficie4_material );
		superficie4.position.set(-9, 0, -13);
		superficie4.name = "superficie4";
		planeta.add( superficie4 );
		
		superficie5 = new THREE.Mesh( superficies_geometria, superficie5_material );
		superficie5.name = "superficie5";
		superficie5.position.set(-16, 0, 5);
		planeta.add( superficie5 );		

        // position and point the camera to the center of the scene
        camera.position.x = -20;
        camera.position.y = 30;
        camera.position.z = 40;
        camera.lookAt(new THREE.Vector3(00, 0, 0));

        var orbitControls = new THREE.OrbitControls(camera);
		orbitControls.autoRotate = true;
       	var clock = new THREE.Clock();

        var ambiLight = new THREE.AmbientLight(0x222222);
        scene.add(ambiLight);
        var spotLight = new THREE.DirectionalLight(0xffffff);
        spotLight.position.set(-20, 30, 40);
        spotLight.intensity = 1.5;
        scene.add(spotLight);
		
		var spotLight2 = new THREE.DirectionalLight(0xffffff);
        spotLight2.position.set(-20, -30, -40);
        spotLight2.intensity = 0.5;
        scene.add(spotLight2);
		
		

        // add the output of the renderer to the html element
        document.getElementById("viewport").appendChild(webGLRenderer.domElement);

        // call the render function
        var step = 0;

		
        render();

        function render() {
           
            //sphere.rotation.y=step+=0.01;
            var delta = clock.getDelta();
            orbitControls.update(delta);

            // render using requestAnimationFrame
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }


		var projector = new THREE.Projector();
        

        function seleccionarSuperficie(event) {

            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            vector = vector.unproject(camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects([superficie1, superficie2, superficie3,superficie4,superficie5]);

            if (intersects.length > 0) {
				 
				if (intersects[0].object.name == "superficie1"){
					window.open("superficie1.html","_self")
					document.removeEventListener('mousedown', seleccionarSuperficie, false);
					//llamarjuego1();
				}
				else if (intersects[0].object.name == "superficie2"){
					window.open("superficie2.html","_self")
					document.removeEventListener('mousedown', seleccionarSuperficie, false);
					//llamarjuego2();
				}
				else if (intersects[0].object.name == "superficie3"){
					window.open("superficie3.html","_self")
					document.removeEventListener('mousedown', seleccionarSuperficie, false);
					//llamarjuego3();
				}
				else if (intersects[0].object.name == "superficie4"){
					window.open("superficie4.html","_self")
					document.removeEventListener('mousedown', seleccionarSuperficie, false);
					//llamarjuego4();
				}
				else if (intersects[0].object.name == "superficie5"){
					window.open("superficie5.html","_self")
					document.removeEventListener('mousedown', seleccionarSuperficie, false);
					//llamarjuego5();
				}
				else{
					console.log("a ninguno");	
				}
                
				
            }
        }

      

        
    }
   