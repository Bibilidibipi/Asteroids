(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Bullet = A.Bullet = function (params) {
    var allParams = {
      game: params.game,
      pos: params.pos,
      vel: A.Util.multiplyVector(params.dir, Bullet.SPEED),
      radius: Bullet.RADIUS,
      color: Bullet.COLOR
    };

    A.MovingObject.call(this, allParams);
  };

  A.Util.inherits(Bullet, A.MovingObject);

  Bullet.SPEED = 6;
  Bullet.RADIUS = 4;
  Bullet.COLOR = "black";

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
