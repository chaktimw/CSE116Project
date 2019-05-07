//World

var createWorld = document.createElement("canvas");
createWorld.style.width = "100%";
createWorld.style.height= "100%";
createWorld.height = 3200;
createWorld.width = 3200;
createWorld.position = "absolute";
var contextWorld = createWorld.getContext("2d");
var img = new Image();
img.src = "/tiles.png";

function makeWorld() {
    for (var i = 0; i < createWorld.height / img.height; i++) {
        for (var j = 0; j < createWorld.width / img.width; j++) {
            contextWorld.drawImage(img, j * img.width, i * img.height, img.width, img.height);
        }
    }

    updateChara(players["player"].user, players["player"].size, players["player"].pos_player.x, players["player"].pos_player.y);

    requestAnimationFrame(loop);
}

var sizeRoot = 7 / 8.0;

// Players
var enemies = {};
function enemy(username, size, x, y) {
    this.username = username;
    this.eaten = size;
    this.size = 10 + Math.pow(this.eaten, sizeRoot);
    this.pos_world = {
        "x": x,
        "y": y
    };
    this.alive = true
}

function updateEnemies(listOfEnemies){
    enemies = {};
    for(var playerLine in listOfEnemies){
        var data = listOfEnemies[playerLine].split(" ");
        if(players["player"].user != data[0]) {
            enemies[data[0]] = new enemy(data[0], data[1], data[2], data[3])
        }
    }
}

var enemyField = document.createElement("canvas");
enemyField.style.width = "100%";
enemyField.style.height= "100%";
enemyField.height = 3200;
enemyField.width = 3200;
var contextEnemies = enemyField.getContext("2d");

function addEnemy(name, size, x, y){
    contextEnemies.beginPath();
    contextEnemies.arc(x, y, size, 0, 2 * Math.PI);
    contextEnemies.fillStyle = "#ffbab3";
    contextEnemies.fill();
    contextEnemies.lineWidth = 2;
    contextEnemies.strokeStyle = "#ff7069";
    contextEnemies.stroke();
    contextEnemies.closePath();

    // Adds Username in center of circle
    contextEnemies.fillStyle = "black";
    contextEnemies.fillText(name, x, y);
}

function drawEnemies(){
    contextEnemies.clearRect(0, 0, enemyField.width, enemyField.height);

    for (var unit in enemies){
        addEnemy(
            enemies[unit].username,
            enemies[unit].size,
            enemies[unit].pos_world.x,
            enemies[unit].pos_world.y
        );
    }
}

// enemies eat you
// not fully done yet
function eatPlayer(){
    for (var i in enemies){
        var dx = players["player"].pos_world.x - enemies[i].pos_world.x;
        var dy = players["player"].pos_world.y - enemies[i].pos_world.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= enemies[i].size){
            kill()
        }
    }
}


// Dots
var dots = document.createElement("canvas");
dots.style.width = "100%";
dots.style.height= "100%";
dots.height = 3200;
dots.width = 3200;
var contextDots = dots.getContext("2d");
var allDots = new Array();

function Dot(){
    this.getPos = {
        "x": Math.floor(Math.random() * 3197 + 3),
        "y": Math.floor(Math.random() * 3197 + 3)
    }
}

// Creates all Dots
function getDots(){
    while (allDots.length < 250){
        allDots.push(new Dot());
    }
}

// Create Dot
function addDot(x, y){
    contextDots.beginPath();
    contextDots.arc(x, y, 5, 0, 2 * Math.PI);
    contextDots.fillStyle = "#78c9ff";
    contextDots.fill();
    contextDots.lineWidth = 2;
    contextDots.strokeStyle = "#4998c5";
    contextDots.stroke();
    contextDots.closePath();
}

// Spawns Dots on Dot Canvas
function drawDots(){
    contextDots.clearRect(0, 0, dots.width, dots.height);

    for (var i = 0; i < allDots.length; i++){
        addDot(allDots[i].getPos.x, allDots[i].getPos.y);
    }
}


// Player / Viewport
var player = document.getElementById("player");
player.style.width = "100%";
player.style.height= "100%";
player.width  = player.offsetWidth;
player.height = player.offsetHeight;

var viewport = document.getElementById("board");
var contextViewport = viewport.getContext("2d");
viewport.style.width = "100%";
viewport.style.height = "100%";
viewport.width = viewport.offsetWidth;
viewport.height = viewport.offsetHeight;

