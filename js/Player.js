class Player{
	constructor(pos, life_max, angle, size, speed){
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= size;

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:0};		
		this.velocity	= {x:0, y:0, z:0};

		/* Caracteristiques */
		this.life 			= life_max;
		this.life_max		= life_max;
		this.speed      	= speed;

		/* Modelisation */
		this.geometry 		= new THREE.BoxGeometry( this.size.width, this.size.height, this.size.depth );
		this.material 		= new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe:true} );
		this.obj	  		= new THREE.Mesh( this.geometry, this.material );
		this.lifeGeometry 	= new THREE.BoxGeometry( this.life/2, 5, 1 );
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
		if (this.pos.x+this.velocity.x>=left_bound+this.size.height && this.pos.x+this.velocity.x<=right_bound-this.size.height) {
			this.pos.x+=this.velocity.x;
		};
		if (this.pos.y+this.velocity.y>=bottom_bound+this.size.height*3 && this.pos.y+this.velocity.y<=top_bound-this.size.height) {
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
		this.lifeBarre.scale.x=this.life/100;
	}
	render(){
		this.lifeBarre.position.set(this.pos.x,this.pos.y,this.pos.z);

		this.lifeBarre.rotation.set(this.angle.x,this.angle.y,Math.PI);

		this.obj.position.set(this.pos.x,this.pos.y-this.size.height*2,this.pos.z);

		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
}