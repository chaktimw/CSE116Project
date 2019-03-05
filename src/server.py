# code from midterm project (using bottle)
from bottle import route, static_file, run
# import


# homepage
@route('/')
def send_static():
    return "test"
    # return static_file("/index.html", root='')


# game code file
@route('/map.js')
def send_statics():
    return "ah"
    # return static_file("/map.js", root='')


# helen
# access player file and add player
@route('/join')
def add_player():
    return "hi"


# chaktim
# access player file and remove player
@route('/leave')
def remove_player():
    return "bye"

# PORT IS FOR CODENVY
# run(host='0.0.0.0', port=8080, debug=True)
# CODENVY PREVIEW URL: http://${server.port.8080}


run(host='localhost', port=8080)