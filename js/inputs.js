let inputs = {
    _pressed: {},

    LEFT: 81,
    UP: 90,
    RIGHT: 68,
    DOWN: 83,
    ACTION: 32,
    E: 69,
    
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
    
    onKeyDown: function(event) {
        this._pressed[event.keyCode] = true;
    },
    
    onKeyUp: function(event) {
        delete this._pressed[event.keyCode];

    }
};

window.addEventListener('keyup', function(event) { inputs.onKeyUp(event); }, false);
window.addEventListener('keydown', function(event) { inputs.onKeyDown(event); }, false);