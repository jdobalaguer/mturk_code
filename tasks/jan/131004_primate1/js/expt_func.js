

<!-- Response methods -->
function handleLeft()  { handleResponse('Left', 0); }
function handleRight() { handleResponse('Right',1); }
function handleResponse(key,category) {
  if(coding.answering){
    coding.answering = false;
    saveResponse(key,category);
    //hideTrial();
    showFeedback();
    setTimeout(nextTrial,parameters.response_timeout);
  }
}
function saveResponse(key,category) {
  sdata.resp_timestamp[coding.index]         = getTimestamp();
  sdata.resp_reactiontime[coding.index]      = getSecs(coding.timestamp);
  sdata.resp_key[coding.index]               = key;
  sdata.resp_category[coding.index]          = category;
  sdata.resp_correct[coding.index]           = bin2num(sdata.vb_category[coding.index]==sdata.resp_category[coding.index]);
  sdata.resp_error[coding.index]             = 1 - sdata.resp_correct[coding.index];
}

<!-- Show methods -->
function showTrial() {
  showStimuli();
  showInstructions();
  showCounter();
}
function showStimuli() {
  for(var i_stimuli=0;i_stimuli<board.stimuli.length;i_stimuli++){
    for(var i_component=0;i_component<board.stimuli[i_stimuli].length;i_component++){
      board.stimuli[i_stimuli][i_component].object.attr({"opacity":1});
    }
  }
}
function showFeedback() {
  if(sdata.resp_correct[coding.index]){
    board.posfeedback.object.attr({"opacity": 1});
  } else {
    board.negfeedback.object.attr({"opacity": 1});
  }
}
function showPause(){
  // change (text)
  board.change = {};
  board.change.centre = board.paper.centre;
  board.change.text = "A couple of seconds' break, then we'll do some more shapes";
  board.change.object = drawText(board.paper.object,board.change.centre,board.change.text);
  board.change.object.attr({"font-size": board.font_bigsize});
}
function showInstructions() {
  board.instructions.object.attr({"opacity": 1});
}
function showCounter() {
  board.trials.object.attr({"opacity": 1});
  board.blocks.object.attr({"opacity": 1});
}

<!-- Hide methods -->
function hideTrial() {
  hideStimuli();
  hideInstructions();
  hideCounter();
}
function hideStimuli() {
  for(var i_stimuli=0;i_stimuli<board.stimuli.length;i_stimuli++){
    for(var i_component=0;i_component<board.stimuli[i_stimuli].length;i_component++){
      board.stimuli[i_stimuli][i_component].object.attr({"opacity":0});
    }
  }
}
function hideFeedback() {
  board.posfeedback.object.attr({"opacity": 0});
  board.negfeedback.object.attr({"opacity": 0});
}
function hideInstructions() {
  board.instructions.object.attr({"opacity": 0});
}
function hidePause() {
  board.change.object.remove();
}
function hideCounter() {
  board.trials.object.attr({"opacity": 0});
  board.blocks.object.attr({"opacity": 0});
}

