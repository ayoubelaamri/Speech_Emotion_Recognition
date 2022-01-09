import pyaudio
import os
import struct
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.fftpack import fft
import time
from tkinter import TclError

# # to display in separate Tk window
# %matplotlib tk

from keras.models import Sequential, Model, model_from_json
from keras import losses
import keras 
import pickle
import wave  # !pip install wave
# import os
import sys
import warnings
import librosa
import librosa.display
import IPython.display as ipd  # To play sound in the notebook
from tensorflow.keras.utils import to_categorical
from tensorflow.keras import optimizers

# ignore warnings 
if not sys.warnoptions:
    warnings.simplefilter("ignore")


class RealTime(object):
    def __init__(self):
        self.FORMAT = pyaudio.paFloat32
        self.CHANNELS = 1
        self.RATE = 44100
        self.DURATION = 2.5
        self.CHUNK = 1024
        self.p = None
        self.stream = None
        self.emotion = None
        
        # loading json and model architecture :
        json_file = open('../model/model_json_1D.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        loaded_model = model_from_json(loaded_model_json)
        # load weights into new model
        loaded_model.load_weights("../model/model_1D.h5")
        print("Loaded model from disk")
        # the optimiser
        opt = optimizers.RMSprop(learning_rate=0.00001, decay=1e-6)
        loaded_model.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])
        self.model = loaded_model

    def start(self):
        print("Start Recording ..")
        self.p = pyaudio.PyAudio()
        self.stream = self.p.open(format=self.FORMAT,
                                  channels=self.CHANNELS,
                                  rate=self.RATE,
                                  input=True,
                                  output=False,
                                  stream_callback=self.callback,
                                  frames_per_buffer=int(self.RATE*self.DURATION))

    def stop(self):
        print("Stop Recording ..")
        self.stream.close()
        self.p.terminate()
        self.emotion = None

    def callback(self, in_data, frame_count, time_info, flag):
        data = np.frombuffer(in_data, dtype=np.float32)
        # data = data / data.max() * np.iinfo(np.int16).max
        mfccs = np.mean(librosa.feature.mfcc(y=data, sr=self.RATE, n_mfcc=13),axis=0)
        newdf = pd.DataFrame(mfccs).T
        newdf= np.expand_dims(newdf, axis=2)
        newpred = self.model.predict(newdf, batch_size=16, verbose=1)
        infile = open('../model/labels_1D','rb')
        lb = pickle.load(infile)
        infile.close()
        result = newpred.argmax(axis=1)
        result = result.astype(int).flatten()
        result = (lb.inverse_transform((result)))
        self.emotion= result[0]
        print(self.emotion)
        return result[0], pyaudio.paContinue

    # def mainloop(self):
    #     while (self.stream.is_active()): # if using button you can set self.stream to 0 (self.stream = 0), otherwise you can use a stop condition
    #         time.sleep(0.5)
    #         return self.emotion

