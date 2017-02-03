let leftBound = window.innerWidth/-2;
let rightBound = window.innerWidth/2;
let topBound = window.innerHeight/2;
let bottomBound = window.innerHeight/-2;

function abs(nb){
	if (nb<0) return -nb;
	return nb;
}

/**
 * chance
 * @param  {int} 	nb : entier de 0 à 100
 * @return {bool}
 */
function chance(nb){
	if(Math.round(Math.random()*100)<nb){
		return true;
	}else{
		return false;
	}
}