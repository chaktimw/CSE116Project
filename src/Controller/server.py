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
    return bottle.static_file("tiles.png", root='View/')


# Access players file
@bottle.post('/remove')
def remove_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.removePlayer(content['username'])
    return get_players()

@bottle.post('/add')
def add_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.addPlayer(content['username'], int(content['x']), int(content['y']))
    return get_players()

@bottle.post('/update')
def add_player():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    leave.updatePlayer([content['username'], int(content['size']), int(content['x']), int(content['y'])])
    return get_players()

@bottle.post('/checkUser')
def check_user():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    return json.dumps(leave.checkUser(content['username']))

@bottle.route('/players')
def get_players():
    return json.dumps(leave.getLeaderboard())

# /users is for loading all users in real time
# feature has not yet been implemented in tempGame.js
@bottle.route('/users')
def get_users():
    content = bottle.request.body.read().decode()
    content = json.loads(content)
    return json.dumps(leave.getPlayers(content['username']))


bottle.run(host='localhost', port=8080)
# bottle.run(host='10.84.139.100', port=80)
