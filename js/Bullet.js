class Bullet{
	constructor(pos,angle,damage, player){
		this.damage = damage;
		this.cible = player;
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= {x:10, y:5, z:5};

		/* Mouvements */
		this.velocity	= {x:Math.cos(angle.z), y:Math.sin(angle.z)};
		console.log(this.velocity);

		/* Caracteristiques */
		this.lifetime	= 100;
		this.speed      = 15;

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
		this.pos.x -= this.velocity.x*this.speed;
		this.pos.y -= this.velocity.y*this.speed;
	}

	render(){
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
	}
}