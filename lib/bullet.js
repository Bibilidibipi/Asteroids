(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Bullet = A.Bullet = function (params) {
    var allParams = {
      game: params.game,
      pos: params.pos,
      vel: A.Util.multiplyVector(params.dir, Bullet.SPEED + params.boost),
      radius: Bullet.RADIUS,
      color: Bullet.COLOR,
      image: Bullet.IMAGE
    };

    A.MovingObject.call(this, allParams);
  };

  A.Util.inherits(Bullet, A.MovingObject);

  Bullet.SPEED = 6;
  Bullet.RADIUS = 4;
  Bullet.COLOR = "black";
  Bullet.IMAGE = new Image();
  Bullet.IMAGE.src = 'images/bullet.png';

  Bullet.prototype.draw = function (ctx) {
    ctx.beginPath();

    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
    ctx.fill();

    ctx.closePath();
  };

  Bullet.prototype.move = function (){
    this.pos = A.Util.addVectors(this.pos, this.vel);
    if(this.outOfBounds()) {
      this.game.remove(this);
    }
  };

  Bullet.prototype.collideWith = function (otherObject) {
    this.game.remove(otherObject);
  };
})();
