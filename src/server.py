# code from midterm project (using bottle)
import bottle
import leave
import json


# homepage
@bottle.route('/')
def home():
    return bottle.static_file("index.html", root='')

# Testing Code
@bottle.route('/player.js')
def code():
    return bottle.static_file("player.js", root='')

# access player file and remove player
@bottle.post('/remove')
def remove_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.removePlayer(content['username'])
    return json.dumps(leave.getPlayerList())

@bottle.post('/add')
def do_chat():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.addPlayer([content['message'], content['size']])
    return json.dumps(leave.getPlayerList())

@bottle.route('/players')
def get_players():
    return json.dumps(leave.getPlayerList())


bottle.run(host='localhost', port=8080)
# bottle.run(host='10.84.139.100', port=80)
