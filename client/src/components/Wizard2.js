import React from 'react'

export default function Wizard2() {
    const [emotion, setEmotion] = React.useState(null);

    function start_realtime() {
        // setRecord_state("Predicting ..");
        fetch('/real-time').then(res => res.json())
        .then(data => {
                setEmotion(data.emotion);
                console.log("Detected emotion : " + emotion);
        });
    }

  return (
    <div>

      <div class="wizard-navigation">
          <ul className="row justify-content-center nav nav-pills">
            <div class="col-12 moving-tab"><li><a href="#" data-toggle="tab">REAL TIME RECOGNITION</a></li></div>
          </ul>
      </div>

      <div class="tab-content">
            <div>
                <h4 class="info-text"> Start Real Time Recognition ..</h4>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="col-sm-12">
                            <div onClick={start_realtime} class="choice" data-toggle="wizard-radio" rel="tooltip" title="Click to start recording .. ">
                                <div class="icon">
                                    <i class="fa fa-microphone"></i>
                                </div>
                                <h6>START</h6>
                                {/* <h6>{record_state === "" ? ("START"):("STOP")}</h6> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div> 

      {/* <div class="wizard-footer">
          <div class="pull-right">
                {activeStep === 1 ? (
                    <input onClick={handleNext} type='button' class='btn btn-next btn-fill btn-danger btn-wd' name='next' value='Next' />
                ):(
                    <input onClick={handleReset} type='button' class='btn btn-next btn-fill btn-danger btn-wd' name='next' value='reset' />                
                )}
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
      </div> */}

    </div>
  )
}
