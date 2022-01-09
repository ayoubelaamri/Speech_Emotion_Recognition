import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import WaveSurfer from 'wavesurfer.js';
import * as tf from '@tensorflow/tfjs'

import Header from './Header'
import ByAudioFile from './ByAudioFile';
import RealTime from './RealTime';

export default class Landing extends Component {
    state = {
        record_state : "",
        record_result : false,
        playing: false,
        emotion : "empty",
    }

    render() {
        return (
            <div>
                <div class="image-container" style={{backgroundImage: `url('images/bg.jpg')`}}>
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

                                            <RealTime />
                                            {/* <ByAudioFile /> */}

                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="container text-center">
                            Developed by <a target="_blank" href="https://www.senorjob.com">SenorJob</a>. 
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

