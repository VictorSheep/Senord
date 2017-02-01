class Turret{
	constructor(pos, time_max, angle, size){
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= size;
		this.dist		= {x:0,y:0,z:0};

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:0};		

		/* Caracteristiques */
		this.team		= 1;
		this.time 		= time_max;
		this.time_max	= time_max;
		this.activate   = false;
		this.picked     = false;
		this.damage 	= 10;
		/* Munition */
		this.count 		= 0;
		this.rate		= Math.random()*10+60;

		/* Modelisation */
		this.geometry 	= new THREE.SphereGeometry( this.size.radius, this.size.width, this.size.heigth );
		this.material 	= new THREE.MeshBasicMaterial( {color: 0x00ffff} );
		this.obj	  	= new THREE.Mesh( this.geometry, this.material );

		this.init();
	}

	/* Methodes */
	init(){
		scene.add(this.obj);
		this.obj.position.set(this.pos.x,this.pos.y,0);
		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}

	update(player_pos){
		this.angle.x+=this.rotation.x;
		this.angle.y+=this.rotation.y;
		this.angle.z+=this.rotation.z;	
		if (this.picked) {
			this.pos=player_pos;
		}else{
			this.pos=this.obj.position;
		}

		
		this.count++;
		this.count = (this.count>=1000/this.rate)? 0 : this.count;
		// Tire
		if(this.count==0){
			this.shoot();			
		}
	}
	render(){
		this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);

		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
	pickUp(){
		this.picked=true;
		this.activate=false;
	}
	launch(){
		this.picked=false;
		this.activate=true;
	}
	shoot(){
		let pos = Object.assign({},this.pos);
		let angle = Object.assign({},this.angle);
		game.elements.bullet.push(new Bullet(pos, angle, this.damage, this.team));
	}
}