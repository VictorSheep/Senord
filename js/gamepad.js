//Les inputs
let inputsGamepad = {
	gamepadOne : function() {

		let states = {
			PICK 	   : false,
			LAUNCH 	   : false,
			PAUSE      : false,
			JOYPAD_X   : 0,
			JOYPAD_Y   : 0
		};
		let gp = navigator.getGamepads()[0];
		if (!gp)
			return states;

		for (let i = 0; i < gp.buttons.length; i++) {
			switch (i) {
				case 0:
					if(!states.PICK) states.PICK = gp.buttons[0].pressed;
				break;

				case 2:
					if(!states.LAUNCH) states.LAUNCH  = gp.buttons[2].pressed;
				break;

				case 4:
					if(!states.PICK) states.PICK = gp.buttons[4].pressed;
				break;

				case 5:
					if(!states.LAUNCH) states.LAUNCH = gp.buttons[5].pressed;
				break;

				case 6:
					if(!states.PICK) states.PICK = gp.buttons[6].pressed;
				break;

				case 7 :
					if(!states.LAUNCH) states.LAUNCH = gp.buttons[7].pressed;
				break;

				case 9:
					states.PAUSE = gp.buttons[9].pressed;
				break;
			}
		}
		states.JOYPAD_X = gp.axes[0];
		states.JOYPAD_Y = gp.axes[1];

		return states;
	}
}
function canGame() {
	return "getGamepads" in navigator;
}