<!-- Update methods -->
function updateCounter() {
  board.trials.text = "So far you have done "+(sdata.vb_trial[coding.index]-1)+" out of "+numbers.trials+" trials";
  board.trials.object.attr({"text": board.trials.text});
  board.blocks.text = "So far you have done "+(sdata.vb_block[coding.index]-1)+" out of "+numbers.blocks+" blocks";
  board.blocks.object.attr({"text": board.blocks.text});
}
function updateStimuli() {
  resetStimuli();
  setStimuli();
}
function resetStimuli() {
  for(var i_stimuli=0;i_stimuli<board.stimuli.length;i_stimuli++){
    for(var i_component=0;i_component<board.stimuli[i_stimuli].length;i_component++){
      // width and height
      board.stimuli[i_stimuli][i_component].object.attr({"width":  board.stimuli[i_stimuli][i_component].width});
      board.stimuli[i_stimuli][i_component].object.attr({"height": board.stimuli[i_stimuli][i_component].height});
      setCentre(board.stimuli[i_stimuli][i_component].object,board.stimuli[i_stimuli][i_component].centre);
      // rotation
      board.stimuli[i_stimuli][i_component].object.rotate(-board.stimuli[i_stimuli][i_component].angle);
      board.stimuli[i_stimuli][i_component].angle = 0;
    }
  }
}
function setStimuli() {
  var nb_stimuli    = numbers.stimuli;
  var nb_components = numbers.components;
  var nb_features   = numbers.features;
  for(var i_stimuli=0;     i_stimuli<nb_stimuli;      i_stimuli++){
    for(var i_component=0; i_component<nb_components; i_component++){
      for(var i_feature=0; i_feature<nb_features;     i_feature++){
        setFeature(i_stimuli,i_component,i_feature);
      }
    }
  }
}
function setFeature(i_stimuli,i_component,i_feature) {
  switch(i_component) {
    case 0:
      // RED RECTANGLE
      switch(i_feature) {
        case 0:
          setWidth(i_stimuli,i_component,i_feature);
          break;
        case 1:
          setAngle(i_stimuli,i_component,i_feature);
          break;
      }
      break;
    case 1:
      // GREEN LINE
      switch(i_feature){
        case 0:
          setHeight(i_stimuli,i_component,i_feature);
          break;
        case 1:
          setAngle(i_stimuli,i_component,i_feature);
          break;
      }
      break;
  }
}
function setWidth(i_stimuli,i_component,i_feature) {
  var i_allfeature = getIallfeature(i_stimuli,i_component,i_feature);
  var width   = board.stimuli[i_stimuli][i_component].rect[2] * (1.5 + sdata.vb_x[coding.index][i_allfeature]);
  board.stimuli[i_stimuli][i_component].object.attr({"width":  width});
  setCentre(board.stimuli[i_stimuli][i_component].object,board.stimuli[i_stimuli][i_component].centre);
}
function setHeight(i_stimuli,i_component,i_feature) {
  var i_allfeature = getIallfeature(i_stimuli,i_component,i_feature);
  var height  = board.stimuli[i_stimuli][i_component].rect[3] * (1.5 + sdata.vb_x[coding.index][i_allfeature]);
  board.stimuli[i_stimuli][i_component].object.attr({"height": height});
  setCentre(board.stimuli[i_stimuli][i_component].object,board.stimuli[i_stimuli][i_component].centre);
}
function setAngle(i_stimuli,i_component,i_feature) {
  var i_allfeature = getIallfeature(i_stimuli,i_component,i_feature);
  var angle  = sdata.vb_x[coding.index][i_allfeature]*30;
  var dangle = angle - board.stimuli[i_stimuli][i_component].angle;
  board.stimuli[i_stimuli][i_component].object.rotate(dangle);
  board.stimuli[i_stimuli][i_component].angle = angle;
}

<!-- Remove methods -->
function removeStimuli() {
  for(var i_stimuli=0;i_stimuli<board.stimuli.length;i_stimuli++){
    for(var i_component=0;i_component<board.stimuli[i_stimuli].length;i_component++){
      board.stimuli[i_stimuli][i_component].object.remove();
    }
  }
}
function removeInstructions() {
  board.instructions.object.remove();
}
function removeFeedback() {
  board.posfeedback.object.remove();
  board.negfeedback.object.remove();
}
function removeCounter(){
  board.trials.object.remove();
  board.blocks.object.remove();
}
function removePaper(){
  board.paper.object.remove();
}

<!-- Block methods -->
function newBlock() {
  hideTrial();
  hideFeedback();
  showPause();
  setTimeout(startBlock,parameters.block_timeout);
}
function startBlock() {
  hidePause();
  newTrial();
}

<!-- Trial methods -->
function nextTrial() {
  coding.index++;
  // end of experiment
  if (coding.index >= numbers.indices) {
    finishExperiment();
    return;
  }
  // next block or trial
  var switchBlock = ( (coding.index>0) && (sdata.vb_block[coding.index] != sdata.vb_block[coding.index-1]) );
  if(switchBlock) {
    newBlock();
  } else {
    newTrial();
  }
}
function newTrial() {
  // update
  updateCounter();
  updateStimuli();
  // show
  showTrial();
  // hide
  hideFeedback();
  // timestamp
  coding.timestamp = getTimestamp();
  // allow answering
  coding.answering = true;
}

