var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var correctUpto = 0;
var justended = 0;
jQuery(document).ready(function($) {
  // Click anywhere to start the game
  $(document).click(function() {
    if (gamePattern.length === 0 && justended != 1) {
      console.log("Initialising game");
      let randomChosenColour = buttonColours[buttonPicker()];
      addButtonSequence(randomChosenColour);
      flashButton(randomChosenColour, 0);
      $("#level-title").text("Level " + correctUpto);
    }
    if(justended === 1) {
      justended = 0;
    }
  })

  $("#green").click(new CreateButtonHandler("green"));
  $("#yellow").click(new CreateButtonHandler("yellow"));
  $("#blue").click(new CreateButtonHandler("blue"));
  $("#red").click(new CreateButtonHandler("red"));
})

function CreateButtonHandler(buttonColour) {
  function checkPatternAccuracy() {
    if(gamePattern.length === 0) return;
    flashButton(buttonColour, 0);
    if (gamePattern[correctUpto] === buttonColour) {
      correctUpto++;
      $("#level-title").text("Level " + correctUpto);
    } else {
      let a = new Audio("sounds/wrong.mp3");
      a.play();
      correctUpto = 0;
      gamePattern.length = 0;
      $("#level-title").text("Click Anywhere to Start");
      justended = 1;
      return;
    }

    if (correctUpto >= gamePattern.length) {
      let randomChosenColour = buttonColours[buttonPicker()];
      addButtonSequence(randomChosenColour);
      flashButton(randomChosenColour, 800);
      correctUpto = 0;
    }
  }
  return checkPatternAccuracy;
}

function buttonPicker() {
  return Math.floor(Math.random() * 4);
}

function flashButton(buttonColour, withDelay) {
  if (buttonColour === "green" ||
    buttonColour === "red" ||
    buttonColour === "yellow" ||
    buttonColour === "blue") {
    jQuery(document).ready(function($) {
      setTimeout(function() {
        let a = new Audio("sounds/"+buttonColour+".mp3");
        a.play();
        $("#" + buttonColour).toggleClass("pressed");
        setTimeout(function() {
          $("#" + buttonColour).toggleClass("pressed");
        }, 200);
      }, withDelay);
    });
  }
}

function addButtonSequence(buttonColour) {
  if (buttonColour === "green" || buttonColour === "red" ||
    buttonColour === "yellow" || buttonColour === "blue") {
    gamePattern.push(buttonColour);
  }
}
