from flask import Flask,render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('chat.html')

messages = []
@socketio.on('send_message')
def handle_send_message(data):
    messages.append(data)
    emit('receive_message', data, broadcast=True)

@socketio.on('connect')
def handle_connect():
    for message in messages:
        emit('receive_message', message)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

