class Turret{
	constructor(time_max, life_max, angle, size){
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= size;

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:0};		
		this.velocity	= {x:0, y:0};

		/* Caracteristiques */
		this.time 		= time_max;
		this.time_max	= time_max;
		this.activate   = false;

		/* Modelisation */
		this.geometry 	= new THREE.SphereGeometry( this.size.radius, this.size.width, this.size.heigth );
		this.material 	= new THREE.MeshBasicMaterial( {color: 0x00ffff} );
		this.obj	  	= new THREE.Mesh( this.geometry, this.material );
	}

	/* Methodes */
	init(scene){
		scene.add(this.obj);
		this.obj.position.set(this.pos.x,this.pos.y,0);
		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
}