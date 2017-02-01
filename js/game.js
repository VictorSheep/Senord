var game={
	scores	:0,
	elements:{
		player	:[],
		enemy	:[],
		turret	:[],
		bullet	:[]
	},

	init(){
		this.elements.player.push( new Player({x:0,y:0,z:0},100,{x:0,y:0,z:0},{width:70,height:40,depth:100},0.7) );

		let pos = {x:-600, y:300, z:0};
		let size = {x:60, y:30, z:10};
		let angle = {x:0, y:0, z:0};
		this.elements.enemy.push( new Enemy(pos, size, angle, 100) );

		this.elements.turret.push( new Turret({x:0,y:0,z:0}, 100, {x:0,y:0,z:0}, {radius:20,width:20,height:30}) );
		this.elements.turret.push( new Turret({x:100,y:0,z:0}, 100, {x:0,y:0,z:0}, {radius:20,width:20,height:30}) );
		this.elements.turret.push( new Turret({x:0,y:100,z:0}, 100, {x:0,y:0,z:0}, {radius:20,width:20,height:30}) );
	},

	update(){
		player=this.elements.player[0];
		for (var prop in this.elements){
			/* update de chaque player */
			for (var i = this.elements[prop].length - 1; i >= 0; i--) {
				this.elements[prop][i].update(player.pos);
			}
		}
		/* gestion des inputs*/
    	/* isDown */
		if (inputs.isDown(inputs.UP)) player.moveUp();
    	if (inputs.isDown(inputs.LEFT)) player.moveLeft();
    	if (inputs.isDown(inputs.DOWN)) player.moveDown();
    	if (inputs.isDown(inputs.RIGHT)) player.moveRight();

    	if (inputs.isDown(inputs.ACTION)){
    		for (var i = 0; i < this.elements.turret.length; i++) {
    			turret=this.elements.turret[i];
    			// pick up turret 
    			if (!turret.picked && !turret.activate) {
    				// calcul de distance entre turret et player
	    			turret.dist.x = player.pos.x-turret.pos.x;
					turret.dist.y = player.pos.y-turret.pos.y;
					turret.dist.dir = Math.sqrt(turret.dist.x*turret.dist.x + turret.dist.y*turret.dist.y);
					//si la tourrelle est suffisament pret on active ça methode pickUp
					if (turret.dist.dir<player.size.width) {
						turret.pickUp();
					};
				}
			};
    	};
    	if (inputs.isDown(inputs.C)){
    		for (var i = 0; i < this.elements.turret.length; i++) {
    			turret=this.elements.turret[i];
    			// launch turret 
				if (turret.picked){
    				turret.launch();
    			};
    		}
    	}
	},

	render(){
		for (var prop in this.elements){
			/* update de chaque player */
			for (var i = this.elements[prop].length - 1; i >= 0; i--) {
				this.elements[prop][i].render();
			}
		}
	}
}