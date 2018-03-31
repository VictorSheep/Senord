class Player{
	constructor(pos, life_max, angle, size, speed){
		/* Position */
		this.pos			= pos;
		this.angle      	= angle;
		this.size			= size;

		/* Mouvements */
		this.rotation		= {x:0, y:0, z:0};
		this.velocity		= {x:0, y:0, z:0};

		/* Caracteristiques */
		this.life 			= life_max;
		this.life_max		= life_max;
		this.speed      	= speed;
		this.hitbox			= this.size.height;
		this.canLaunch      = true;

		/* Modelisation */
		this.geometry 		= loader.model3D.player.geometry;
		this.material 		= loader.model3D.player.material;
		this.obj	  		= new THREE.Mesh( this.geometry, this.material );

		/* Life Barre Modelisation */
		this.lifeGeometry 	= new THREE.BoxGeometry( 70, 5, 1 );
		this.lifeMaterial 	= new THREE.MeshBasicMaterial( {color: 0xff0000} );
		this.lifeBarre		= new THREE.Mesh( this.lifeGeometry, this.lifeMaterial );

		/* init */
		this.init();
	}

	/* Methodes */
	moveLeft(){
		this.velocity.x+=this.speed*-1;
	}
	moveRight(){
		this.velocity.x+=this.speed;
	}
	moveUp(){
		this.velocity.y+=this.speed;
	}
	moveDown(){
		this.velocity.y+=this.speed*-1;
	}
	gamepadMoveX(joystickXSpeed){
		this.velocity.x+=this.speed*joystickXSpeed;
	}
	gamepadMoveY(joystickYSpeed){
		this.velocity.y-=this.speed*joystickYSpeed;
	}

	init(){
		scene.add(this.obj);
		scene.add(this.lifeBarre);
		this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);
		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
		this.lifeBarre.position.set(this.pos.x,this.pos.y,100);
		this.lifeBarre.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
	update(){
		//boundaries
		if (this.pos.x+this.velocity.x>=leftBound+this.size.height && this.pos.x+this.velocity.x<=rightBound-this.size.height) {
			this.pos.x+=this.velocity.x;
		};
		if (this.pos.y+this.velocity.y>=bottomBound+this.size.height*3 && this.pos.y+this.velocity.y<=topBound-this.size.height) {
			this.pos.y+=this.velocity.y;
		}

		this.angle.x+=this.rotation.x;
		this.angle.y+=this.rotation.y;

		// Direction du "regard" du vaisseau
		if (this.velocity.x!=0) this.angle.z = Math.atan(this.velocity.y/this.velocity.x);
		if (this.velocity.x<0) this.angle.z += Math.PI;

		this.velocity.x=this.velocity.x/1.08;
		this.velocity.y=this.velocity.y/1.08;

		//diminution de la barre de vie
		this.lifeBarre.scale.x=this.life/this.life_max;

		if (this.life<=0){
			this.kill();
		}
	}
	render(){
		this.lifeBarre.position.set(this.pos.x,this.pos.y-this.size.width*1.5,this.pos.z);

		this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);

		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);

		this.obj.scale.set(50,50,50);
	}
	kill(){
		scene.remove(this.obj);
		scene.remove(this.lifeBarre);
		game.endGame=true;
	}
}