const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0

function nextSequence() {
    userClickedPattern = []

    $("h1").text(`level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $( `#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
    level++
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()

}

function animatePress(currentColour) {
    $(`.${currentColour}`).addClass("pressed")

    setTimeout(() => {
        $(`.${currentColour}`).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
   } else {
    new Audio("sounds/wrong.mp3").play()
    $(document.body).addClass("game-over")
    setTimeout(() => {
        $(document.body).removeClass("game-over")
    }, 200)

    $("h1").text("Salah tolol!, pencet A buat Restart")
    startOver()
   }
}

function startOver() {
    userClickedPattern = []
    gamePattern = []
    level = 0
}


$('.btn').click( function() {
    let userChosenColour = this.id;
    
    userClickedPattern.push(userChosenColour)
    playSound(this.id)
    animatePress(this.id)
    checkAnswer(userClickedPattern.length-1)
})

$(document).keydown((event) => {
    if (event.key === "a") {
        nextSequence()
    } else {
        return
    }
})