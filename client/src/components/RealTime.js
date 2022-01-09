import React from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

import io from 'socket.io-client';
let socket = io.connect('http://localhost:5000/');

export default function RealTime() {
    const [emotion, setEmotion] = React.useState(null);
    const [wizardState, setWizardState] = React.useState(null);
    const [recordState, setRecordState] = React.useState(RecordState.NONE);
    const [wavesClass, setWavesClass] = React.useState('hided-waves');
    const [wavesWidth, setWavesWidth] = React.useState('500');


    React.useEffect(() => {
        !wizardState ? setWavesClass('hided-waves') : setWavesClass('');
        window.innerWidth > 512 ? setWavesWidth('500') : setWavesWidth('300')
        getEmotion();
    })

    function start() {
        setWizardState(1);
        setRecordState(RecordState.START);
        fetch('/start_real_time')
        .then(() => {
            callSocket();
        });
    }

    const callSocket = () => {
        socket.emit("message");
    }

    const getEmotion = () => {
        socket.on("message", msg => {
            setEmotion(msg);
        })
    }

    function stop() {
        setWizardState(null);
        setRecordState(RecordState.STOP);
        fetch('/stop_real_time');
    }

    return (
        <div>

            <div class="wizard-navigation">
                <ul className="row justify-content-center nav nav-pills">
                    <div class="col-12 moving-tab"><li><a href="#" data-toggle="tab">REAL TIME RECOGNITION</a></li></div>
                </ul>
            </div>

            <div class="tab-content">

                <div className={`text-center ` + wavesClass} style={{ width: '100%' }}>
                    <AudioReactRecorder state={recordState} canvasHeight="100" canvasWidth={wavesWidth} backgroundColor="#fff" foregroundColor="#000" />
                </div>

                {
                    !wizardState ? (
                        <div style={{ marginTop: "-80px" }}>
                            <h4 class="info-text"> Start Real Time Recognition</h4>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="col-sm-12">
                                        <div onClick={start} class="choice" data-toggle="wizard-radio" rel="tooltip" title="Click to start recording .. ">
                                            <div class="icon" style={{}}>
                                                <i class="fa fa-microphone"></i>
                                            </div>
                                            <h6 style={{ color: '#f44336', fontSize: '20px', fontWeight: '700', marginLeft: '5px' }}>START</h6>
                                            {/* <h6>{record_state === "" ? ("START"):("STOP")}</h6> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                {/* <h4 class="info-text"> Recording ... </h4> */}
                                <h4 class="info-text">Detected Emotion :</h4>
                                <div class="row">
                                    <div class="col-sm-12 text-center">
                                        <span class="emotion-result" style={{ color: '#f44336' }}>{emotion ? emotion : "[.......]"}</span>
                                        <br /><input onClick={stop} type='button' class='btn btn-next btn-fill btn-danger btn-wd mt-5' name='stop' value='Stop' />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>

        </div>
    )
}
