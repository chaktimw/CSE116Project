def removePlayer(username):
    f = open("players.txt", "r")
    lines = f.readlines()
    f.close()
    f = open("players.txt", "w")
    for line in lines:
        if line != username + "\n":
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