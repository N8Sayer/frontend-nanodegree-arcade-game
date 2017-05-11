// Enemies our player must avoid
var Enemy = function(x,y,speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x >= 505) {
    this.x = -101;
  }
  this.x += this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x,y) {
  this.sprite = 'images/char-horn-girl.png';
  this.x = x;
  this.y = y;
  this.deaths = 0;
  this.wins = 0;
};

Player.prototype.update = function (dt) {

};

Player.prototype.collision = function (x,y) {
  // All the objects are the same width, but I only want to check for a 75 height
  // to avoid collisions with invisible hitboxes.
  var width = 75,
      height = 75;

      allEnemies.forEach(function(enemy) {
        // if collision detected:
        if (x < enemy.x + width &&
            x + width > enemy.x &&
            y < enemy.y + height &&
            height + y > enemy.y) {
              // reset coordinates, and increment death counter
              this.x = 205;
              this.y = 415;
              this.deaths++;
            }
      }, this);
};

Player.prototype.render = function () {
  //Checks for collisions before drawing the next frame
  this.collision(this.x,this.y);

  //Draws the next frame
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  // The logical bounds for the player icon are x(3-407),y(63-415),
  // so I placed everything within the switch case to reduce code.
  switch (key) {
    case 'left':
      if (this.x - 101 >= 3) {
        this.x -= 101;
      }
      break;
    case 'up':
      if (this.y == 63) {
        this.y = 415;
        this.wins++;
      }
      else {
        this.y -= 88;
      }
      break;
    case 'right':
      if (this.x + 101 <= 407) {
        this.x += 101;
      }
      break;
    case 'down':
      if (this.y + 88 <= 415) {
        this.y += 88;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Wrote this function to generate all of the enemies.
var generator = function (difficulty) {
  var random = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // difficulty = # of enemies. This number is fed from the selector on the screen.
  // I wanted a more random generation so I made a seed
  // pool using startingX and startingY.
  var startingX = [-303,-202,-101],
      startingY = [60,145,230],
      enemies = [];

  // enemies are generated with a random X position, but are evenly divided between
  // the three rows, and are given a random speed from 1-10.
  for (var x = 1; x <= difficulty; x++) {
    if (x % 3 === 0) {
      enemies.push(new Enemy(startingX[random(0,2)],startingY[0],random(1,8)));
    }
    else if (x % 3 == 1) {
      enemies.push(new Enemy(startingX[random(0,2)],startingY[1],random(1,8)));
    }
    else {
      enemies.push(new Enemy(startingX[random(0,2)],startingY[2],random(1,8)));
    }
  }
  return enemies;
};
var difficulty = 3;
var allEnemies = generator(difficulty);

var player = new Player(205,415);

// This listens for key presses and sends the keys to your
// player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('input', function(evt) {
  window.difficulty = evt.target.value;
  window.allEnemies = generator(difficulty);
});
