from flask import Flask
# from flask_cors import CORS
from flask_socketio import SocketIO, send
import time

import record_audio
import predict_emotion
from real_time import RealTime

instance = RealTime()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret!'

socketio = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost'

#===============================================

@socketio.on("message")
def detection():
    while instance.stream.is_active():
        time.sleep(0.5)
        send(instance.emotion, broadcast=True)
    return None 

@app.route('/start_real_time')
def start():
    instance.start()
    return None

@app.route('/stop_real_time')
def stop():
    instance.stop()
    return None

#===============================================

@app.route('/record')
def record():
    result = record_audio.run()
    if result:
        return {"recorded":True}
    else :
        return {"recorded":False}
@app.route('/predict')
def predict():
    # result = predict_emotion.run_1D()
    result = predict_emotion.run_2D()
    return {"emotion":result}

#===============================================

if __name__ == '__main__':
    socketio.run(app, debug=True)