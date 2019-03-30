// Player / Viewport
var player = document.getElementById("player");
var context = player.getContext("2d");
var playArea = document.getElementById("field");
player.style.width = "100%";
player.style.height= "100%";
player.width  = player.offsetWidth;
player.height = player.offsetHeight;

// Username Input
var startButton = document.getElementById("start");
var userName = document.getElementById("nick");

// Model
var currSize = 13;

function updateChara(name, size) {
    // Text
    context.font = "14px Trebuchet MS";
    context.textAlign = "center";
    context.textBaseLine = "middle";

    // Create Circle
    context.beginPath();
    context.arc(player.width / 2, player.height / 2, size, 0, 2 * Math.PI);
    context.fillStyle = "#b5ff5d";
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "#4ac555";
    context.stroke();
    context.closePath();

    // Adds Username in center of circle
    context.fillStyle = "black";
    context.fillText(name, player.width / 2, player.height / 2);
}

// Control
startButton.addEventListener("click", function(){
    updateChara(userName.value, currSize);
    userName.value = "";
    startButton.disabled = true;
});