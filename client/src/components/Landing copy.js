import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import WaveSurfer from 'wavesurfer.js';
import * as tf from '@tensorflow/tfjs'

import Header from './Header'
import Wizard from './Wizard';

export default class Landing extends Component {
    state = {
        record_state : "",
        record_result : false,
        playing: false,
        emotion : "empty",
    }

    // componentDidMount() {
    //     const track = document.querySelector('#track');
    //     this.waveform = WaveSurfer.create({
    //         barWidth: 3,
    //         cursorWidth: 1,
    //         container: '#waveform',
    //         backend: 'WebAudio',
    //         height: 80,
    //         progressColor: '#2D5BFF',
    //         responsive: true,
    //         waveColor: '#EFEFEF',
    //         cursorColor: 'transparent',
    //     });
    //     this.waveform.load(track);
    // }

    // handlePlay = () => {
    //     this.setState({ playing: !this.state.playing });
    //     this.waveform.playPause();
    //   };

    // start_recording = () => {
    //     this.setState({record_state: "Recording .."});
    //     console.log("Recording ..");
    //     fetch('/record').then(res => res.json())
    //     .then(data => {
    //         if (data.recorded === true) {
    //             this.setState({record_result: true});
    //             console.log("Audio recorded : " + this.state.record_result);
    //             this.start_prediction();
    //         } else {
    //             console.log("Audio not recorded !");
    //         }
    //     }).then(() => {
    //         this.setState({record_state: ""});
    //     });
        
    // }

    // start_prediction = () => {
    //     this.setState({record_state: "Predicting .."});
    //     fetch('/predict').then(res => res.json())
    //     .then(data => {
    //             this.setState({emotion: data.emotion})
    //             console.log("Detected emotion : " + this.state.emotion);
    //     });
    // }

    render() {
        return (
            <div>
                <div class="image-container" style={{backgroundImage: `url('images/bg.jpg')`, height: '100%'}}>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-sm-8">
                                <div class="wizard-container">
                                    <div class="card wizard-card" data-color="red" id="wizard">

                                            <div class="wizard-header">
                                                <h3 class="wizard-title">
                                                    Speech Emotion Recognition
                                                </h3>
                                                <h5>Detect involved emotions in speech ..</h5>
                                            </div>

                                            <Wizard />

                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="container text-center">
                            Developed by <a target="_blank" href="http://www.senorjob.com">SenorJob</a>. 
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export const WaveformContianer = styled.div`
  display: flex;  
  flex-direction: row;  
  align-items: center;
  justify-content: center;
  height: 100px;  width: 100%;
  background: transparent;
  padding-right: 100px;
`;

export const Wave = styled.div`
  width: 100%;
  height: 90px;
`;

export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 55px;
  background: #EFEFEF;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-left: 5px;  &:hover {
    background: #DDD;
  }
`;
