from flask import Flask
import record_audio
import predict_emotion
from real_time import RealTime
# import testing

instance = RealTime()

app = Flask(__name__)

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

@app.route('/start_real_time')
def start():
    instance.start()
    instance.mainloop()
    return {"emotion":""}
@app.route('/stop_real_time')
def stop():
    instance.stop()
    return {"emotion":""}