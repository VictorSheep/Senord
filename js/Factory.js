class Factory{
	constructor(pos, time_max, angle, size, nbTMax){
		/* Position */
		this.pos		= pos;
		this.angle      = angle;
		this.size		= size;
		this.nbTMax		= nbTMax;

		/* Caracteristiques */
		this.time 			= time_max;
		this.time_max		= time_max;
		this.nbT 			= 0;

		/* Modelisation */
		this.geometry 		= loader.model3D.factory.geometry;
		this.material 		= loader.model3D.factory.material;
		this.obj	  		= new THREE.Mesh( this.geometry, this.material );
		this.timeGeometry 	= new THREE.BoxGeometry( this.size.width*3, 5, 10 );
		this.timeMaterial 	= new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		this.timeBarre		= new THREE.Mesh( this.timeGeometry, this.timeMaterial );

		/* Spawn Turret */
		this.turretSpawnRadius = 90;
		this.timeTurretActive = 700;

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
		this.timeBarre.position.set(this.pos.x,this.pos.y+this.size.width*1.7,this.pos.z);

		this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);

		this.obj.scale.set(this.size.width,this.size.height,this.size.depht);
	}
	generateTurret(){
		if (game.getNbIsDisp("turret")<this.nbTMax) {
			if (this.time<=0) {
				for (let i = 0; i < game.elements.turret.length; i++) {
					let turret = game.elements.turret[i];
					if (!turret.isDisp) {
						let pos = {
							x:Math.cos(this.nbT/(Math.PI/1.6))*this.turretSpawnRadius,
							y:Math.sin(this.nbT/(Math.PI/1.6))*this.turretSpawnRadius,
							z:0
						}
						let angle = {x:0,y:0,z:0};
						let size = {radius:10,width:20,height:30};
						turret.spawn(pos,this.timeTurretActive,angle,size);
						this.nbT++;
						break;
					};
				};
				this.time=this.time_max;
			}else{
				this.time--;
			}
		}
	}
}