class Enemy {
	constructor(pos, size, angle, life_max) {
		/* Caracteristiques */
		this.life_max 	= life_max;
		this.life		= life_max;
		this.damage		= 10;
		this.range 		= 100;

		/* Position objet */
		this.pos 		= pos;
		this.size		= size;
		this.angle		= angle;

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:10};
		this.velocity	= {x:1, y:0};
		this.speed 		= 0;

		/* Initialisation de l'Enemy */
		this.init();
	}

	init(){
		this.geometry = new THREE.BoxGeometry( this.size.x, this.size.y, this.size.z );
		this.material = new THREE.MeshBasicMaterial( {color: 0xEF4444} );
		this.obj = new THREE.Mesh( this.geometry, this.material );
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
		scene.add( this.obj );
	}

	update(player){
		/* Mise à jour des positions */
		this.velocity.x = (player.x-this.pos.x)/100;
		this.velocity.y = (player.y-this.pos.y)/100;

		if (abs(player.x-this.pos.x) < this.range) { this.velocity.x = 0; }
		if (abs(player.y-this.pos.y) < this.range) { this.velocity.y = 0; }

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		this.angle.x += this.rotation.x/(180*Math.PI);
		this.angle.y += this.rotation.y/(180*Math.PI);
		this.angle.z += this.rotation.z/(180*Math.PI);
	}

	render(){
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
	}
}