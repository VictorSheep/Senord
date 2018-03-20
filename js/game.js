var game={
	scores	:0,
	elements:{
		player	:[],
		enemy	:[],
		turret	:[],
		bullet	:[],
		factory :[],
		particle:[]
	},
	nbEnemy:0,
	nbTurret:0,
	round:1,
	score:0,
	endGame:false,
	cube:{},
	init(){
		//création de l'instance du player
		this.elements.player.push( new Player({x:0,y:100,z:0},100,{x:0,y:0,z:0},{width:32,height:12,depth:10},1) );
		//création de l'instance de l'usine
		this.elements.factory.push( new Factory({x:0,y:0,z:0},500,{x:0,y:0,z:0},{width:50,height:50,depth:10}, 10));
		//Pool de projectilles
		for (let i = 0; i < 200; i++) {
			this.elements.bullet.push( new Bullet() );
		}
		//Pool de tourelles
		for (let i = 0; i < this.elements.factory[0].nbTMax; i++) {
			this.elements.turret.push( new Turret() );
		}

		// for (let i = 50; i > 0; i--) {
		// 	this.elements.enemy.push( new Enemy() );
		// }

		for (var i = 0; i < 20; i++) {
			this.elements.particle.push( new Particle() )
		}

		var light = new THREE.AmbientLight( 0xffffff ); // soft white light
		scene.add( light );

		this.spawnEnemy(3);

		var geometry = new THREE.BoxGeometry( 100, 100, 100 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		this.cube = new THREE.Mesh( geometry, material );
		scene.add( this.cube );
		this.cube.position.y -= 100;
		self = this;
		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
					var percentComplete = xhr.loaded / xhr.total * 100;
					console.log( Math.round(percentComplete, 2) + '% downloaded' );
				}
			};
			var onError = function ( xhr ) { };
			THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
			var mtlLoader = new THREE.MTLLoader();
			mtlLoader.setPath( 'assets/obj/textures/' );
			mtlLoader.load( 'gemini.mtl', function( materials ) {
				materials.preload();
				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials( materials );
				objLoader.setPath( 'assets/obj/source/' );
				objLoader.load( 'gemini.obj', function ( object ) {

					console.log(self.cube)

					self.cube.geometry = object.children[0].geometry;
					self.cube.geometry.scale(70, 70 , 70);
					self.cube.geometry.rotateX(Math.PI/2) ;
					self.cube.geometry.rotateZ(-Math.PI/2) ;
					self.cube.material = object.children[0].material;
			}, onProgress, onError );
		});

	},
	update(){
		//affichage du score
		$(".score span").html(this.score);
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

    	//vérifie la défaite
    	if (this.endGame) {
    		window.location.replace("./gameOver.html");
    	}
    	this.nbEnemy = this.getNbIsDisp("enemy");
    	if (this.nbEnemy<=0){
    		this.score+=100*this.round;
    		this.round++;
    		this.spawnEnemy(2+this.round*2);
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
	getNbIsDisp(element){
		let result = 0;
		switch(element){
			case "enemy":
				for (var i = 0; i < this.elements.enemy.length; i++) {
					if (this.elements.enemy[i].isDisp) result++;
				}
			break;
			case "turret":
				for (var i = 0; i < this.elements.turret.length; i++) {
					if (this.elements.turret[i].isDisp) result++;
				}
			break;
			case "factory":
				for (var i = 0; i < this.elements.factory.length; i++) {
					if (this.elements.factory[i].isDisp) result++;
				}
			break;
			default:
			break;
		}
		return result;
	},
	spawnEnemy(nb){
		for (let i = 0; i < nb; i++) {
			for (let j = 0; j < this.elements.enemy.length; j++) {
				if(!this.elements.enemy[j].isDisp){
					let pos = {x:0, y:0, z:0};

					pos.x = chance(50)? leftBound : rightBound;
					pos.y = chance(50)? topBound : bottomBound;

					let size = {x:30, y:15, z:10};
					let angle = {x:0, y:0, z:0};
					this.elements.enemy[j].spawn(pos, size, angle, 100, 100);
					break;
				}
			}
		}
	},
	collide(){
		for (let i = 0; i < this.elements.bullet.length; i++) {
			let bullet = this.elements.bullet[i];
			if(bullet.isDisp){
				let circle1 = {radius: bullet.hitbox, x: bullet.pos.x, y: bullet.pos.y};

				if (bullet.team == 1) {
					for (let j = 0; j < this.elements.enemy.length; j++) {
						let target = this.elements.enemy[j];
						let circle2 = {radius:target.hitbox, x: target.pos.x, y: target.pos.y};

						let dx = circle1.x - circle2.x;
						let dy = circle1.y - circle2.y;
						let distance = Math.sqrt(dx * dx + dy * dy);

						if (distance < circle1.radius + circle2.radius) {
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
}