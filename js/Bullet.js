class Bullet{
	constructor(damage){
		this.damage = damage;
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= size;

		/* Mouvements */
		this.velocity	= {x:0, y:0};

		/* Caracteristiques */
		this.lifetime	= 100;
		this.speed      = speed;

		/* Initialisation de l'Enemy */
		this.init();
	}

	init(){
		this.geometry = new THREE.BoxGeometry( this.size.x, this.size.y, this.size.z );
		this.material = new THREE.MeshBasicMaterial( {color: 0xFF2233} );
		this.obj = new THREE.Mesh( this.geometry, this.material );
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
		scene.add( this.obj );
	}

	update(){
		this.pos.x = this.velocity.x;
		this.pos.y = this.velocity.y;
	}

	render(){
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
	}
}