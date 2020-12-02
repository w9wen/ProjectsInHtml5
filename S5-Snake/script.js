$(document).ready(function () {
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = canvas.width();
  var h = canvas.height();
  var cw = 15;
  var d = "right";
  var food;
  var score;
  var speed = 130;

  // Snake Array
  var snake_array;

  // Initializer
  function init() {
    create_snake();
    create_food();
    score = 0;

    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, speed);
  }

  init(); // Run Initializer

  // Create Snake
  function create_snake() {
    var length = 5;
    snake_array = [];
    for (let index = length - 1; index >= 0; index--) {
      snake_array.push({ x: index, y: 0 });
    }
  }

  function create_food() {
    food = {
      x: Math.round((Math.random() * (w - cw)) / cw),
      y: Math.round((Math.random() * (h - cw)) / cw),
    };
  }
});
