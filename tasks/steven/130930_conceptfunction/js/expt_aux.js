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
  // remove stimuli
  board.stimulusellipse.stimulusellipse.remove();
  board.stimulustriangle.stimulustriangle.remove();
  board.stimulusline.stimulusline.remove();
  board.stimulusbar.stimulusbar.remove();
  // remove response
  board.responselabel.responselabel.remove();
  board.responsebar.responsebar.remove();
  // general stuff
  board.trials.trials.remove();
  board.blocks.blocks.remove();
  board.instructions.instructions.remove();
  board.paper.paper.remove();
}

function saveExperiment(){
  //set the data to be saved
  var alldata = {};
  participant_performance = mean(sdata.resp_correct);
  if (participant_performance >= parameters.minimum_performance) {
    alldata =
      {
        task:     "131010_conceptfunction",
        path:     "../../tasks/steven/131010_conceptfunction/data",
        id:       participant_id,
        
        numbers:  JSON.stringify(numbers),
        sdata:    JSON.stringify(sdata),
        edata:    JSON.stringify(edata),
      };
    } else {
    alldata =
      {
        task:     "130930_conceptfunction",
        path:     "../../tasks/steven/131010_conceptfunction/baddata",
        id:       participant_id,
        
        numbers:  JSON.stringify(numbers),
        sdata:    JSON.stringify(sdata),
        edata:    JSON.stringify(edata),
      };      
    }

    //send it to the back-end
    sendData(alldata);
}
