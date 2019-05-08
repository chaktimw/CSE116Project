
filename = "Model/players.txt"

def checkUser(username):
    with open(filename) as file:
        for line in file:
            if line.replace("\n", "").split(" ")[0] == username:
                return 1
    return 0

def getPlayers(username):
    players = []
    with open(filename) as file:
        for line in file:
            split_line = line.rstrip("\n\r").split(" ")
            if split_line[0] != username:
                players.append(line)
    return {"users": players}

# this is version 2
def getLeaderboard2():
    players = []
    with open(filename) as file:
        for line in file:
            players.append(line)
    return players

# useless, version 2 is better
# should delete method below in future
def getLeaderboard():
    players = {"leaderboard": []}
    with open(filename) as file:
        for line in file:
            line = line.rstrip("\n\r").split(" ")
            players["leaderboard"].append(line)
    return players

def addPlayer(username, x, y):
    with open(filename, "a") as file:
        file.write(username + " 0 " + str(x) + " " + str(y) + "\n")

def removePlayer(username):
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    for line in lines:
        split_line = line.replace("\n", "").split(" ")
        if split_line[0] != username:
            f.write(line)
        else:
            f.write("")
    f.close()


# goes through each line in players.txt and writes it down but
# if update line has a bigger score than the current lin in player.txt, write update line first
# check if the line in players.txt matches username of update line
# also check if update line is already dead
def updatePlayer(data):
    alive = updateHelper(data[0])
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    updated = False
    update_line = data[0] + " " + str(data[1]) + " " + str(data[2]) + " " + str(data[3]) + "\n"
    if not alive:
        update_line = ""
    for line in lines:
        split_line = line.replace("\n", "").split(" ")
        if int(split_line[1]) < data[1] and not updated:
            f.write(update_line)
            updated = True
        f.write(line)
    if not updated:
        f.write(update_line)
    f.close()


def updateHelper(username):
    exists = False
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    for line in lines:
        split_line = line.replace("\n", "").split(" ")
        if split_line[0] != username:
            f.write(line)
        else:
            f.write("")
            exists = True
    f.close()
    return exists
