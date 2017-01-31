class Player{
	constructor(pos, life_max, angle, size, speed){
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= size;

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:0};		
		this.velocity	= {x:0, y:0};

		/* Caracteristiques */
		this.life 		= life_max;
		this.life_max	= life_max;
		this.speed      = speed;

		/* Modelisation */
		this.geometry 	= new THREE.BoxGeometry( this.size.width, this.size.height, this.size.depth );
		this.material 	= new THREE.MeshBasicMaterial( {color: 0x0000ff} );
		this.obj	  	= new THREE.Mesh( this.geometry, this.material );
	}

	/* Methodes */
	moveLeft(){
		this.velocity.x=this.speed*-1;
	}
	moveRight(){
		this.velocity.x=this.speed;
	}
	moveUp(){
		this.velocity.y=this.speed;
	}
	moveDown(){
		this.velocity.y=this.speed*-1;
	}
	init(scene){
		scene.add(this.obj);
		this.obj.position.set(this.pos.x,this.pos.y,0);
		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
	update(){
		this.pos.x+=this.velocity.x;
		this.pos.y+=yhis.velocity.y;

		this.angle.x+=this.rotation.x;
		this.angle.y+=yhis.rotation.y;
		this.angle.z+=yhis.rotation.z;
	}
	render(){
		this.obj.position.set(this.pos.x,this.pos.y);

		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
}