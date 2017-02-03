class Bullet{
	constructor(){
		this.isDisp = false;
		this.id		= game.elements.bullet.length -1;
		this.damage = 0;
		this.team 	= 0;
		this.target = null;
		this.hitbox = 4;
		/* Position */
		this.pos		= {x:10, y:5};
		this.angle      = {x:0, y:0, z:0};
		this.size		= {x:10, y:5, z:5};
		this.dist 		= {x:0, y:0};

		/* Mouvements */
		this.velocity = {x:0, y:0};

		/* Caracteristiques */
		this.speed      = 8;
		this.hit 		= true;
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
			//if(!this.target.isDisp) this.kill();
		}
		this.pos.x -= this.velocity.x*this.speed;
		this.pos.y -= this.velocity.y*this.speed;

		this.outOfScreen();
	}

	render(){
		if(this.isDisp){
			this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
			this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);	
		}
	}

	defineTarget(){
		if (this.team==1){
			let A = 0;
			let B = 0;
			let dist = rightBound*3;
			let result = 0;
			let distMin = dist;
			for (var i = 0; i < game.elements.enemy.length; i++) {
				let enemy = game.elements.enemy[i];
				if(game.elements.enemy[i].isDisp){
					A = enemy.pos.x - this.pos.x;
					B = enemy.pos.y - this.pos.y;
					dist = Math.sqrt(A*A+B*B);
					result = i;
					distMin = dist;
					break;
				}
			}
			for (let i = 1; i < game.elements.enemy.length; i++) {
				let enemy = game.elements.enemy[i];
				if(enemy.isDisp){
					A = enemy.pos.x - this.pos.x;
					B = enemy.pos.y - this.pos.y;
					dist = Math.sqrt(A*A+B*B);
					if(dist<distMin){
						distMin = dist;
						result = i;
					}
				}
				
			}
			this.target = game.elements.enemy[result];
		}
	}

	outOfScreen(){
		if (this.pos.x<leftBound*1.2) 	this.kill();
		if (this.pos.x>rightBound*1.2) 	this.kill();
		if (this.pos.y>topBound*1.2) 	this.kill();
		if (this.pos.y<bottomBound*1.2) this.kill();
	}

	collide(element){
		if(element.team != this.team){
			element.life -= this.damage; 
		}
		this.kill();
	}

	kill(){
		this.isDisp = false;
	    scene.remove( this.obj );
	}

	spawn(pos, angle, damage, team){
		/* Initialisation de la Bullet */
		this.damage = damage;
		this.team 	= team;
		/* Position */
		this.pos	= pos;
		this.angle  = angle;

		if (this.team==1){
			this.velocity = {x:0, y:0};
			this.speed = 15;
		}else{
			this.velocity = {x:Math.cos(this.angle.z), y:Math.sin(this.angle.z)};
			this.speed = 8;
		}
		this.init();
		this.isDisp= true;
		this.hit = true;
	}
}