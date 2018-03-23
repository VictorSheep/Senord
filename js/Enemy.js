class Enemy {
	constructor(Object3D) {
		/* Caracteristiques */
		this.isDisp 	= false;
		this.team		= 2;
		this.life_max 	= 0;
		this.life		= 0;
		this.damage		= 10;
		this.range		= 100;
		this.hitbox		= 0;
		this.scoreGiven = 100;

		/* Position objet */
		this.pos 		= {x:0,y:0};
		this.size		= {x:0,y:0,z:0};
		this.angle		= {x:0,y:0,z:0};
		this.dist		= {x:0,y:0,z:0};

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:0};
		this.velocity	= {x:1, y:0};
		this.adjVlocity	= {x:Math.random()*2-1, y:Math.random()*2-1};
		this.speed 		= 0;
		this.adjSpeed	= Math.random()*2+1;

		/* Munition */
		this.count 		= 0;
		this.rate		= Math.random()*10+25;
	}

	spawn(pos, size, angle, life_max, scoreGiven){
		this.life_max 	= life_max;
		this.life		= life_max;
		this.pos 		= pos;
		this.size		= size;
		this.angle		= angle;
		this.hitbox 	= size.y;
		this.scoreGiven = scoreGiven;
		this.init();
		this.isDisp = true;
	}

	init(){
		this.geometry = loader.model3D.enemy.geometry;
		this.material = loader.model3D.enemy.material;
		this.obj = new THREE.Mesh( this.geometry, this.material );
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
		scene.add( this.obj );
	}

	update(player){
		if (this.isDisp) {
			this.count++;
			this.count = (this.count>=1000/this.rate)? 0 : this.count;

			this.dist.x = player.x-this.pos.x;
			this.dist.y = player.y-this.pos.y;
			this.dist.dir = Math.sqrt(this.dist.x*this.dist.x + this.dist.y*this.dist.y);
			/* Mise à jour des positions */
			this.velocity.x += (this.dist.x)/(800*this.adjSpeed) + this.adjVlocity.x/10 + Math.random()-.5;
			this.velocity.y += (this.dist.y)/(800*this.adjSpeed) + this.adjVlocity.y/10 + Math.random()-.5;
			if(this.adjSpeed<2){
				this.velocity.x = this.velocity.x/1.04;
				this.velocity.y = this.velocity.y/1.04;
			}else{
				this.velocity.x = this.velocity.x/1.02;
				this.velocity.y = this.velocity.y/1.02;
			}

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

			if(this.life<=0){
				this.kill();
			}
		}
	}

	render(){
		if (this.isDisp) {
			this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
			this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);	
			this.obj.scale.set(30,30,30);	
		}
	}

	shoot(){
		let pos = Object.assign({},this.pos);
		let angle = Object.assign({},this.angle);
		angle.z += (Math.random()*.6-.3)*((player.velocity.y+player.velocity.x)/3);
		for (var i = 0; i < game.elements.bullet.length; i++) {
			if(!game.elements.bullet[i].isDisp){
				game.elements.bullet[i].spawn(pos, angle, this.damage, this.team);
				break;
			}
		}
	}

	kill(){
		this.isDisp = false;
	    scene.remove( this.obj );
	    game.score+=this.scoreGiven;
	}
}