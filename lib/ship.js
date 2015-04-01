(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Ship = A.Ship = function (params) {
    var allParams = {
        game: params.game,
        pos: params.pos,
        vel: [0, 0],
        image: Ship.IMAGE,
        xSpan: Ship.XSPAN,
        ySpan: Ship.YSPAN
    };

    A.MovingObject.call(this, allParams);
  };

  A.Util.inherits(Ship, A.MovingObject);

  Ship.IMAGE = new Image();
  Ship.IMAGE.src = 'images/ship.png';
  Ship.XSPAN = 40;
  Ship.YSPAN = 40;


  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel = A.Util.addVectors(this.vel, impulse);
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new A.Bullet({
      game: this.game,
      pos: this.pos,
      dir: A.Util.normalize(this.vel),
      boost: A.Util.length(this.vel)
    });

    this.game.addObject(bullet);
  };
})();
