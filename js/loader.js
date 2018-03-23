let loader = {
	model3D : {
		player : {},
		turret : {},
		enemy : {},
		factory : {}
	},

	init(){
		let onError = function ( xhr ) { console.log('ERROR on load')};

		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

		let mtlLoader = new THREE.MTLLoader();

		mtlLoader.setPath('assets/obj/textures/');

		let self = this;
		//loader of player model
		mtlLoader.load( 'gemini.mtl', function( materials ) {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( 'assets/obj/source/' );
			objLoader.load( 'gemini.obj', function ( object ) {
				self.model3D.player = object.children[0];
			}, null, onError );
		});

		//loader of enemy model
		mtlLoader.load('virgo.mtl', function( materials ) {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( 'assets/obj/source/' );
			objLoader.load( 'virgo.obj', function ( object ) {
				self.model3D.enemy = object.children[0];
			}, null, onError );
		});

		//loader of turret model
		mtlLoader.load('turretModel.mtl', function( materials ) {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( 'assets/obj/source/' );
			objLoader.load( 'turretModel.obj', function ( object ) {
				self.model3D.turret = object.children[0];
			}, null, onError );
		});

		//loader of factory model
		mtlLoader.load('factory.mtl', function( materials ) {
			materials.preload();
			let objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( 'assets/obj/source/' );
			objLoader.load( 'factory.obj', function ( object ) {
				self.model3D.factory = object.children[0];
			}, null, onError );
		});
	}
}