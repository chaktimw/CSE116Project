filename = "Controller/players.txt"


def getPlayerList():
    players = []
    with open(filename) as file:
        for line in file:
            players.append({"username": line.rstrip("\n\r")})
    return players

def addPlayer(data):
    # Prevent repeats (Optional)

    # usernameexists = False
    placement = 1
    with open(filename) as file:
        for line in file:
            # if line.replace("\n", "").split(" ")[1] == data[0]:
                # usernameexists = True
            placement += 1
    # if not usernameexists:
    with open(filename, "a") as file:
        file.write(str(placement) + "> " + data[0] + "\n")

def removePlayer(username):
    f = open(filename, "r")
    lines = f.readlines()
    f.close()
    f = open(filename, "w")
    for line in lines:
        if line.replace("\n", "").split(" ")[1] != username:
            f.write(line)
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