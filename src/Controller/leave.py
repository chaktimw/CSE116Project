
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

def updatePlayer(data):
    removePlayer(data[0])
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    update = True
    update_line = data[0] + " " + str(data[1]) + " " + str(data[2]) + " " + str(data[3]) + "\n"
    for line in lines:
        # line from players.txt vs line that is to be added
        split_line = line.replace("\n", "").split(" ")
        if int(split_line[1]) <= data[1] and update:
            f.write(update_line)
            update = False
        f.write(line)
    if update:
        f.write(update_line)
    f.close()
