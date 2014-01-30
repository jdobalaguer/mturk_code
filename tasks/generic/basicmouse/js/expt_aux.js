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
  // remove drawings

  // CHANGE CODE HERE TO CLEAR
  // ANYTHING THAT NEEDS TO BE REMOVED
  // (RAPHAEL OBJECTS, ETC ..)

  board.trials.trials.remove();
  board.blocks.blocks.remove();

  board.responsebar.responsebar.remove();
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
        task:     "conceptfunction",
        // CHANGE PATH HERE
        // SO THAT IT MATCHES THE FOLDER OF THE PROJECT
        path:     "../../tasks/ME/PROJECTNAME/data",
        id:       participant_id,
        
        numbers:  JSON.stringify(numbers),
        sdata:    JSON.stringify(sdata),
        edata:    JSON.stringify(edata),
      };
    } else {
    alldata =
      {
        task:     "conceptfunction",
        // CHANGE PATH HERE
        // SO THAT IT MATCHES THE FOLDER OF THE PROJECT
        path:     "../../tasks/ME/PROJECTNAME/baddata",
        id:       participant_id,
        
        numbers:  JSON.stringify(numbers),
        sdata:    JSON.stringify(sdata),
        edata:    JSON.stringify(edata),
      };      
    }

    //send it to the back-end
    sendData(alldata);
}
