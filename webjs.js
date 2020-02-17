var backgroundColor = 0xCCE0FF
var shapeColor = 0x009688
var lightColor = 0xFFFFFF
var scene = new THREE.Scene();
var INTERSECTED;
scene.fog = new THREE.Fog( 0xcce0ff, 4000, 12000 );
var camera = new THREE.PerspectiveCamera(100,window.innerWidth/window.innerHeight,1,12000)
camera.position.z = 2000;
camera.position.y = 5500;
camera.position.x = 800;

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(backgroundColor)
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener('resize',()=>{
	renderer.setSize(window.innerWidth,window.innerHeight)
	camera.aspect = window.innerWidth/window.innerHeight
	camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()
// Make Shape

var geometry =  new THREE.BoxGeometry(3,3,3)
var material = new THREE.MeshLambertMaterial({color:shapeColor});



meshX = -10;


// this.t1 = new TimelineMax()
// for (var i=0;i<1000;i++){
// var mesh = new THREE.Mesh(geometry,material);
// mesh.position.x = 0;

// mesh.position.y =0;

// mesh.position.z = -500;

// this.t1.to(mesh.position,2,{x:(Math.random()-0.5)*1000,y:(Math.random()-0.5)*1000,z:(Math.random()-0.5)*1000,ease:Expo.easeOut})


// meshList.push(mesh);
// // scene.add(mesh);
// meshX+=1;

// }



// Add Orbit Controls
controls = new THREE.OrbitControls(camera,renderer.domElement);
// controls.addEventListener( 'change', render )
controls.update();


// Add Light
var light = new THREE.DirectionalLight( 0xdfebff, 1 );
				light.position.set( 50, 200, 100 );
				light.position.multiplyScalar( 1.3 );

				light.castShadow = true;

				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;

				var d = 300;

				light.shadow.camera.left = - d;
				light.shadow.camera.right = d;
				light.shadow.camera.top = d;
				light.shadow.camera.bottom = - d;

				light.shadow.camera.far = 1000;

				scene.add( light );





//Add Ground
var loader = new THREE.TextureLoader();
var groundTexture = loader.load( './images/wood.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 25, 25 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
var ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( 80000, 80000 ), groundMaterial );
ground.position.y = - 250;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );


var textureLoader = new THREE.TextureLoader();
var ballTexture = textureLoader.load('./models/bb/texture.jpg');
var hoopTexture = textureLoader.load('./models/hoop/texture.jpg');

var ballMaterial = new THREE.MeshPhongMaterial({map: ballTexture});

var hoopMaterial = new THREE.MeshPhongMaterial({map: hoopTexture});
//Add Hoop
var objLoader = new THREE.OBJLoader();
objLoader.setPath('./models/')
objLoader.load('./hoop/basketball_hoop.obj',(hoop)=>{
	// hoop.position.y = 0;
	hoop.position.y = 3500;
	hoop.castShadow = true;
	// hoop.position.z = 520;
	hoop.scale.set(0.5,0.5,0.5);

	hoop.traverse( function ( node ) {

    if ( node.isMesh ) node.material = hoopMaterial;

  } );

	scene.add(hoop)
});

var player;

 var gltfLoader = new THREE.GLTFLoader();
				gltfLoader.load( './models/basketball_player/scene.gltf', function ( gltf ) {
					console.log(gltf)
					model = gltf.scene;
					model.position.y = -300;
					model.position.z = 5000;
					model.castShadow = true;
					model.rotation.z += Math.PI 
					model.rotation.x -= Math.PI/2 
					model.position.z = 520;
					// gltf.scale.set(24,24,24);
					scene.add( model );

					model.traverse( function ( object ) {

						if ( object.isMesh ) object.castShadow = true;

					} );

					//

					skeleton = new THREE.SkeletonHelper( model );
					skeleton.visible = true;
					scene.add( skeleton );

					

					//

					var animations = gltf.animations;

					mixer = new THREE.AnimationMixer( model );

					armatureAction = mixer.clipAction( animations[ 0 ] );

					actions = [ armatureAction ];

					activateAllActions();

					animate();

				} );

			function activateAllActions() {
				actions.forEach( function ( action ) {

					action.play();

				} );

			}


var basketball;

var basketballList=[]
objLoader.load('./bb/bb.obj',(ball)=>{
	t2 = new TimelineMax().delay(2);

	for (i =0;i<1;i++){
		basketball = ball
		// hoop.position.y = 0;
		basketball.position.y = 3500;

		basketball.position.z = 3500;

		basketball.position.x = (Math.random()-0.5)*100;
		basketball.castShadow = true;

		// hoop.position.z = 520;
		basketball.scale.set(20,20,20);
		basketball.traverse( function ( node ) {

	    if ( node.isMesh ) node.material = ballMaterial;

	  		} );
		
		basketballList.push(basketball);
		scene.add(basketball);
	}
	
});



var up = true;
gravity = -50;
speed = 50;
console.log("speed",speed)
ballLimit = 3500
ballBounceControl = 0.99
console.log("basket",basketballList)
	
var render = function(){
	requestAnimationFrame(render);
	for (i=0;i<basketballList.length;i++){
		console.log(i,basketballList[i].position.x)
		basketballList[i].translateY(speed)

		
		if(basketballList[i].position.y<500 || basketballList[i].position.y>5500){
			speed = speed * -1;
		}
		speed -= 30.1 

		

		// basketball.position.z -= 50;
		basketballList[i].rotation.x -= 0.00;
	    basketballList[i].rotation.y += 0.10;	



	}
	controls.update();
	
	
	

	renderer.render(scene,camera);	
}















function onCLick(event){
	event.preventDefault();
	controls.update();
}


function onMouseMove(event){
	
	event.preventDefault();
	mouse.x = (event.clientX/window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY/window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse,camera);
	  var intersects = raycaster.intersectObjects(scene.children);

	 // if there is one (or more) intersections
  if (intersects.length > 0) {
    // if the closest object intersected is not the currently stored intersection object
    if (intersects[0].object != INTERSECTED) {
      // restore previous intersection object (if it exists) to its original color
      if (INTERSECTED)
        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      // store reference to closest object as current intersection object
      INTERSECTED = intersects[0].object;
      // store color of closest object (for later restoration)
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      // set a new color for closest object
      INTERSECTED.material.color.setHex(0xFFFFFF);
    }
  } else // there are no intersections
  {
    // restore previous intersection object (if it exists) to its original color
    if (INTERSECTED)
      INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    // remove previous intersection object reference
    //     by setting current intersection object to "nothing"
    INTERSECTED = null;
  }

}


render();

window.addEventListener('mousemove',onMouseMove);

