var game={
	scores	:0,
	elements:{
		player	:[],
		enemy	:[],
		turret	:[],
		bullet	:[],
		factory :[],
	},

	init(){
		//création de l'instance du player
		this.elements.player.push( new Player({x:0,y:100,z:0},100,{x:0,y:0,z:0},{width:32,height:12,depth:10},1) );
		//création de l'instance de l'usine
		this.elements.factory.push( new Factory({x:0,y:0,z:0},500,{x:0,y:0,z:0},{width:50,height:50,depth:10},10) );
		//Pool de projectilles
		for (let i = 0; i < 200; i++) {
			this.elements.bullet.push( new Bullet() );
		}
		//Pool de tourelles
		for (let i = 0; i < this.elements.factory[0].nbTMax; i++) {
			this.elements.turret.push( new Turret() );
		}

		for (let i = 50; i > 0; i--) {
			this.elements.enemy.push( new Enemy() );
		}

		for (let i = 0; i < 17; i++) {
			for (let j = 0; j < this.elements.enemy.length; j++) {
				if(!this.elements.enemy[j].isDisp){
					let pos = {x:Math.random()*1200-600, y:Math.random()*600-300, z:0};
					let size = {x:30, y:15, z:10};
					let angle = {x:0, y:0, z:0};
					this.elements.enemy[j].spawn(pos, size, angle, 100);
					break;
				}
			}
		}

		//this.elements.turret[0].spawn({x:-200,y:100,z:0}, 700, {x:0,y:0,z:0}, {radius:10,width:20,height:30});
		//this.elements.turret[1].spawn({x:100,y:200,z:0}, 700, {x:0,y:0,z:0}, {radius:10,width:20,height:30});
		//this.elements.turret[2].spawn({x:100,y:-100,z:0}, 700, {x:0,y:0,z:0}, {radius:10,width:20,height:30});
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
    		inputs._pressed[inputs.ACTION]=false;
    		for (var i = 0; i < this.elements.turret.length; i++) {
    			let turret=this.elements.turret[i];
    			// pick up turret 
    			if (!turret.picked && !turret.activate) {
    				// calcul de distance entre turret et player
	    			turret.dist.x = player.pos.x-turret.pos.x;
					turret.dist.y = player.pos.y-turret.pos.y;
					turret.dist.dir = Math.sqrt(turret.dist.x*turret.dist.x + turret.dist.y*turret.dist.y);
					//si la tourrelle est suffisament pret on active ça methode pickUp
					if (turret.dist.dir<player.size.width*1.5) {
						turret.pickUp();
					};
				}
			};
    	};
    	if (inputs.isDown(inputs.E)){
    		inputs._pressed[inputs.E]=false;
    		for (var i = 0; i < this.elements.turret.length; i++) {
    			let turret=this.elements.turret[i];
    			// launch turret 
				if (turret.picked){
					let isLaunchable = true;
					for (var j = 0; j < this.elements.turret.length; j++) {
						// calcul de distance entre la tourelle a poser et toute celle qui sont poser
						let turret2=this.elements.turret[j];
						if (!turret2.picked) {
	    					turret.dist.x = turret2.pos.x-turret.pos.x;
							turret.dist.y = turret2.pos.y-turret.pos.y;
							turret.dist.dir = Math.sqrt(turret.dist.x*turret.dist.x + turret.dist.y*turret.dist.y);
							if (turret.dist.dir<=turret.size.radius*2) isLaunchable=false;
						}
					}
					if (isLaunchable) {
    					turret.launch();
    				};
    				break;
    			};
    		}
    	}
    	this.collide();
	},

	render(){
		for (var prop in this.elements){
			/* update de chaque player */
			for (var i = this.elements[prop].length - 1; i >= 0; i--) {
				this.elements[prop][i].render();
			}
		}
	},

	collide(){
		for (let i = 0; i < this.elements.bullet.length; i++) {
			let bullet = this.elements.bullet[i];
			let circle1 = {radius: bullet.hitbox, x: bullet.pos.x, y: bullet.pos.y};

			if (bullet.team == 1) {
				for (let j = 0; j < this.elements.enemy.length; j++) {
					let target = this.elements.enemy[j];
					let circle2 = {radius:target.hitbox, x: target.pos.x, y: target.pos.y};

					let dx = circle1.x - circle2.x;
					let dy = circle1.y - circle2.y;
					let distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < circle1.radius + circle2.radius && bullet.hit) {
						bullet.hit=false;
					    bullet.collide(target);
					}
				}
			}else{
				let target = this.elements.player[0];
				let circle2 = {radius:target.hitbox, x: target.pos.x, y: target.pos.y};

				let dx = circle1.x - circle2.x;
				let dy = circle1.y - circle2.y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < circle1.radius + circle2.radius && bullet.hit) {
					bullet.hit=false;
				    bullet.collide(target);
				}
			}
				

				
		}
	}
}