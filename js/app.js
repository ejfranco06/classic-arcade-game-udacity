const allEnemies = [];
// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    const move = this.speed * dt;
    this.x += move;

    if (this.x > 500) {
      this.x = -100;
    }

  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }

  update() {

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    if (key === 'left' && this.x !== 0) {
      this.x -= 101;
    }

    if (key === 'right' && this.x !== 404) {
      this.x += 101;
    }

    if (key === 'up' && this.y !== -20) {
      this.y -= 83;
    }

    if (key === 'down' && this.y !== 395) {
      this.y += 83;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 63, 200);
const enemy2 = new Enemy(101, 146, 150);
const enemy3 = new Enemy(80, 229, 130);


allEnemies.push(enemy1, enemy2, enemy3);


const player = new Player(202, 395);


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
