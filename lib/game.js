(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Game = A.Game = function () {
    ctx.drawImage(Game.BACKGROUND, 0, 0, 1000, 1000);
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new A.Ship({pos: this.randomPosition(), game: this});
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 1000;
  Game.NUM_ASTEROIDS = 10;
  Game.BACKGROUND = new Image(Game.DIM_X, Game.DIM_Y);
  Game.BACKGROUND.src = 'images/background.png';

  Game.prototype.addAsteroids = function () {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
      this.addObject(new A.Asteroid({game: this, pos: this.randomPosition()}));
    }
  };

  Game.prototype.addObject = function (obj) {
    if(obj instanceof A.Asteroid) {
      this.asteroids.push(obj);
    } else if(obj instanceof A.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.randomPosition = function () {
    var pos = [];
    pos.push(Math.floor(Math.random() * Game.DIM_X));
    pos.push(Math.floor(Math.random() * Game.DIM_Y));
    return pos;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(Game.BACKGROUND, 0, 0, 1000, 1000);
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for(var i = 0; i < this.allObjects().length; i++){
      this.allObjects()[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    if(pos[0] > Game.DIM_X){
      pos[0] -= Game.DIM_X;
    } else if(pos[0] < 0) {
      pos[0] += Game.DIM_X;
    }
    if(pos[1] > Game.DIM_Y){
      pos[1] -= Game.DIM_Y;
    } else if(pos[1] < 0) {
      pos[1] += Game.DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function () {
    for(var i = 0; i < this.allObjects().length; i++){
      for(var j = 0; j < this.allObjects().length; j++){
        if(i !== j && this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (obj) {
    if(obj instanceof A.Asteroid){
      var idx = this.asteroids.indexOf(obj);
      this.asteroids = this.asteroids.slice(0, idx).concat(this.asteroids.slice(idx + 1));
    } else if(obj instanceof A.Bullet) {
      var idx = this.bullets.indexOf(obj);
      this.bullets = this.bullets.slice(0, idx).concat(this.bullets.slice(idx + 1));
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  };
})();
