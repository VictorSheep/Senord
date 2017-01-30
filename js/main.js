var scene = new THREE.Scene();

var camera = new THREE.OrthographicCamera(  window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2, 1, 1000 );
camera.position.z = 100;
scene.add(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );