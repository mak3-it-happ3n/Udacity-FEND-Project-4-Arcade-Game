// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x; //between 0 and 400
    this.y = y; //lane1: 60, lane2: 140, lane3: 230
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // my note: movement only from left to right, so only increase x:
    this.x += this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

 // My own version in ES6:
class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  };

  update(direction) {
    switch(direction) {
      case 'up':
        this.y -= 85;
        break;
      case 'down':
        this.y += 85;
        break;
      case 'left':
        this.x -= 100;
        break;
      case 'right':
        this.x += 100;
        break;
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput(key) {
    switch(key) {
      case 'up':
        console.log('up was pressed');
        this.update('up');
        break;
      case 'down':
        console.log('down was pressed');
        this.update('down');
        break;
      case 'left':
        console.log('left was pressed');
        this.update('left');
        break;
      case 'right':
        console.log('right was pressed');
        this.update('right');
        break;

    }
    console.log(key);
  };
}

// Now instantiate your objects.
let enemy1 = new Enemy(0, 60, 2);
let enemy2 = new Enemy(100, 140, 1);
let enemy3 = new Enemy(50, 230, 3);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
let player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
