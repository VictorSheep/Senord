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
		this.time 		= time_max;
		this.time_max	= time_max;
		this.activate   = false;
		this.picked     = false;

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
}