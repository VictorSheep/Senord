class Factory{
	constructor(pos, time_max, angle, size, nbTMax){
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= size;

		/* Caracteristiques */
		this.time 			= time_max;
		this.time_max		= time_max;
		this.nbT 			= 0;
		this.nbTMax 		= nbTMax;

		/* Modelisation */
		this.geometry 		= new THREE.BoxGeometry( this.size.width, this.size.height, this.size.depth );
		this.material 		= new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} );
		this.obj	  		= new THREE.Mesh( this.geometry, this.material );
		this.timeGeometry 	= new THREE.BoxGeometry( this.size.width*1.5, 5, 1 );
		this.timeMaterial 	= new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		this.timeBarre		= new THREE.Mesh( this.timeGeometry, this.timeMaterial );

		/* init */
		this.init();
	}

	/* Methodes */
	init(){
		scene.add(this.obj);
		scene.add(this.timeBarre);
		this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);
		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
		this.timeBarre.position.set(this.pos.x,this.pos.y,100);
		this.timeBarre.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
	update(){
		//diminution de la barre de vie
		this.timeBarre.scale.x=this.time/this.time_max;
		this.generateTurret();
	}
	render(){
		this.timeBarre.position.set(this.pos.x,this.pos.y+this.size.width/1.5,this.pos.z);

		this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);
	}
	generateTurret(){
		if (this.nbT<this.nbTMax) {
			if (this.time<=0) {
				for (let i = 0; i < game.elements.turret.length; i++) {
					let turret = game.elements.turret[i];
					if (!turret.isDisp) {
						let pos = {
							x:this.pos.x-this.size.width+this.nbT*30,
							y:this.pos.y-this.size.height,
							z:0
						}
						let time_max = 700;
						let angle = {x:0,y:0,z:0};
						let size = {radius:10,width:20,height:30};
						turret.spawn(pos,time_max,angle,size);
						this.nbT++;
						break;
					};
				};
				this.time=this.time_max;
			}else{
				this.time--;
			}
		};
	}
}