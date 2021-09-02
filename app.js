
            import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js'
			let camera, controls, scene, renderer;

			init();
			//render(); // remove when using next line for animation loop (requestAnimationFrame)
			//animate();

			// create global variables of 

// create function to initialise the scene 
function init() {

// create a new scene 
scene = new THREE.Scene()

// set camera 
camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 45, 30000)
camera.position.set(-900, -200, -900)
// set renderer
renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)

//set up orbit contolls to allow mouse camera controls
let controls = new OrbitControls(camera,renderer.domElement)
//controls.addEventListener('change', renderer)
//controls.minDistance = 500
//controls.maxDistance=1500
controls.update();

//create an array to store the materials of each side of the cube 
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('assets/wrath_ft.jpg')
let texture_bk = new THREE.TextureLoader().load('assets/wrath_bk.jpg')
let texture_up = new THREE.TextureLoader().load('assets/wrath_up.jpg')
let texture_dn = new THREE.TextureLoader().load('assets/wrath_dn.jpg')
let texture_rt = new THREE.TextureLoader().load('assets/wrath_rt.jpg')
let texture_lf = new THREE.TextureLoader().load('assets/wrath_lf.jpg')

// once loaded we will push each material to the array 
materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}))
materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}))


for(let i=0; i<6;i++)
materialArray[i].side = THREE.BackSide

//the meshbasicmaterial material is not affected by light so we dont need to set up a light to see it 
//create a box geometry set with the material array
let skyboxGeo = new THREE.BoxGeometry(10000,10000,10000)
let skybox = new THREE.Mesh(skyboxGeo, materialArray)

//add to scene
scene.add(skybox)
//animate()


const animate = function () {
	requestAnimationFrame( animate );

	skybox.rotation.y += 0.005;
	

	renderer.render( scene, camera );
};
animate();

}

// function animate() {
// requestAnimationFrame(animate);
// skybox.rotation.x += 0.01;
// renderer.render(scene,camera);
// }