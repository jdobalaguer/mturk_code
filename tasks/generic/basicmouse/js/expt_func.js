

<!-- Response methods -->
function handleResponse(mouse_y) {
  if(coding.answering){
    coding.answering = false;
    saveResponse(mouse_y);
    showResponse();
    setTimeout(nextTrial,parameters.response_timeout);
  }
}
function saveResponse(mouse_y) {
  sdata.resp_ts[coding.index]      = getTimestamp();
  sdata.resp_rt[coding.index]      = getSecs(coding.timestamp);
  sdata.resp_mouse[coding.index]   = mouse_y;
  var resp_y = (parameters.responsebar_height + board.responsebar.rect[1] - mouse_y)/parameters.responsebar_height;
  sdata.resp_y[coding.index]       = resp_y;
  sdata.resp_error[coding.index]   = sdata.vb_y[coding.index] - sdata.resp_y[coding.index];
  if (Math.abs(sdata.resp_error[coding.index]) < parameters.resp_tolerance){
    sdata.resp_correct[coding.index] = 1;
  } else {
    sdata.resp_correct[coding.index] = 0;
  }
}

<!-- Show/Hide methods -->
function hideStimuli() {
  // HIDE STIMULI HERE
}
function showStimulus() {
  // SHOW STIMULI HERE
}
function showResponse() {
  // show response
  board.answer.rect[1] = sdata.resp_mouse[coding.index] - .5*parameters.answer_height;
  board.answer.answer.attr({"y": board.answer.rect[1]});
  board.answer.answer.attr({"opacity": 1});
  // show feedback
  var feedback = sdata.vb_y[coding.index];
  var y_feedback = board.responsebar.rect[1] + (parameters.responsebar_height * (1-feedback));
  board.feedback.center[1] = y_feedback - .5*parameters.answer_height;
  board.feedback.feedback.attr({"y": board.feedback.center[1]});
  board.feedback.feedback.attr({"opacity": 1});
}
function hideResponse() {
  // show response
  board.answer.rect[1] = 0;
  board.answer.answer.attr({"y": board.answer.rect[1]});
  board.answer.answer.attr({"opacity": 0});
  // show feedback
  board.feedback.center[1] = 0;
  board.feedback.feedback.attr({"y": board.feedback.center[1]});
  board.feedback.feedback.attr({"opacity": 0});
}
function showInstructions() {
  board.instructions.instructions.attr({"opacity": 1});
}
function hideInstructions() {
  board.instructions.instructions.attr({"opacity": 0});
}
function showCounter() {
  board.trials.trials.attr({"opacity": 1});
  board.blocks.blocks.attr({"opacity": 1});
}
function showBlock(){
  //hide anything else;
  hideStimuli();
  hideResponse();
  hideBar();
  hideInstructions();
  hideCounter();
  // change (text)
  board.change = {};
  board.change.center = board.paper.center;
  board.change.text = "A couple of seconds' break, then we'll do some more shapes";
  board.change.change = drawText(board.paper.paper,board.change.center,board.change.text);
  board.change.change.attr({"font-size": parameters.font_bigsize});
}
function hideBlock() {
  // hide block text
  board.change.change.remove();
  // show instructions
  showBar();
  showInstructions();
  showCounter();
}
function hideCounter() {
  board.trials.trials.attr({"opacity": 0});
  board.blocks.blocks.attr({"opacity": 0});
}
function showBar() {
  board.responsebar.responsebar.attr({"opacity": 1});
  board.responsebar.responsebar.attr({"fill": parameters.responsebar_fill});
  board.responselabel.responselabel.attr({"opacity": 1});
}
function hideBar() {
  board.responsebar.responsebar.attr({"opacity": 0});
  board.responsebar.responsebar.attr({"fill": "#FFF"});
  board.responselabel.responselabel.attr({"opacity": 0});
}

<!-- Update methods -->
function updateCounter() {
  board.trials.text = "So far you have done "+(sdata.vb_trial[coding.index]-1)+" out of "+numbers.trials+" trials";
  board.trials.trials.attr({"text": board.trials.text});
  board.blocks.text = "So far you have done "+(sdata.vb_block[coding.index]-1)+" out of "+numbers.blocks+" blocks";
  board.blocks.blocks.attr({"text": board.blocks.text});
}
function updateStimulus() {
  // UPDATE STIMULI HERE
}

<!-- Block methods -->
function newBlock() {
  showBlock();
  setTimeout(startBlock,parameters.block_timeout);
}
function startBlock() {
  hideBlock();
  newTrial();
}

<!-- Trial methods -->
function nextTrial() {
  coding.index++;
  // end of experiment
  hideResponse();
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
  updateStimulus();
  // hide
  hideResponse();
  // show
  hideStimuli();
  showStimulus();
  // timestamp
  coding.timestamp = getTimestamp();
  // allow answering
  coding.answering = true;
}

