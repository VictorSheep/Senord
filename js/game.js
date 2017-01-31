var game={
	scores	:0,
	elements:{
		player	:[],
		enemy	:[],
		turret	:[],
		bullet	:[]
	},

	init(){
		this.elements.player.push( new Player({x:0,y:0,z:0},100,{x:90,y:90,z:0},{width:100,height:100,depth:100},10) );

		let pos = {x:-600, y:300, z:0};
		let size = {x:60, y:30, z:10};
		let angle = {x:0, y:0, z:0};
		this.elements.enemy.push( new Enemy(pos, size, angle, 100) );
	},

	update(){
		for (var prop in this.elements){
			/* update de chaque player */
			for (var i = this.elements[prop].length - 1; i >= 0; i--) {
				this.elements[prop][i].update(this.elements.player[0].pos);
			}
		}

		/* gestion des inputs*/
		if (inputs.isDown(inputs.UP)) console.log("up");
    	if (inputs.isDown(inputs.LEFT)) console.log("LEFT");
    	if (inputs.isDown(inputs.DOWN)) console.log("DOWN");
    	if (inputs.isDown(inputs.RIGHT)) console.log("RIGHT");
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