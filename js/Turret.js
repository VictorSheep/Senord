class Turret{
	constructor(){
		/* Position */
		this.pos		= {x:0,y:0,z:0};
		this.angle      = {x:0,y:0,z:0};
		this.size		= {radius:0,width:0,height:0};
		this.dist		= {x:0,y:0,z:0};

		/* Mouvements */
		this.rotation	= {x:0, y:0, z:0};		

		/* Caracteristiques */
		this.team		= 1;
		this.time 		= 0;
		this.time_max	= 0;
		this.activate   = false;
		this.picked     = false;
		this.damage 	= 10;
		this.range	 	= 300;
		this.isDisp 	= false;

		/* Munition */
		this.count 		= 0;
		this.rate		= Math.random()*10+60;

	}

	/* Methodes */
	init(){
		/* Modelisation */
		/* la tourelle */
		this.geometry 			= new THREE.SphereGeometry( this.size.radius, this.size.width, this.size.heigth );
		this.material 			= new THREE.MeshBasicMaterial( {color: 0x00ffff} );
		this.obj	  			= new THREE.Mesh( this.geometry, this.material );
		/* la range */
		this.rangeRingGeometry 	= new THREE.RingGeometry( this.range, this.range+2, 32 );
		this.rangeRingMaterial 	= new THREE.MeshBasicMaterial( {color: 0x00ffff,transparent:true,opacity:0.3} );
		this.rangeRing			= new THREE.Mesh( this.rangeRingGeometry, this.rangeRingMaterial );
		/* le temps restant */
		this.timeGeometry 		= new THREE.RingGeometry( this.size.radius+5, this.size.radius+10, 32 );
		this.timeMaterial 		= new THREE.MeshBasicMaterial( {color: 0x00ff00,transparent:true,opacity:0.6} );
		this.timeBarre	  	    = new THREE.Mesh( this.timeGeometry, this.timeMaterial );

		this.timeBarre.position.set(this.pos.x,this.pos.y,100);
		this.obj.position.set(this.pos.x,this.pos.y,0);
		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
		scene.add(this.obj);
	}

	update(player_pos){
		if (this.isDisp) {
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
				if (enemy.isDisp) {
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

			//check the time
			if (this.activate) {
				this.time-=1;
				this.timeBarre.geometry= new THREE.RingGeometry( this.size.radius+5, this.size.radius+10, 32, 8,Math.PI, this.time/this.time_max*(2*Math.PI) );
				if (this.time<=0) {
					this.kill();
					this.activate=false;
				}
			}
		}
	}
	render(){
		if (this.isDisp) {
			this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);

			this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
		}
	}
	kill(){
		this.isDisp = false;
	    scene.remove( this.obj );
	    scene.remove( this.rangeRing );
	    scene.remove( this.timeBarre );
	}
	pickUp(){
		this.picked=true;
		this.activate=false;
	}
	launch(){
		this.picked=false;
		this.activate=true;
		this.rangeRing.position.set(this.pos.x,this.pos.y,this.pos.z);
		this.timeBarre.position.set(this.pos.x,this.pos.y,this.pos.z);
		scene.add(this.rangeRing); 
		scene.add(this.timeBarre); 
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
	spawn(pos, time_max, angle, size){
		/* Initialisation de la Turret */
		this.time_max = time_max;
		this.time = this.time_max
		this.size 	= size;
		/* Position */
		this.pos	= pos;
		this.angle  = angle;
		this.init();
		this.isDisp = true;
	}
}