//player ID set after game starts
//this is a huge area for cheating but whaaaatever
var currentPlayer = "";


// Model

// Player Stats
var players = {
    "player": new Player()
};

function Player(){
    this.alive = true

    this.size = 10;

    this.user = "";

    this.pos_world = {
        "x": Math.floor(Math.random() * 690 + 10),
        "y": Math.floor(Math.random() * 690 + 10)
    };

    this.pos_player = {
        "x": player.width / 2,
        "y": player.height / 2
    };

    this.speed = {
        "x": 5,
        "y": 5
    };

    //update time - chaktim
    var d = new Date();
    var n = d.getTime();
    this.time = n;
    this.gametime = n;

    // Update Location of Player
    this.update = function() {
        if (keyPressed.right && this.pos_world.x < createWorld.width - this.size) {
            this.pos_world.x += this.speed.x;
        }
        if (keyPressed.left && this.pos_world.x > this.size) {
            this.pos_world.x -= this.speed.x;
        }
        if (keyPressed.down && this.pos_world.y < createWorld.height - this.size) {
            this.pos_world.y += this.speed.y;
        }
        if (keyPressed.up && this.pos_world.y > this.size) {
            this.pos_world.y -= this.speed.y;
        }
    };

    this.eaten = 0;
}

// Username Input
var startButton = document.getElementById("start");
var userName = document.getElementById("nick");

function updateChara(name, size, x, y) {
    // Text
    contextViewport.font = "14px Trebuchet MS";
    contextViewport.textAlign = "center";
    contextViewport.textBaseLine = "middle";

    // Create Circle
    contextViewport.beginPath();
    contextViewport.arc(x, y, size, 0, 2 * Math.PI);
    contextViewport.fillStyle = "#b5ff5d";
    contextViewport.fill();
    contextViewport.lineWidth = 3;
    contextViewport.strokeStyle = "#4ac555";
    contextViewport.stroke();
    contextViewport.closePath();

    // Adds Username in center of circle
    contextViewport.fillStyle = "black";
    contextViewport.fillText(name, x, y);
}

// Eat Dots
function eatDot(){
    for (var i = 0; i < allDots.length; i++){
        var dx = players["player"].pos_world.x - allDots[i].getPos.x;
        var dy = players["player"].pos_world.y - allDots[i].getPos.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= players["player"].size){
            if ((players["player"].pos_world.x - players["player"].size <= allDots[i].getPos.x &&
                players["player"].pos_world.x + players["player"].size >= allDots[i].getPos.x) &&
                (players["player"].pos_world.y - players["player"].size <= allDots[i].getPos.y &&
                    players["player"].pos_world.y + players["player"].size >= allDots[i].getPos.y)) {
                players["player"].eaten += 1;
                players["player"].size = 10 + Math.pow(players["player"].eaten, sizeRoot);

                players["player"].speed.x = 50 / players["player"].size;
                players["player"].speed.y = 50 / players["player"].size;
                allDots.splice(i, 1);

            }
        }
    }
}

// Game Updates
function loop(){
    //timed updates
    var d = new Date();
    var n = d.getTime();
    //var timePassed2 = n - players["player"].gametime;
    //if (timePassed2 >= 10) {
        if(players["player"].alive) {
            contextViewport.clearRect(0, 0, viewport.width, viewport.height);

            players["player"].update();

            //timed updates
            var timePassed = n - players["player"].time;
            if (timePassed >= 150 && players["player"].alive) {
                //update leaderboard on players.txt
                updateUser(
                    players["player"].user,
                    players["player"].eaten,
                    players["player"].pos_world.x,
                    players["player"].pos_world.y
                );
                // getEnemies();
                players["player"].time = n
            }

            eatDot();
            getDots();
            drawDots();

            drawEnemies();

            contextViewport.drawImage(createWorld, players["player"].pos_world.x - viewport.width / 2,
                players["player"].pos_world.y - viewport.height / 2,
                viewport.width, viewport.height, 0, 0, viewport.width, viewport.height);
            contextViewport.drawImage(dots, players["player"].pos_world.x - viewport.width / 2,
                players["player"].pos_world.y - viewport.height / 2,
                viewport.width, viewport.height, 0, 0, viewport.width, viewport.height);
            contextViewport.drawImage(enemyField, players["player"].pos_world.x - viewport.width / 2,
                players["player"].pos_world.y - viewport.height / 2,
                viewport.width, viewport.height, 0, 0, viewport.width, viewport.height);


            updateChara(players["player"].user, players["player"].size, players["player"].pos_player.x, players["player"].pos_player.y);

            requestAnimationFrame(loop);
        }else{
            //game over screen
        }

        //players["player"].gametime = n
    //}
}

