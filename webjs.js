var backgroundColor = 0xCCE0FF
var shapeColor = 0x009688
var lightColor = 0xFFFFFF
var scene = new THREE.Scene();
var INTERSECTED;
scene.fog = new THREE.Fog( 0xcce0ff, 400, 1000 );
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 510;
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
// centerBox = new THREE.Mesh(new THREE.BoxGeometry(9,5,6),new THREE.MeshLambertMaterial());
// centerBox.position.x = 0;
// centerBox.position.y = 0;
// centerBox.position.z = 60;
// scene.add(centerBox)

meshList=[]
this.t1 = new TimelineMax()
for (var i=0;i<100;i++){
var mesh = new THREE.Mesh(geometry,material);
mesh.position.x = 0;

mesh.position.y =0;

mesh.position.z = (Math.random()-0.5)*1000;

this.t1.to(mesh.position,0.5,{x:(Math.random()-0.5)*1000,y:(Math.random()-0.5)*1000,ease:Expo.easeOut})


meshList.push(mesh);
scene.add(mesh);
meshX+=1;

}



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
var render = function(){
	requestAnimationFrame(render);
	for (i=0;i<meshList.length;i++){
		meshList[i].rotation.y+=0.01;
	}
	controls.update();
	// centerBox.rotation.y+=0.01
	renderer.render(scene,camera);	
}


//Add Ground
var loader = new THREE.TextureLoader();
var groundTexture = loader.load( './images/terrain2.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 25, 25 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
var ground = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
ground.position.y = - 250;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );

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

