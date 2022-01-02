import React from 'react'

export default function Wizard() {
  const Nsteps = 2;
  const [activeStep, setActiveStep] = React.useState(1);
  const handleNext = () => {
    activeStep<Nsteps && setActiveStep(activeStep+1);
  }
  const handleBack = () => {
    activeStep>0 && setActiveStep(activeStep-1);
  }
  const handleReset = () => {
    activeStep>0 && setActiveStep(activeStep-1);
    setEmotion(null);
  }

    const [record_state, setRecord_state] = React.useState("");
    const [record_result, setRecord_result] = React.useState(false);
    const [emotion, setEmotion] = React.useState(null);

    function start_recording() {
        setRecord_state("Recording ..");
        console.log("Recording ..");
        fetch('/record').then(res => res.json())
        .then(data => {
            if (data.recorded === true) {
                setRecord_result(true);
                console.log("Audio recorded : " + record_result);
                start_prediction();
            } else {
                console.log("Audio not recorded !");
            }
        }).then(() => {
            setRecord_state("");
        });
        
    }

    function start_prediction() {
        setRecord_state("Predicting ..");
        fetch('/predict').then(res => res.json())
        .then(data => {
                setEmotion(data.emotion);
                console.log("Detected emotion : " + emotion);
        });
        setActiveStep(2);
    }

  return (
    <div>

      <div class="wizard-navigation">
          <ul className="row justify-content-center nav nav-pills">
            {activeStep === 1 ? (
                <>
                    <div class="col-6 moving-tab"><li><a href="#" data-toggle="tab">Recording Audio</a></li></div>
                    <div class="col-6" onClick={()=>setActiveStep(2)}><li><a href="#" data-toggle="tab">Prediction Result</a></li></div>
                </>
            ):(
                <>
                    <div class="col-6" onClick={()=>setActiveStep(1)}><li><a href="#" data-toggle="tab">Recording Audio</a></li></div>
                    <div class="col-6 moving-tab"><li><a href="#" data-toggle="tab">Prediction Result</a></li></div>
                </>
            )}
          </ul>
      </div>

      <div class="tab-content">
          {activeStep === 1 ? (
            <div>
                <h4 class="info-text"> Start Recording Audio ..</h4>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-12">
                            <div disable onClick={start_recording} class="choice" data-toggle="wizard-radio" rel="tooltip" title="Click to start recording .. ">
                                <div class="icon">
                                    <i class="fa fa-microphone"></i>
                                </div>
                                <h6>{record_state === "" ? ("RECORD"):("Recording ...")}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          ):(
            <div>
                <h4 class="info-text">Detected Emotion :</h4>
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <span class="emotion-result" style={{color:'#f44336'}}>{emotion ? emotion : "[.......]"}</span>
                        <div class="row mt-5">
                            <div class="col-6"></div>
                            <div class="col-6"></div>
                        </div>
                    </div>
                </div>
            </div>
          )}
      </div> 

      <div class="wizard-footer">
          <div class="pull-right">
                {activeStep === 1 ? (
                    <input onClick={handleNext} type='button' class='btn btn-next btn-fill btn-danger btn-wd' name='next' value='Next' />
                ):(
                    <input onClick={handleReset} type='button' class='btn btn-next btn-fill btn-danger btn-wd' name='next' value='reset' />                )}
          </div>
          <div class="pull-left">
                {activeStep === 1 ? (
                    <div class="footer-checkbox">
                        <div class="col-sm-12">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="optionsCheckboxes" />
                                </label>
                                Help improve our recognition model.
                            </div>
                        </div>
                    </div>
                ):(
                    <input onClick={handleBack} type='button' class='btn btn-previous btn-fill btn-default btn-wd' name='previous' value='Previous' />
                )}
          </div>
          <div class="clearfix"></div>
      </div>
    </div>
  )
}
