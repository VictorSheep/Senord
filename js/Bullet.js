class Bullet{
	constructor(pos, angle, damage, team){
		this.id		= game.elements.bullet.length -1;
		this.damage = damage;
		this.team 	= team;
		this.target = null;
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= {x:10, y:5, z:5};
		this.dist 		= {x:0, y:0};

		/* Mouvements */
		if (this.team==1){
			this.velocity = {x:0, y:0};
		}else{
			this.velocity = {x:Math.cos(angle.z), y:Math.sin(angle.z)};
		}

		/* Caracteristiques */
		this.speed      = 8;

		/* Initialisation de l'Enemy */
		this.init();
	}


	init(){
		this.defineTarget();

		this.geometry = new THREE.BoxGeometry( this.size.x, this.size.y, this.size.z );
		if (this.team==1){ // Team Player
			this.material = new THREE.MeshBasicMaterial( {color: 0x3322FF} );
		}else{	// Team Enemy
			this.material = new THREE.MeshBasicMaterial( {color: 0xFF2233} );
		}
		this.obj = new THREE.Mesh( this.geometry, this.material );
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
		scene.add( this.obj );
	}

	update(){
		if (this.team==1){ // update Tire allié
			this.dist.x = this.target.pos.x-this.pos.x;
			this.dist.y = this.target.pos.y-this.pos.y;
			this.dist.dir = Math.sqrt(this.dist.x*this.dist.x + this.dist.y*this.dist.y);
			/* Mise à jour des positions */
			this.velocity.x -= (this.dist.x)/(500);
			this.velocity.y -= (this.dist.y)/(500);
			if (this.dist.dir<70){
				this.velocity.x = this.velocity.x*1;
				this.velocity.y = this.velocity.y*1;
			}else{
				this.velocity.x = this.velocity.x/1.2;
				this.velocity.y = this.velocity.y/1.2;
			}

			this.pos.x += this.velocity.x;
			this.pos.y += this.velocity.y;

			// Direction du "regard" du vaisseau
			this.angle.z = Math.atan(this.dist.y/this.dist.x);
			if(this.dist.x > 0) this.angle.z = this.angle.z + Math.PI;
		}
		this.pos.x -= this.velocity.x*this.speed;
		this.pos.y -= this.velocity.y*this.speed;

		this.colide();
	}

	render(){
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
	}

	defineTarget(){
		if (this.team==1){
			let A = game.elements.enemy[0].pos.x - this.pos.x;
			let B = game.elements.enemy[0].pos.y - this.pos.y;
			let dist = Math.sqrt(A*A+B*B);
			let result = 0;
			let distMin = dist;
			for (let i = 1; i < game.elements.enemy.length; i++) {
				A = game.elements.enemy[i].pos.x - this.pos.x;
				B = game.elements.enemy[i].pos.y - this.pos.y;
				dist = Math.sqrt(A*A+B*B);
				if(dist<distMin){
					distMin = dist;
					result = i;
				}
			}
			this.target = game.elements.enemy[result];
		}
	}

	colide(){
		if (this.pos.x<leftBound*1.2) 	this.kill();
		if (this.pos.x>rightBound*1.2) 	this.kill();
		if (this.pos.y>topBound*1.2) 	this.kill();
		if (this.pos.y<bottomBound*1.2) this.kill();
	}

	kill(){
		this.removeEntity();
		//game.elements.bullet.splice(this.id,1);
	}
	removeEntity() {
	    scene.remove( this.obj );
	    //animate();
	}
}