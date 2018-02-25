// scoreboard for the number of runs to the water
let score = 0;
document.querySelector('.score').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(x, y, speed, lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x; //between 0 and 400
    this.y = y; //lane1: 60, lane2: 140, lane3: 230
    this.speed = speed;
    this.lane = lane;

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

    //@description: movement from left to right:
    this.x += this.speed *dt * 100;
    if (this.x >= 510) {     //enemy is outside of visible area
      this.x = -100;         //enemy enters visible area from the left again
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//@description: colission with player
Enemy.prototype.collision = function() {
  setInterval (() => {
    if (this.x >= playerPostionXMin && this.x <= playerPostionXMax
      && this.lane == currentLane) {  //if collision with player happens
        player.y = 400;             //places player back on square one
        player.x = 200;
        currentLane = 0;
        playerPostionX = 200;
        playerPostionXMin= 120;
        playerPostionXMax = 280;
        score -= 1;               //decrease the score
        document.querySelector('.score').innerHTML = score; //update score
        let number = document.querySelector('.score');
        number.classList.add('minus');        //animate score
        document.querySelector('.message').innerHTML = 'Ouch!'; // change message
        document.querySelector('.message').style.color = 'red'; //change message color
        document.querySelector('.message').style.visibility = 'visible'; //display message
        setTimeout(function(){
          number.classList.remove('minus');   //remove class for next animation
          document.querySelector('.message').style.visibility = 'hidden'; //hide message
          document.querySelector('.message').style.color = 'green'; //change message color
          document.querySelector('.message').innerHTML = 'yeah!'; //change message text
        }, 500);
      }
  }, 100);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

 //@description ES6 player class
class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  };

  update(direction) {
    switch(direction) {
      case 'up':
        this.y -= 85;     //if player reaches the water
        this.defineLane(this.y);
        if (this.y <= -25) {
          this.scorePoint();
        }

        break;
      case 'down':
        this.y += 85;
        this.defineLane(this.y);
        if (this.y >= 400) {
          this.y = 400;       //limits area where player can go
        }
        break;
      case 'left':
        this.x -= 100;
        playerPostionX = this.x;
        playerPostionXMin = playerPostionX - 80;
        playerPostionXMax = playerPostionX + 80;
        if (this.x <= 0) {
          this.x = 0;       //limits area where player can go
        }
        break;
      case 'right':
        this.x += 100;
        playerPostionX = this.x;
        playerPostionXMin = playerPostionX - 80;
        playerPostionXMax = playerPostionX + 80;
        if (this.x >= 400) {
          this.x = 400;       //limits area where player can go
        }
        break;
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput(key) {
    switch(key) {
      case 'up':
        this.update('up');
        break;
      case 'down':
        this.update('down');
        break;
      case 'left':
        this.update('left');
        break;
      case 'right':
        this.update('right');
        break;
    }
  };

  //@description define which lane player is on (to compare with enemies)
  defineLane(y) {
    switch(y) {
      case 400:
        currentLane = 0;
        break;
      case 315:
        currentLane = 0;
        break;
      case 230:
        currentLane = 1;
        break;
      case 145:
        currentLane = 2;
        break;
      case 60:
        currentLane = 3;
        break;
    }
  };

  //@description things to happen when player reaches the water
  scorePoint() {
    score += 1;   //increase the score
    currentLane = 0;
    document.querySelector('.score').innerHTML = score; //update increased score
    document.querySelector('.message').style.visibility = 'visible'; //show message
    setTimeout (() => {
      this.y = 400;     //set player back on bottom row
    }, 200);
    let number = document.querySelector('.score');
    number.classList.add('plus');        //animate score
    setTimeout(function(){
      number.classList.remove('plus');   //remove class for next animation
      document.querySelector('.message').style.visibility = 'hidden'; //hide message
    }, 500);
  };
}

// Now instantiate your objects.
//note: y-values: lane 3 = 60, lane 2 = 140, lane 1 = 230
let enemy1 = new Enemy(0, 60, 1, 3);
let enemy2 = new Enemy(200, 60, 1, 3);
let enemy3 = new Enemy(250, 60, 2, 3);
let enemy4 = new Enemy(100, 140, 4, 2);
let enemy5 = new Enemy(40, 140, 1, 2);
let enemy6 = new Enemy(50, 230, 2, 1);
let enemy7 = new Enemy(10, 230, 1, 1);

// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

// Place the player object in a variable called player
let player = new Player(200, 400);

let currentLane = 0;          // plyer's current lane
let playerPostionX = 200;
let playerPostionXMin = 120;  // XMin & XMax define range for collision
let playerPostionXMax = 280;

//activate collision function for all enemies:
enemy1.collision();
enemy2.collision();
enemy3.collision();
enemy4.collision();
enemy5.collision();
enemy6.collision();
enemy7.collision();


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
