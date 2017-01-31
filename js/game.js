var game={
	scores	:0,
	elements:{
		player	:[],
		enemy	:[],
		turret	:[],
		bullet	:[]
	},

	init(){
		this.elements.player.push( new Player({x:0,y:0,z:0},100,{x:0,y:0,z:0},{width:100,height:100,depth:100},1) );

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
    	/* isDown */
		if (inputs.isDown(inputs.UP)) this.elements.player[0].moveUp();
    	if (inputs.isDown(inputs.LEFT)) this.elements.player[0].moveLeft();
    	if (inputs.isDown(inputs.DOWN)) this.elements.player[0].moveDown();
    	if (inputs.isDown(inputs.RIGHT)) this.elements.player[0].moveRight();
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