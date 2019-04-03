
filename = "Model/players.txt"


def getPlayerList():
    players = []
    with open(filename) as file:
        for line in file:
            players.append({"username": line.rstrip("\n\r")})
    return players

def addPlayer(username):
    # Prevent repeats (Optional)

    # usernameexists = False
    placement = 1
    with open(filename) as file:
        for line in file:
            # if line.replace("\n", "").split(" ")[1] == username:
                # usernameexists = True
            placement += 1
    # if not usernameexists:
    with open(filename, "a") as file:
        file.write(str(placement) + " > " + username + " 10" + "\n")

def removePlayer(username):
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    for line in lines:
        if line.replace("\n", "").split(" ")[2] != username:
            f.write(line)
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
        update_line = str(placement) + " " + split_line[1] + " " + data[0] + " " + str(data[1]) + "\n"
        if int(split_line[3]) <= data[1] and update:
            placement += 1
            f.write(update_line)
            update = False
        f.write(str(placement) + " " + " ".join(split_line[1::]) + "\n")
        placement += 1
    if update:
        f.write(update_line)
    if len(lines) == 0:
        f.write("1" + " > " + data[0] + " " + str(data[1]) + "\n")
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