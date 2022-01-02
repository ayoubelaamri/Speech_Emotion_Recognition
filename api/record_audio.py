from keras.models import Sequential, Model, model_from_json
import matplotlib.pyplot as plt
import keras 
import pickle
import wave  # !pip install wave
import os
import pandas as pd
import numpy as np
import sys
import warnings
import librosa
import librosa.display
import IPython.display as ipd  # To play sound in the notebook

from tensorflow.keras.utils import to_categorical
from tensorflow.keras import optimizers

import sounddevice as sd

from flask import send_from_directory

# ignore warnings 
if not sys.warnoptions:
    warnings.simplefilter("ignore")

def run():

    # OUTPUT_FILE = send_from_directory("../client/public/", 'record.wav')() #File name to save
    OUTPUT_FILE = '../recordings/record.wav'
    DURATION = 3  #Recording length (seconds)
    RATE = 44100  #Sampling frequency
    CHANNELS = 2

    #Start recording (wave_length Record for seconds. Wait until the recording is finished with wait)
    print("* Recording ..")
    sd.default.samplerate = RATE
    sd.default.channels = CHANNELS
    data = sd.rec(int(DURATION * RATE))
    sd.wait()
    print("* Done Recording.")

    #Normalize. Since it is recorded with 16 bits of quantization bit, it is maximized in the range of int16.
    print("* Normalization ..")
    data = data / data.max() * np.iinfo(np.int16).max

    # float -> int
    data = data.astype(np.int16)

    #Save file
    with wave.open(OUTPUT_FILE, mode='wb') as wb:
        wb.setnchannels(CHANNELS)  #monaural
        wb.setsampwidth(2)  # 16bit=2byte
        wb.setframerate(RATE)
        wb.writeframes(data.tobytes())  #Convert to byte string
        
    print("* WAV file saved successfully.")

    return True
