const allEnemies = [];

// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.defaultSpeed = 200;
    this.speed = this.randomSpeed();

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
    this.moveAcross(dt);


    if(this.checkCollision()) {
      player.hit();
    }

  }


  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  moveAcross(dt) {
    const move = this.speed * dt;
    this.x += move;

    if (this.x > 500) {
      this.changeSpeed()
      this.x = -100;
    }
  }

  checkCollision() {
    return this._sameRow() && this._isWithinHitbox();
  }

  changeSpeed() {
    this.speed = this.randomSpeed();
  }

  randomSpeed() {
    const multiplier = Math.random() *(2 - .5) + .5;

    return this.defaultSpeed * multiplier;
  }

  _isWithinHitbox() {
    const leftHitBox = player.x - 65;
    const rightHitBox = player.x + 65;
    return this.x > leftHitBox && this.x < rightHitBox;
  }

  _sameRow() {
    return this.y === player.y;
  }

}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.startingX = 202;
    this.startingY = 395;
    this.xStep = 101;
    this.yStep = 83;
    this.points = 0;
    this.lives = 3;
    this.x = this.startingX;
    this.y = this.startingY;

    this.sprite = 'images/char-boy.png';
  }

  update() {
    if(this._reachedWater()) {
      this._scorePoints();
    }

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    const boundery = {
      left: 0,
      right: 404,
      up: -20,
      down: 395,
    };

    switch (key) {
      case 'left':
        if (this.x !== boundery[key]) {
          this.x -= this.xStep;
        }
        break;

      case 'right':
        if (this.x !== boundery[key]) {
          this.x += this.xStep;
        }
        break;

      case 'up':
        if (this.y !== boundery[key]) {
          this.y -= this.yStep;
        }
        break;

      case 'down':
        if (this.y !== boundery[key]) {
          this.y += this.yStep;
        }
        break;
    }
  }

  increaseLives() {
    this.lives++;
  }

  decreaseLives() {
    this.lives--;
  }
  _scorePoints() {
    this._increasePoints();
    this.resetPosition();
  }
  _increasePoints() {
    this.points += 25;
  }
  _reachedWater() {
    return this.y === -20;
  }
  resetPosition() {
    this.x = this.startingX;
    this.y = this.startingY;
  }

  hit() {
    this.resetPosition();
    this.decreaseLives();
  }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 63);
const enemy2 = new Enemy(0, 146);
const enemy3 = new Enemy(0, 229);
const enemy4 = new Enemy(0, 229);


allEnemies.push(enemy1, enemy2, enemy3, enemy4);


const player = new Player();


function panelUpdate() {
  const scoreEl = document.getElementsByClassName('score')[0];
  const liveEl = document.getElementsByClassName('lives')[0];
  const heartIcon = '❤';
  const lives = player.lives;

  let hearts = '';
  for(let i = 0; i < lives; i++) {
    hearts += heartIcon;
  }

  scoreEl.innerHTML = player.points;
  liveEl.innerHTML = hearts;






}
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