// Start Up of Game / Controls
function game(){
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;

    makeWorld();
}

// Control
startButton.addEventListener("click", function(){
    checkUser()
});
function start(){
    currentPlayer = players["player"].user = escapeHtml(userName.value);
    updateChara(players["player"].user, players["player"].size, players["player"].pos_player.x, players["player"].pos_player.y);
    userName.value = "";
    startButton.disabled = true;
    game();
}

// Movement
var keyPressed = {
    "up": false,
    "down": false,
    "right": false,
    "left": false
};

function keyDown(event) {
    event.preventDefault();
    if (event.keyCode == 39 || event.keyCode == 68) {
        keyPressed.right = true;
    }
    if (event.keyCode == 37 || event.keyCode == 65) {
        keyPressed.left = true;
    }
    if (event.keyCode == 40 || event.keyCode == 83) {
        keyPressed.down = true;
    }
    if (event.keyCode == 38 || event.keyCode == 87) {
        keyPressed.up = true;
    }
}

function keyUp(event) {
    event.preventDefault();
    if (event.keyCode == 39 || event.keyCode == 68) {
        keyPressed.right = false;
    }
    if (event.keyCode == 37 || event.keyCode == 65) {
        keyPressed.left = false;
    }
    if (event.keyCode == 40 || event.keyCode == 83) {
        keyPressed.down = false;
    }
    if (event.keyCode == 38 || event.keyCode == 87) {
        keyPressed.up = false;
    }
}

function kill() {
    players["player"].alive = false;
    removeUser()
}

//Saving data to filename
filename = "Model/players.txt"

function ajaxGetRequest(path, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("GET", path);
    request.send();
}

function ajaxPostRequest(path, data, callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    };
    request.open("POST", path);
    request.send(data);
}


function load(response){
    var players = "";
    var data = JSON.parse(response);
    var leaderboardData = data["leaderboard"];
    var rank = 1;
    for(var index in leaderboardData){
        var line = rank.toString() + " -> " + leaderboardData[index][0] + " " + leaderboardData[index][1] + "</br>";
        players += line;
        rank++
    }
    document.getElementById("players").innerHTML = players;
}

function load2(response){
    var players = "";
    var data = JSON.parse(response);
    var rank = 1;
    for(var point in data){
        var index = data[point].split(" ");
        var line = rank.toString() + " -> " + index[0] + " " + index[1] + "</br>";
        players += line;
        rank++
    }
    document.getElementById("players").innerHTML = players;
    updateEnemies(data)
}


function loadPlayers(){
    ajaxGetRequest("/players", load);
}

function addUser(response){
    var data = JSON.parse(response)
    if(data == 0) {
        start()
        var toSend = JSON.stringify({
            "username": players["player"].user,
            "x": players["player"].pos_world.x,
            "y": players["player"].pos_world.y});
        document.getElementById("usernameCheck").innerHTML = "Welcome!";
        ajaxPostRequest("/add", toSend, load);
    }else{
        document.getElementById("usernameCheck").innerHTML = "Name Taken. Please try a different username.";
    }
}

function checkUser() {
    var toSend = JSON.stringify(escapeHtml(userName.value));
    ajaxPostRequest("/checkUser", toSend, addUser);
}

function updateUser(user, size, x, y) {
    var toSend = JSON.stringify([user, size, Math.floor(x), Math.floor(y)]);
    ajaxPostRequest("/update", toSend, load2);
}

function removeUser(){
    var toSend = JSON.stringify({"username": players["player"].user});
    ajaxPostRequest("/remove", toSend, load);
}

function getEnemies(){
    var toSend = JSON.stringify({"username": currentPlayer})
    ajaxPostRequest("/users", toSend, updateEnemies)
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/ /g, "_")
        .replace(/'/g, "&#039;");
}