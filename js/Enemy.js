class Enemy {
	constructor(pos, size, angle, life_max) {
		/* Caracteristiques */
		this.team		= 2;
		this.life_max 	= life_max;
		this.life		= life_max;
		this.damage		= 10;
		this.range		= 100;

		/* Position objet */
		this.pos 		= pos;
		this.size		= size;
		this.angle		= angle;
		this.dist		= {x:0,y:0,z:0};

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:0};
		this.velocity	= {x:1, y:0};
		this.adjVlocity	= {x:Math.random()*2-1, y:Math.random()*2-1};
		this.speed 		= 0;

		/* Munition */
		this.count 		= 0;
		this.rate		= Math.random()*10+25;

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
		this.count++;
		this.count = (this.count>=1000/this.rate)? 0 : this.count;

		this.dist.x = player.x-this.pos.x;
		this.dist.y = player.y-this.pos.y;
		this.dist.dir = Math.sqrt(this.dist.x*this.dist.x + this.dist.y*this.dist.y);
		/* Mise à jour des positions */
		this.velocity.x += (this.dist.x)/(2000) + this.adjVlocity.x/10 + Math.random()-.5;
		this.velocity.y += (this.dist.y)/(2000) + this.adjVlocity.y/10 + Math.random()-.5;
		this.velocity.x = this.velocity.x/1.02;
		this.velocity.y = this.velocity.y/1.02;

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		// Direction du "regard" du vaisseau
		this.angle.z = Math.atan(this.dist.y/this.dist.x);
		if(this.dist.x > 0) this.angle.z = this.angle.z + Math.PI;

		this.angle.x += this.rotation.x/(180*Math.PI);
		this.angle.y += this.rotation.y/(180*Math.PI);
		this.angle.z += this.rotation.z/(180*Math.PI);

		// Tire
		if(this.count==0){
			this.shoot();			
		}

		// Collision
		this.colide();
	}

	render(){
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
	}

	shoot(){
		//console.log(this.angle.z);
		let pos = Object.assign({},this.pos);
		let angle = Object.assign({},this.angle);
		game.elements.bullet.push(new Bullet(pos, angle, this.damage, this.team));
	}

	colide(){

	}
}