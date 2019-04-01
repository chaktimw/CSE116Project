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
    var data = JSON.parse(response)
    for(var index in data){
        players += data[index].username + "</br>";
    }
    document.getElementById("players").innerHTML = players;
}

function loadPlayers(){
   ajaxGetRequest("/players", load);
}

function addUser(){
    var userElement = document.getElementById("nick");
    //var sizeElement = document.getElementById("Size");
    var username = userElement.value;
    //var size = sizeElement.value;
    userElement.value = ""
    //sizeElement.value = ""
    //var toSend = JSON.stringify({"message": message, "size": size});
    var toSend = JSON.stringify({"message": escapeHtml(username)});
    ajaxPostRequest("/add", toSend, load);
}

function removeUser(){
    var usernameElement = document.getElementById("RemoveUsername");
    var username = usernameElement.value;
    usernameElement.value = "";
    var content = JSON.stringify({"username": username});
    ajaxPostRequest("/remove", content, load);
}

//taken from stackoverflow
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}