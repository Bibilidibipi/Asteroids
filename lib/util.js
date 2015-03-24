(function(){
  var A = window.Asteroids = window.Asteroids || {};

  A.Util = {};

  A.Util.inherits = function (child, parent) {
    function Surrogate(){}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  A.Util.randomVec = function (length) {
    var angle = 2 * Math.PI * Math.random();
    var vector = [];
    vector.push(length * Math.cos(angle));
    vector.push(length * Math.sin(angle));
    return vector;
  };

  A.Util.addVectors = function (vec1, vec2) {
    var newVec = [];
    for(var i = 0; i < vec1.length; i++){
      newVec.push(vec1[i] + vec2[i]);
    }

    return newVec;
  };

  A.Util.normalize = function (vec) {
    var length = Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
    return A.Util.multiplyVector(vec, (1/length));
  };

  A.Util.multiplyVector = function (vec, scalar) {
    var newVec = [];
    for(var i = 0; i < vec.length; i++){
      newVec.push(vec[i] * scalar);
    }

    return newVec;
  };
})();
