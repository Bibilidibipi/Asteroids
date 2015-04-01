(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var Asteroid = A.Asteroid = function (params) {
    var allParams =
      {
        game: params.game,
        pos: params.pos,
        vel: A.Util.randomVec(Asteroid.SPEED),
        image: Asteroid.IMAGE,
        xSpan: Asteroid.XSPAN,
        ySpan: Asteroid.YSPAN
      };

    A.MovingObject.call(this, allParams);
  };

  A.Util.inherits(Asteroid, A.MovingObject);

  Asteroid.SPEED = 3.2;
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = 'images/asteroid.jpg';
  Asteroid.XSPAN = 60;
  Asteroid.YSPAN = 60;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof A.Ship){
      otherObject.relocate();
    }
  };
})();
