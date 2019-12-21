var colors = ["red", "yellow", "green", "blue"];
var gamePattern;
var gameOver = true;
var clickCount = 0;
var level = 0;

$("div.btn").on("click", function() {

    let color = $(this).attr("id");
    $(this).animate({opacity:0.2}, 100, () => {
        $(this).animate({opacity:1});
    });
    //$(this).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);    
    fireAnimations(color);

    checkUserSequence(++clickCount, $(this).attr("id"));
});

$(document).keypress(event => {
    if(event.key === "a" || event.key === "A"){
        if(gameOver){
            startGame();
        }
    }
})



function checkUserSequence(clickNumber, color){
    if(clickNumber <= gamePattern.length && gamePattern[clickNumber - 1] === color)
    {
        gameOver = false;
        if(gamePattern.length == clickNumber)
        {
            setTimeout(() => {
                nextColor();
            }, 1000);
        }
    }
    else
    {
        gameOver = true;
    }

    if(gameOver){
        var score = `Score :${gamePattern.length - 1 ? gamePattern.length - 1 : 0}`;
        $('#score').show().text(score);
        $('#level-title').text(`Game Over, Press the A Key to Restart.`);
        playSound('wrong');
    }
}

function fireAnimations(currentColor){
    let buttonIdentifier = "div.btn." + currentColor;
    $(buttonIdentifier).addClass("pressed");
    setTimeout(() => {
        $(buttonIdentifier).removeClass("pressed");
    }, 100);
}

function nextColor(){
    clickCount = 0;

    let newColor = colors[nextSequence()];
    gamePattern.push(newColor);   
    
    $('#level-title').text(`Level ${gamePattern.length}`);

    playSound(newColor);
    fireAnimations(newColor);
}

function startGame(){
    clickCount = 0;
    $('#score').hide();
    gameOver = !gameOver;
    gamePattern = new Array();
   
    nextColor()
    
    userTurn = true;    
}

function playSound(buttonPressed){
    var audio = new Audio();
    audio.src = './sounds/' + buttonPressed + '.mp3';
    audio.play();
}

nextSequence = () => Math.floor(Math.random() * 4);