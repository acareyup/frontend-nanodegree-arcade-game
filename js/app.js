// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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
    this.x = this.x + (this.speed * dt);
    if (this.x > 600) {
        this.x = 0;
    }
    return this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function (dt) {
    this.checkCollisions();
    // this.level();
    // this.score();
    // this.gameOwn();
}

//determine the game boundaries
Player.prototype.checkBoundary = function () {
    //x axis boundary
    if (this.x < 0){
        this.x = 0;
    }
    if (this.x > 450){
        this.x = 400;
    }
    //y axis boundary
    if (this.y < 0){
        this.y = -10;
    }
    if (this.y > 420){
        this.y = 415;
    }
}

//render player image
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//determine position change on 4-axis
Player.prototype.handleInput = function (input) {
    switch (input) {
        case "left":
            this.x -= 100;
            break;
        case "right":
            this.x += 100;
            break;
        case "up":
            this.y -= 85;
            break;
        case "down":
            this.y += 85;
            break;
    }
}

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 415;
}

//player-enemy collision check
Player.prototype.checkCollisions = function () {
    if ((player.x > (enemy3.x - 80)) && (player.x < (enemy3.x + 80)) && player.y === enemy3.y){
        this.reset();
    }
    if ((player.x > (enemy2.x - 80)) && (player.x < (enemy2.x + 80)) && player.y === enemy2.y+10) {
        this.reset();
    }
    if ((player.x > (enemy1.x - 80)) && (player.x < (enemy1.x + 80)) && player.y === enemy1.y+5) {
        this.reset();
    }
}


// Now instantiate your objects.
const allEnemies =[];
const enemy1 = new Enemy(0, 70, 100);
const enemy2 = new Enemy(0, 150, 200);
const enemy3 = new Enemy(0, 245, 300);

// Place all enemy objects in an array called allEnemies
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player
const player = new Player(200, 415);


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
    player.checkBoundary();
});
