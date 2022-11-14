const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let start = { start: false };

function nextSequence() {
  userClickedPattern = [];

  $("h1").text(`level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`.${currentColour}`).addClass("pressed");

  setTimeout(() => {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    new Audio("sounds/wrong.mp3").play();
    $(document.body).addClass("game-over");
    setTimeout(() => {
      $(document.body).removeClass("game-over");
    }, 200);

    $("h1").text("Salah tolol!");
    $(".hint-message").text(`you should click: ${gamePattern.join("-")}`)
    $("button").text("Ulang")
    setTimeout(() => {
      $(".hint-message").fadeOut(100)
    }, 5000)
    startOver();
    $("button").fadeIn(200)
    start.start = false
  }
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}

  $(".btn").click(function (e) {
    e.stopPropagation()
    let userChosenColour = this.id;
    console.log('clicked')
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length - 1);
  });


if (!start.start) {
  $(document).keydown((event) => {
    if (event.key === "a") {
      start.start = true;
      if (start.start) {
        nextSequence();
      } else {
        return
      }
    } else {
      return;
    }
  });
}

  $("button").click(() => {
    start.start = true;
    nextSequence();
    $("button").fadeOut(200)
    $(".tutor").fadeOut(200)
  });

setInterval(() => {
    console.log(start.start)
}, 1000)
