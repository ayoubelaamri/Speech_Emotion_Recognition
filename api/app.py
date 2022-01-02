from flask import Flask
import record_audio
import predict_emotion
# import real_time
# import testing

app = Flask(__name__)

# with app.app_context():
#     # within this block, current_app points to app.
#     print current_app.name

@app.route('/record')
def record():
    result = record_audio.run()
    if result:
        return {"recorded":True}
    else :
        return {"recorded":False}

@app.route('/predict')
def predict():
    result = predict_emotion.run_2D()
    return {"emotion":result}