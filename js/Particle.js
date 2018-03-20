class Particle{
	constructor(){
		/* Position */
		this.pos		= {
			x:Math.random()*window.innerWidth - rightBound,
			y:Math.random()*window.innerHeight - topBound,
			z:Math.random()*(-50)};
		this.angle      = {x:0,y:0,z:0};
		this.size		= {
			radius:Math.random()+1,
			width:Math.random()+1,
			height:Math.random()+1};
		this.dist		= {x:0,y:0,z:0};

		/* Mouvements */
		this.velocity	= {x:0, y:0, z:0};
		this.init();
	}

	/* Methodes */
	init(){
		/* Modelisation */
		/* la tourelle */
		this.geometry 			= new THREE.SphereGeometry( this.size.radius, this.size.width, this.size.heigth );
		this.material 			= new THREE.MeshBasicMaterial( {color: 0xefefef} );
		this.obj	  			= new THREE.Mesh( this.geometry, this.material );

		this.obj.position.set(this.pos.x,this.pos.y,0);
		scene.add(this.obj);
	}

	update(player_pos){
		this.velocity.x += (Math.random()*2-1)/500;
		this.velocity.y += (Math.random()*2-1)/500;
		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;
	}
	render(){
		this.obj.position.set(this.pos.x,this.pos.y,this.pos.z);
		this.obj.rotation.set(this.angle.x,this.angle.y,this.angle.z);
	}
}