var game={
	scores	:0,
	elements:{
		player	:[],
		enemy	:[],
		turret	:[],
		bullet	:[]
	},
	
	init(){
		//this.elements.player.push( new Player({x:0,y:0},100,{x:90,y:90,z:0},{width:100,height:100,depth:100},10) );

		let pos = {x:10, y:10, z:0};
		let size = {x:160, y:160, z:10};
		let angle = {x:0, y:0, z:0};
		this.elements.enemy.push( new Enemy(pos, size, angle, 100) );

		console.log(this.elements);
		for (var prop in this.elements){
			/* update de chaque player */
			for (var i = this.elements[prop].length - 1; i >= 0; i--) {
				this.elements[prop][i].init();
			}
		}
	},
	
	update(){
		for (var prop in this.elements){
			/* update de chaque player */
			for (var i = this.elements[prop].length - 1; i >= 0; i--) {
				console.log(this.elements[prop]);
				this.elements[prop][i].update();
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