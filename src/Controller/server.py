import bottle
import json
from Controller import leave


# homepage
@bottle.route('/')
def home():
    return bottle.static_file("index.html", root='View/')

@bottle.route('/end.css')
def css():
    return bottle.static_file("end.css", root='View/')

# Game Files
@bottle.route('/TempGame.js')
def game():
    return bottle.static_file("TempGame.js", root='Model/')

@bottle.route('/tiles.png')
def img1():
    return bottle.static_file("tiles.png", root='Model/')


# Access players file
@bottle.post('/remove')
def remove_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.removePlayer(content['username'])
    return json.dumps(leave.getPlayerList())

@bottle.post('/add')
def add_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.addPlayer(content['username'])
    return json.dumps(leave.getPlayerList())

@bottle.post('/update')
def add_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.updatePlayer([content['username'], int(content['size'])])
    return json.dumps(leave.getPlayerList())

@bottle.route('/players')
def get_players():
    return json.dumps(leave.getPlayerList())


bottle.run(host='localhost', port=8080)
# bottle.run(host='10.84.139.100', port=80)
