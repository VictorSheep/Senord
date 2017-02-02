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
		this.range	 	= 300;

		/* Munition */
		this.count 		= 0;
		this.rate		= Math.random()*10+60;

		/* Modelisation */
		this.geometry 	= new THREE.SphereGeometry( this.size.radius, this.size.width, this.size.heigth );
		this.material 	= new THREE.MeshBasicMaterial( {color: 0x00ffff} );
		this.obj	  	= new THREE.Mesh( this.geometry, this.material );
		this.rangeRingGeometry 	= new THREE.RingGeometry( this.range, this.range+2, 32 );
		this.rangeRingMaterial 	= new THREE.MeshBasicMaterial( {color: 0x00ffff,transparent:true,opacity:0.3} );
		this.rangeRing	= new THREE.Mesh( this.rangeRingGeometry, this.rangeRingMaterial );

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

		//check the range
		for (var i = 0; i < game.elements.enemy.length; i++) {
			let enemy=game.elements.enemy[i];
			this.dist.x = enemy.pos.x-this.pos.x;
			this.dist.y = enemy.pos.y-this.pos.y;
			this.dist.dir = Math.sqrt(this.dist.x*this.dist.x + this.dist.y*this.dist.y);
			// Tire
			if(this.count==0 && this.activate && this.dist.dir<=this.range){
				this.shoot();	
				break;		
			}
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
		this.rangeRing.position.set(this.pos.x,this.pos.y,this.pos.z);
		scene.add(this.rangeRing); 
	}
	shoot(){
		let pos = Object.assign({},this.pos);
		let angle = Object.assign({},this.angle);
		for (var i = 0; i < game.elements.bullet.length; i++) {
			if(!game.elements.bullet[i].isDisp){
				game.elements.bullet[i].spawn(pos, angle, this.damage, this.team);
				break;
			}
		}
	}
}