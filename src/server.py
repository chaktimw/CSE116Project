#code from midterm project (using bottle)
from bottle import route, static_file, run
import tickets

@route('/')
def send_static():
    return static_file("/index.html", root='')

@route('/map.js')
def send_statics():
    return static_file("/map.js", root='')

@route('/tickets')
def get_tickets():
    return tickets.get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json")

#PORT IS FOR CODENVY
run(host='0.0.0.0', port=8080, debug=True)
#CODENVY PREVIEW URL: http://${server.port.8080}