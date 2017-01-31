var game={
	scores	:0,
	elements:{
		player	:[],
		enemy	:[],
		turret	:[],
		bullet	:[]
	},
	
	init(){
		this.player.push( new Player({x:0,y:0},100,{x:90,y:90,z:0},{width:100,height:100,depth:100},10) );
	},
	
	update(){
		for (var prop in this.elements){
			/* update de chaque player */
			for (var i = this.elements[prop].length - 1; i >= 0; i--) {
				this.elements[prop][i].update();
			}
		}
		
	}
}