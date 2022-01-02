import React, { Component } from 'react'
import styled from 'styled-components'
import WaveSurfer from 'wavesurfer.js';
import * as tf from '@tensorflow/tfjs'

import Header from './Header'

export default class Landing extends Component {
    state = {
        record_state : "",
        record_result : false,
        playing: false,
        emotion : "empty",
    }

    componentDidMount() {
        const track = document.querySelector('#track');
        this.waveform = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'WebAudio',
            height: 80,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: '#EFEFEF',
            cursorColor: 'transparent',
        });
        this.waveform.load(track);
    }

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
      };

    start_recording = () => {
        this.setState({record_state: "Recording .."});
        console.log("Recording ..");
        fetch('/record').then(res => res.json())
        .then(data => {
            if (data.recorded === true) {
                this.setState({record_result: true});
                console.log("Audio recorded : " + this.state.record_result);
                this.start_prediction();
            } else {
                console.log("Audio not recorded !");
            }
        }).then(() => {
            this.setState({record_state: ""});
        });
        
    }

    start_prediction = () => {
        this.setState({record_state: "Predicting .."});
        fetch('/predict').then(res => res.json())
        .then(data => {
                this.setState({emotion: data.emotion})
                console.log("Detected emotion : " + this.state.emotion);
        });
    }

    render() {
        return (
            <div>

                <Header />

                <section id="hero" class="row d-flex align-items-center">
                    <div class="col-lg-5 container text-center">
                        <h1>Record Audio</h1>
                        <h2>Start recording audio, <br/> And discover expressed emotions ..</h2>
                        <button onClick={this.start_recording} class="btn-get-started scrollto"><i className="fa fa-microphone-alt"/><span className="mx-1"/>
                            {
                                this.state.record_state === '' ? ("Start Recording"):("Recording ..")
                            }
                        </button>
                        <WaveformContianer>
                            <PlayButton onClick={this.handlePlay} >
                            {!this.state.playing ? (<i className="fa fa-play" />) : (<i className="fa fa-pause" />)}
                            </PlayButton>
                            <Wave id="waveform" />
                            <audio id="track" src="record.wav" />
                        </WaveformContianer>
                    </div>
                    <div class="col-lg-5">
                        <section id="why-us" class="why-us">
                            <div class="container">

                                <div class="row">
                                    <div class="col-lg-12 d-flex align-items-stretch">
                                        <div class="content text-center">
                                            <h5>Detected Emotion :</h5>
                                            <h3>{this.state.emotion}</h3>
                                            {/* <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                                                Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
                                            </p> */}
                                            <div class="text-center">
                                                <a href="#" class="more-btn">Learn More <i class="bx bx-chevron-right"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 d-flex align-items-stretch">
                                        <div class="icon-boxes d-flex flex-column justify-content-center">
                                        <div class="row">
                                            <div class="col-xl-12 d-flex align-items-stretch">
                                            <div class="icon-box mt-4 mt-xl-0">
                                                <i class="bx bx-receipt"></i>
                                                <h4>Accuracy</h4>
                                                <p>65 %</p>
                                            </div>
                                            </div>
                                            <div class="col-xl-12 d-flex align-items-stretch">
                                            <div class="icon-box mt-4 mt-xl-0">
                                                <i class="bx bx-cube-alt"></i>
                                                <h4>Ullamco laboris</h4>
                                                {/* <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p> */}
                                            </div>
                                            </div>
                                            <div class="col-xl-12 d-flex align-items-stretch">
                                            <div class="icon-box mt-4 mt-xl-0">
                                                <i class="bx bx-images"></i>
                                                <h4>Labore consequatur</h4>
                                                {/* <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p> */}
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </section>
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
