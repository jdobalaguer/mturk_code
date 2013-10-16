

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
  board.stimulusbar.stimulusbar.attr({"opacity":0});
  board.stimulusline.stimulusline.attr({"opacity":0});
  board.stimulustriangle.stimulustriangle.attr({"opacity":0});
  board.stimulusellipse.stimulusellipse.attr({"opacity":0});
}
function showStimulus() {
  switch(sdata.vb_shape[coding.index]){
    case 0:
      board.stimulusbar.stimulusbar.attr({"opacity":1});
      board.stimulusline.stimulusline.attr({"opacity":1});
      break;
    case 1:
      board.stimulustriangle.stimulustriangle.attr({"opacity":1});
      board.stimulusellipse.stimulusellipse.attr({"opacity":1});
      break;
  }
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
  resetStimuli();
  switch (sdata.vb_shape[coding.index]) {
    case 0:
      updateBar();
      updateLine();
      break;
    case 1:
      updateTriangle();
      updateEllipse();
      break;
  }
}
function resetStimuli() {
  // bar fill
  board.stimulusbar.stimulusbar.attr({"fill":   Raphael.rgb(255, 0, 0)});
  // bar height
  board.stimulusbar.stimulusbar.attr({"height": board.stimulusbar.rect[3]});
  board.stimulusbar.stimulusbar.attr({"y":      board.stimulusbar.rect[1]});
  // bar rotation
  board.stimulusbar.stimulusbar.rotate(-board.stimulusbar.angle);
  board.stimulusbar.angle = 0;
  
  // line fill
  board.stimulusline.stimulusline.attr({"fill": Raphael.rgb(0, 255, 0)});
  // line height
  board.stimulusline.stimulusline.attr({"height": board.stimulusline.rect[3]});
  board.stimulusline.stimulusline.attr({"y":      board.stimulusline.rect[1]});
  // line rotation
  board.stimulusline.stimulusline.rotate(-board.stimulusline.angle);
  board.stimulusline.angle = 0;

  // triangle fill
  var stimulustriangle_fill = Raphael.rgb(0, 0, 255);
  // triangle path
  board.stimulustriangle.stimulustriangle.attr({"fill": stimulustriangle_fill});
  var stimulustriangle_width  = parameters.stimulustriangle_width;
  var stimulustriangle_height = parameters.stimulustriangle_height;
  var stimulustriangle_points = [
                                  [ board.paper.center[0],
                                    board.paper.center[1] - .5*stimulustriangle_height ],
                                  [ board.paper.center[0] - .5*stimulustriangle_width,
                                    board.paper.center[1] + .5*stimulustriangle_height ],
                                  [ board.paper.center[0] + .5*stimulustriangle_width,
                                    board.paper.center[1] + .5*stimulustriangle_height ]
                                ];
  var stimulustriangle_path   = pathTriangle(stimulustriangle_points);
  board.stimulustriangle.stimulustriangle.attr({"path": stimulustriangle_path});
  // triangle rotation
  board.stimulustriangle.stimulustriangle.rotate(-board.stimulustriangle.angle);
  board.stimulustriangle.angle = 0;

  // ellipse fill
  board.stimulusellipse.stimulusellipse.attr({"fill": Raphael.rgb(0, 255, 0)});
  // ellipse height
  board.stimulusellipse.stimulusellipse.attr({"height": board.stimulusellipse.rect[3]});
  board.stimulusellipse.stimulusellipse.attr({"y":      board.stimulusellipse.rect[1]});
  // ellipse rotation
  board.stimulusellipse.stimulusellipse.rotate(-board.stimulusellipse.angle);
  board.stimulusellipse.angle = 0;  
}
function updateBar() {
  switch (sdata.vb_d1[coding.index]) {
    case 0:
      var stimulusbar_fill = Raphael.rgb(255 * sdata.vb_x1[coding.index], 0, 0);
      board.stimulusbar.stimulusbar.attr({"fill": stimulusbar_fill});
      break;
    case 1:
      var stimulusbar_height  = board.stimulusbar.rect[3] * (1+sdata.vb_x1[coding.index]);
      var stimulusbar_y       = board.stimulusbar.center[1] - .5* stimulusbar_height;
      board.stimulusbar.stimulusbar.attr({"height": stimulusbar_height});
      board.stimulusbar.stimulusbar.attr({"y":      stimulusbar_y});
      break;
    case 2:
      var stimulusbar_angle  = sdata.vb_x1[coding.index]*60-30;
      var stimulusbar_dangle = stimulusbar_angle - board.stimulusbar.angle;
      board.stimulusbar.stimulusbar.rotate(stimulusbar_dangle);
      board.stimulusbar.angle = stimulusbar_angle;
      break;
  }
}
function updateLine() {
  switch (sdata.vb_d2[coding.index]) {
    case 2:
      var stimulusline_fill = Raphael.rgb(0, 255 * sdata.vb_x2[coding.index], 0);
      board.stimulusline.stimulusline.attr({"fill": stimulusline_fill});
      break;
    case 0:
      var stimulusline_height  = board.stimulusline.rect[3] * (1+sdata.vb_x2[coding.index]);
      var stimulusline_y       = board.stimulusline.center[1] - .5* stimulusline_height;
      board.stimulusline.stimulusline.attr({"height": stimulusline_height});
      board.stimulusline.stimulusline.attr({"y":      stimulusline_y});
      break;
    case 1:
      var stimulusline_angle  = sdata.vb_x2[coding.index]*60-30;
      var stimulusline_dangle = stimulusline_angle - board.stimulusline.angle;
      board.stimulusline.stimulusline.rotate(stimulusline_dangle);
      board.stimulusline.angle = stimulusline_angle;
      break;
  }
}
function updateTriangle() {
  switch (sdata.vb_d1[coding.index]) {
    case 0:
      var stimulustriangle_fill = Raphael.rgb(0, 0, 255 * sdata.vb_x1[coding.index]);
      board.stimulustriangle.stimulustriangle.attr({"fill": stimulustriangle_fill});
      break;
    case 1:
      var stimulustriangle_width  = parameters.stimulustriangle_width * (1+sdata.vb_x1[coding.index]);
      var stimulustriangle_height = parameters.stimulustriangle_height;
      var stimulustriangle_points = [
                                      [ board.paper.center[0],
                                        board.paper.center[1] - .5*stimulustriangle_height ],
                                      [ board.paper.center[0] - .5*stimulustriangle_width,
                                        board.paper.center[1] + .5*stimulustriangle_height ],
                                      [ board.paper.center[0] + .5*stimulustriangle_width,
                                        board.paper.center[1] + .5*stimulustriangle_height ]
                                    ];
      var stimulustriangle_path   = pathTriangle(stimulustriangle_points);
      board.stimulustriangle.stimulustriangle.attr({"path": stimulustriangle_path});
      break;
    case 2:
      var stimulustriangle_angle  = sdata.vb_x1[coding.index]*60-30;
      var stimulustriangle_dangle = stimulustriangle_angle - board.stimulustriangle.angle;
      board.stimulustriangle.stimulustriangle.rotate(stimulustriangle_dangle);
      board.stimulustriangle.angle = stimulustriangle_angle;
      break;
  }
}
function updateEllipse() {
  switch (sdata.vb_d2[coding.index]) {
    case 0:
      var stimulusellipse_fill = Raphael.rgb(0, 255 * sdata.vb_x2[coding.index], 0);
      board.stimulusellipse.stimulusellipse.attr({"fill": stimulusellipse_fill});
      break;
    case 1:
      var stimulusellipse_height  = board.stimulusellipse.rect[3] / (1+sdata.vb_x2[coding.index]);
      board.stimulusellipse.stimulusellipse.attr({"ry": stimulusellipse_height});
      break;
    case 2:
      var stimulusellipse_angle  = sdata.vb_x2[coding.index]*60-30;
      var stimulusellipse_dangle = stimulusellipse_angle - board.stimulusellipse.angle;
      board.stimulusellipse.stimulusellipse.rotate(stimulusellipse_dangle);
      board.stimulusellipse.angle = stimulusellipse_angle;
      break;
  }
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

