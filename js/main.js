var scene = new THREE.Scene();

var camera = new THREE.OrthographicCamera(  window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2, 1, 1000 );
//var camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerheight, 1, 1000 );
camera.position.z = 100;
scene.add(camera);

var light = new THREE.PointLight( 0xffffff, 1, 1500 );
light.position.set( 50, 50, 50 );
scene.add( light );
var geometry = new THREE.BoxGeometry( 120, 120, 120 );
var material = new THREE.MeshBasicMaterial( {color: 0x2147EE} );
var player = new THREE.Mesh( geometry, material );
scene.add( player );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let pos = {x:10, y:10, z:0};
let size = {x:160, y:160, z:10};
let angle = {x:0, y:0, z:0};
let enemy = new Enemy(pos, size, angle, 100);

function render() {
   requestAnimationFrame(render);
   renderer.render(scene, camera);
}
render();