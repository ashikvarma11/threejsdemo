var backgroundColor = 0xb2dfdb
var shapeColor = 0x009688
var lightColor = 0xFFFFFF
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 70;
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(backgroundColor)
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener('resize',()=>{
	renderer.setSize(window.innerWidth,window.innerHeight)
	camera.aspect = window.innerWidth/window.innerHeight
	camera.updateProjectMatrix();
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

for (var i=0;i<100;i++){
var mesh = new THREE.Mesh(geometry,material);
mesh.position.x = (Math.random()-0.5)*100;

mesh.position.y = (Math.random()-0.5)*50;

mesh.position.z = (Math.random()-0.5)*100;


meshList.push(mesh);
scene.add(mesh);
meshX+=1;

}


// Add Light
var light = new THREE.PointLight(lightColor,1,2000)
light.position.set(0,0,0);
scene.add(light)
var light = new THREE.PointLight(lightColor,1,2000)
light.position.set(10,0,25);
scene.add(light)
var light = new THREE.PointLight(lightColor,1,2000)
light.position.set(1,500,100);
scene.add(light)
var render = function(){
	requestAnimationFrame(render);
	for (i=0;i<meshList.length;i++){
		meshList[i].rotation.y+=0.01;
	}
	// centerBox.rotation.y+=0.01
	renderer.render(scene,camera);	
}






function onMouseMove(event){
	
	event.preventDefault();
	mouse.x = (event.clientX/window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY/window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse,camera);

	var intersects = raycaster.intersectObjects(scene.children,true);
	for (var i=0;i<intersects.length;i++){
		this.t1 = new TimelineMax();
		this.t1.to(intersects[i].object.scale,0.5,{x:5,ease:Expo.easeOut})
		// this.t1.to(intersects[i].object.scale,.5,{x:.5,ease:Expo.easeOut})
		// this.t1.to(intersects[i].object.position,.5,{x:Math.random()*100,ease:Expo.easeOut})
		this.t1.to(intersects[i].object.rotation,.5,{y:Math.PI*.5,ease:Expo.easeOut})
	}
}




render();

window.addEventListener('mousemove',onMouseMove);

