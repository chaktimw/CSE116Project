import bottle
import json
from Controller import leave


# homepage
@bottle.route('/')
def home():
    return bottle.static_file("index.html", root='View/')

@bottle.route('/end.css')
def send_static():
    return bottle.static_file("end.css", root='View/')

# Testing Code
@bottle.route('/player')
def code():
    return bottle.static_file("player.js", root='Controller/')

@bottle.route('/getPlayers')
def players_file():
    return bottle.static_file("players.txt", root='Controller/')

# Game Code
@bottle.route('/TempGame.js')
def game():
    return bottle.static_file("TempGame.js", root='Model/')


# access player file and remove player
@bottle.post('/remove')
def remove_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.removePlayer(content['username'])
    return json.dumps(leave.getPlayerList())

@bottle.post('/add')
def add_player():
    '''
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    # leave.addPlayer([content['message'], content['size']])
    leave.addPlayer([content['username']])
    '''
    return json.dumps(leave.getPlayerList())

@bottle.route('/players')
def get_players():
    return json.dumps(leave.getPlayerList())


bottle.run(host='localhost', port=8080)
# bottle.run(host='10.84.139.100', port=80)
