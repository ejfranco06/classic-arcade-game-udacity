const allEnemies = []; //Holds all enemies
const replayButton = document.getElementsByClassName('play-again-btn')[0]; //Replay button
let isGameOver = false; //Is the game over


/**
 * Class representing an enemy
 */
class Enemy {
  /**
   * Create a new enemy at a specified location
   * @param x X coordinate
   * @param y Y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.DEFAULT_SPEED = 200;
    this.speed = this.randomSpeed();
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.moveAcross(dt);
    if (this.checkCollision()) {
      player.hit();
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
   * Move across the screen
   * @param dt Change in time
   */
  moveAcross(dt) {
    const move = this.speed * dt;
    this.x += move;

    if (this.x > 500) {
      this.changeSpeed()
      this.x = -100;
    }
  }

  /**
   * Detect collision between enemy and player
   * @returns {boolean} True if their is a collision false otherwise
   */
  checkCollision() {
    return this._sameRow() && this._isWithinHitbox();
  }

  /**
   * Change enemy speed to a new random speed
   */
  changeSpeed() {
    this.speed = this.randomSpeed();
  }

  /**
   * A random speed between half and double the default speed
   * @returns {number} A new speed
   */
  randomSpeed() {
    const multiplier = Math.random() * (2 - .5) + .5;
    return this.DEFAULT_SPEED * multiplier;
  }

  /**
   * Private method to determine enemy hitbox
   * @returns {boolean} True if player collides with enemy
   * @private
   */
  _isWithinHitbox() {
    const leftHitBox = player.x - 65;
    const rightHitBox = player.x + 65;
    return this.x > leftHitBox && this.x < rightHitBox;
  }

  /**
   * private method to check if player is on the same row as enemy
   * @returns {boolean} True if they are on the same row and false otherwise
   * @private
   */
  _sameRow() {
    return this.y === player.y;
  }

}



/**
 * Class representing the player
 */
class Player {
  /**
   * Create a new player
   */
  constructor() {
    this.STARTING_X = 202;
    this.STARTING_Y = 395;
    this.X_STEP = 101;
    this.Y_STEP = 83;
    this.points = 0;
    this.lives = 3;
    this.x = this.STARTING_X;
    this.y = this.STARTING_Y;
    this.sprite = 'images/char-boy.png';
  }

  /**
   * update player location and points
   */
  update() {
    if (this._reachedWater()) {
      this._scorePoints();
    }

  }

  /**
   * Render image of player
   */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
   * Handle player movement
   * @param key A directional key from the keyboard
   */
  handleInput(key) {
    const boundary = {
      left: 0,
      right: 404,
      up: -20,
      down: 395,
    };

    switch (key) {
      case 'left':
        if (this.x !== boundary[key]) {
          this.x -= this.X_STEP;
        }
        break;

      case 'right':
        if (this.x !== boundary[key]) {
          this.x += this.X_STEP;
        }
        break;

      case 'up':
        if (this.y !== boundary[key]) {
          this.y -= this.Y_STEP;
        }
        break;

      case 'down':
        if (this.y !== boundary[key]) {
          this.y += this.Y_STEP;
        }
        break;
    }
  }


  /**
   * Reduce player lives
   */
  decreaseLives() {
    this.lives--;
  }

  /**
   * Player score points for crossing
   * @private
   */
  _scorePoints() {
    this._increasePoints();
    this.resetPosition();
  }

  /**
   * Increase points
   * @private
   */
  _increasePoints() {
    this.points += 25;
  }

  /**
   * Check if player reached water
   * @returns {boolean} True if player crossed false if otherwise
   * @private
   */
  _reachedWater() {
    return this.y === -20;
  }

  /**
   * Reset player to starting location
   */
  resetPosition() {
    this.x = this.STARTING_X;
    this.y = this.STARTING_Y;
  }

  /**
   * Reset player to a new game
   */
  resetPlayer() {
    this.points = 0;
    this.lives = 3;
    this.resetPosition();
  }

  /**
   * Player was hit by an enemy
   */
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

/**
 * Update game panel information
 */
function panelUpdate() {
  const scoreEl = document.getElementsByClassName('score')[0];
  const liveEl = document.getElementsByClassName('lives')[0];
  const heartIcon = '❤';
  const lives = player.lives;

  let hearts = '';
  for (let i = 0; i < lives; i++) {
    hearts += heartIcon;
  }

  scoreEl.innerHTML = player.points;
  liveEl.innerHTML = hearts;
}

/**
 * Show game over modal
 */
function gameOverModal() {
  const modalEl = document.getElementsByClassName('modal-container')[0];
  const scoreEl = document.getElementsByClassName('final-score')[0];

  scoreEl.innerHTML = `Final Score: ${player.points}`;
  modalEl.classList.toggle('show-modal');

}

/**
 * Check if player no longer has lives(game over)
 */
function checkGameOver() {
  if (player.lives === 0) {
    isGameOver = true;
    gameOverModal();
  }
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
