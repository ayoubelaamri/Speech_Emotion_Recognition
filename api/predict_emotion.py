from keras.models import Sequential, Model, model_from_json
from keras import losses
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

# ignore warnings 
if not sys.warnoptions:
    warnings.simplefilter("ignore")

from sklearn.preprocessing import LabelEncoder
lb = LabelEncoder()


def run_1D():

    # loading json and model architecture :
    print("--> model architecture ..")
    json_file = open('../model/model_json_1D.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    # load weights into new model
    print("--> Loading weights ..")
    loaded_model.load_weights("../model/model_1D.h5")
    print("Model loaded successfully !")

    # the optimiser
    print("Optimization ..")
    opt = optimizers.RMSprop(lr=0.00001, decay=1e-6)
    loaded_model.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])

    # Lets transform the recorded file so we can apply the predictions
    print("Prepare the recorded audio file ..")

    X, sample_rate = librosa.load('../recordings/record.wav'
                                ,res_type='kaiser_fast'
                                ,duration=2.5
                                ,sr=44100
                                ,offset=0.5
                                )
    sample_rate = np.array(sample_rate)
    mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13),axis=0)
    newdf = pd.DataFrame(data=mfccs).T

    # Apply predictions
    print("Apply Predictions ..")
    newdf= np.expand_dims(newdf, axis=2)
    newpred = loaded_model.predict(newdf, 
                            batch_size=16, 
                            verbose=1)
    
    # Append the labels to it before we can make sense as to what it has predicted.
    print("Append labels ..")
    infile = open('../model/labels_1D','rb')
    lb = pickle.load(infile)
    infile.close()

    # Get the final predicted label
    print("Getting Result ..")
    result = newpred.argmax(axis=1)
    result = result.astype(int).flatten()
    result = (lb.inverse_transform((result)))

    print(result)

    return result[0]

def run_2D():

    # loading json and model architecture :
    print("--> model architecture ..")
    json_file = open('../model/model_json_2D.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    # load weights into new model
    print("--> Loading weights ..")
    loaded_model.load_weights("../model/model_2D.h5")
    print("Model loaded successfully !")

    # the optimiser
    print("Optimization ..")
    opt = optimizers.Adam(0.001)
    loaded_model.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])

    # Lets transform the recorded file so we can apply the predictions
    print("Prepare the recorded audio file ..")

    sampling_rate=44100
    audio_duration=2.5
    input_length = sampling_rate * audio_duration
    n_mfcc = 30

    data, _ = librosa.load('../recordings/record.wav', sr=sampling_rate
                               ,res_type="kaiser_fast"
                               ,duration=2.5
                               ,offset=0.5
                              )

    # Random offset / Padding
    if len(data) > input_length:
        max_offset = len(data) - input_length
        offset = np.random.randint(max_offset)
        data = data[offset:(input_length+offset)]
    else:
        if input_length > len(data):
            max_offset = input_length - len(data)
            offset = np.random.randint(max_offset)
        else:
            offset = 0
        data = np.pad(data, (offset, int(input_length) - len(data) - offset), "constant")

    MFCC = librosa.feature.mfcc(data, sr=sampling_rate, n_mfcc=n_mfcc)
    # MFCC = MFCC.reshape(1,30,216,1)
    MFCC = np.expand_dims(MFCC, axis=-1)
    X = np.empty(shape=(1,n_mfcc, 216, 1))
    X[0,] = MFCC
    print(MFCC.shape)

    # Apply predictions
    print("Apply Predictions ..")
    newpred = loaded_model.predict(X, 
                            batch_size=16,
                            verbose=2)
    
    # Append the labels to it before we can make sense as to what it has predicted.
    print("Append labels ..")
    infile = open('../model/labels_2D','rb')
    lb = pickle.load(infile)
    infile.close()

    # Get the final predicted label
    print("Getting Result ..")
    result = newpred.argmax(axis=1)
    result = result.astype(int).flatten()
    result = (lb.inverse_transform((result)))

    print(result)

    return result[0]

