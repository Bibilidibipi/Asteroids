(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var MovingObject = A.MovingObject = function (params) {
    this.game = params.game;
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.xSpan = params.xSpan;
    this.ySpan = params.ySpan;
    this.color = params.color;
    this.image = params.image;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.pos[0], this.pos[1], 30, 30);
  };

  MovingObject.prototype.outOfBounds = function () {
    if(
      this.pos[0] > this.game.DIM_X ||
      this.pos[0] < 0 ||
      this.pos[1] > this.game.DIM_Y ||
      this.pos[1] < 0
    ) {return true;}
    return false;
  };

  MovingObject.prototype.move = function () {
    this.pos = A.Util.addVectors(this.pos, this.vel);
    this.game.wrap(this.pos);
  };

  MovingObject.prototype.distanceFrom = function (otherObject) {
    return Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
                      Math.pow((this.pos[1] - otherObject.pos[1]), 2));
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    if(this.radius && otherObject.radius) {
      return (this.distanceFrom(otherObject) <= this.radius + otherObject.radius);
    } else if(this.radius) {
      if(
        (Math.abs(this.pos[0] - otherObject.pos[0]) <= (this.radius * 2 + otherObject.xSpan) / 2) &&
        (Math.abs(this.pos[1] - otherObject.pos[1]) <= (this.radius * 2 + otherObject.ySpan) / 2)
      ) {return true;}
      return false;
    } else if(otherObject.radius) {
      if(
        (Math.abs(this.pos[0] - otherObject.pos[0]) <= (this.xSpan + otherObject.radius * 2) / 2) &&
        (Math.abs(this.pos[1] - otherObject.pos[1]) <= (this.ySpan + otherObject.radius * 2) / 2)
      ) {return true;}
      return false;
    } else {
      if(
        (Math.abs(this.pos[0] - otherObject.pos[0]) <= (this.xSpan + otherObject.xSpan) / 2) &&
        (Math.abs(this.pos[1] - otherObject.pos[1]) <= (this.ySpan + otherObject.ySpan) / 2)
      ) {return true;}
      return false;
    }
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };
})();
