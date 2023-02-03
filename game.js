

const buttonColours = ["red", "blue", "green", "yellow"];
// Create a new empty array with the name gamePattern.
const gamePattern = [];
// Create a new empty array with the name userClickedPattern.
var userClickedPattern = [];
// Create a new variable called started and set it to false.
var started = false;
// Create a new variable called level and start at level 0.
var level = 0;
// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});
// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
// Create a new function called nextSequence()
// Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
// Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
// Add the new randomChosenColour generated in step 2 to the end of the gamePattern.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
// Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// Create a new function called startOver().
// Inside this function, you'll need to reset the values of level, gamePattern and started variables.
// Call startOver() if the user gets the sequence wrong.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}