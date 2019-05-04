
filename = "Model/players.txt"

def checkUser(username):
    with open(filename) as file:
        for line in file:
            if line.replace("\n", "").split(" ")[2] == username:
                return 1
    return 0

def getPlayerList():
    players = []
    with open(filename) as file:
        for line in file:
                players.append({"username": line.rstrip("\n\r")})
    return players

def addPlayer(username):
    usernameexists = False
    rank = 1
    with open(filename) as file:
        for line in file:
            if line.replace("\n", "").split(" ")[2] == username:
                usernameexists = True
            rank += 1
    if not usernameexists:
        with open(filename, "a") as file:
            file.write(str(rank) + " > " + username + " 0" + "\n")

def removePlayer(username):
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    rank = 1
    for line in lines:
        split_line = line.replace("\n", "").split(" ")
        if split_line[2] != username:
            f.write(str(rank) + " " + split_line[1] + " " + split_line[2] + " " + split_line[3] + "\n")
            rank += 1
        else:
            f.write("")
    f.close()

def updatePlayer(data):
    removePlayer(data[0])
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    update = True
    update_line = ""
    placement = 1
    for line in lines:
        split_line = line.replace("\n", "").split(" ")
        update_line = " " + split_line[1] + " " + data[0] + " " + str(data[1]) + "\n"
        if int(split_line[3]) <= data[1] and update:
            f.write(str(placement) + update_line)
            placement += 1
            update = False
        f.write(str(placement) + " " + " ".join(split_line[1::]) + "\n")
        placement += 1
    if len(lines) == 0:
        f.write(str(placement) + " > " + data[0] + " " + str(data[1]) + "\n")
    elif update:
        f.write(str(placement) + update_line)
        placement += 1
    f.close()

# https://stackoverflow.com/questions/10272561/ajax-and-user-leaving-a-page
# ajax user leave post code:
# $(window).unload(function(){
#     $.ajax({
#         type: 'POST',
#         url: 'script.php',
#         async:false,
#         data: {key_leave:"289583002"}
#     });
# });