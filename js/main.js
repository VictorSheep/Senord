let scene = new THREE.Scene();

let camera = new THREE.OrthographicCamera(  leftBound,rightBound,topBound,bottomBound, 1, 1000 );
//let camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerheight, 1, 1000 );
camera.position.z = 200;

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function render() {
   requestAnimationFrame(render);
   renderer.render(scene, camera);
   game.update();
   game.render();

}

//load the assets and let 0.5s before start to load completely 
loader.init();
setTimeout(function(){
	game.init(); 
	render();
}, 500);