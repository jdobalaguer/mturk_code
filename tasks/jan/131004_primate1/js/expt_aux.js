function startExperiment() {
  // clean div
  emptyDiv("webbodyDiv");
  // set flags
  startedexperiment    = true;
  finishededexperiment = false;
  // set new variables
  setExperiment();
  // run the experiment
  edata.exp_starttime = getTimestamp();
  runExperiment();
}
            
function finishExperiment() {
  // stop the experiment
  edata.exp_finishtime = getTimestamp();
  stopExperiment();
  // set flags
  startedexperiment  = true;
  finishedexperiment = true;
  // send the data
  goWebsite(html_sending);
  saveExperiment();
  goWebsite(html_vercode);
  // fullscreen off
  offFullscreen();
}

function stopExperiment() {
  // set flags
  startedexperiment  = false;
  finishedexperiment = false;
  // remove
  removeFeedback();
  removeStimuli();
  removeInstructions();
  removeCounter();
  removePaper();
}

function saveExperiment(){
  //set the data to be saved
  var alldata = {};
  participant_performance = mean(sdata.resp_correct);
  if (participant_performance >= parameters.minimum_performance) {
    alldata =
      {
        task:     participant_task,
        path:     "../../tasks/"+participant_task+"/data",
        id:       participant_id,
        
        numbers:    JSON.stringify(numbers),
        sdata:      JSON.stringify(sdata),
        edata:      JSON.stringify(edata),
        parameters: JSON.stringify(parameters),
      };
    } else {
    alldata =
      {
        task:     participant_task,
        path:     "../../tasks/"+participant_task+"/baddata",
        id:       participant_id,
        
        numbers:    JSON.stringify(numbers),
        sdata:      JSON.stringify(sdata),
        edata:      JSON.stringify(edata),
        parameters: JSON.stringify(parameters),
      };      
    }

    //send it to the back-end
    sendData(alldata);
}
