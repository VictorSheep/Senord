class Enemy {
  constructor(pos, size, angle, life_max) {
    /* Caracteristiques */
    this.life_max 	= life_max;
    this.life		= life_max;

  	/* Position objet */
    this.pos 		= pos;
    this.size		= size;
    this.angle		= angle;

    /* Mouvements */
    this.rotation	= {x:0, y:0, z:0};
    this.speed		= {x:0, y:0};

    this.init();
  }

  init(){
    this.geometry = new THREE.BoxGeometry( this.size.x, this.size.y, this.size.z );
	this.material = new THREE.MeshBasicMaterial( {color: 0xEF4444} );
  	this.obj = new THREE.Mesh( this.geometry, this.material );
	this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
	this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
	scene.add( this.obj );
  }

  update(){

  }

  render(){
  }
}