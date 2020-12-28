var score = 0; //// Set score to 0
var total = 5; //// Total number of questions
var point = 1; //// Points per correct answer.
var highest = total * point;

//// Initializer
function init() {
  //// Set correct answers.
  sessionStorage.setItem("a1", "b");
  sessionStorage.setItem("a2", "d");
  sessionStorage.setItem("a3", "c");
  sessionStorage.setItem("a4", "a");
  sessionStorage.setItem("a5", "b");
}

$(document).ready(function () {
  //   init();
  //// Hide all question.
  $(".questionForm").hide();

  //// Show first question
  $("#q1").show();

  $("#q1 #submit").click(function () {
    $(".questionForm").hide();
    $("#q2").fadeIn(300);
    return false;
  });

  $("#q2 #submit").click(function () {
    $(".questionForm").hide();
    $("#q3").fadeIn(300);
    return false;
  });

  $("#q3 #submit").click(function () {
    $(".questionForm").hide();
    $("#q4").fadeIn(300);
    return false;
  });

  $("#q4 #submit").click(function () {
    $(".questionForm").hide();
    $("#q5").fadeIn(300);
    return false;
  });

  $("#q5 #submit").click(function () {
    $(".questionForm").hide();
    $("#result").fadeIn(300);
    return false;
  });
});

//// Add event listener
window.addEventListener("load", init, false);
