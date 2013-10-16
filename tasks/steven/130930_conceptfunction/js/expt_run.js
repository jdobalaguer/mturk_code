function runExperiment(){
  board = {};
  // paper (paper)
  board.paper = {};
  board.paper.width  = window.innerWidth;
  board.paper.height = window.innerHeight;
  board.paper.center = [.5*board.paper.width , .5*board.paper.height];
  board.paper.marge  = parameters.paper_marge;
  board.paper.rect   = [ board.paper.marge,
                        board.paper.marge,
                        board.paper.width-2*board.paper.marge,
                        board.paper.height-2*board.paper.marge
                      ];
  board.paper.paper = drawPaper(board.paper.rect);

  // TEXT
  // instructions (text)
  board.instructions = {};
  board.instructions.center       = [board.paper.center[0], 50];
  board.instructions.text         = parameters.instructions_text;
  board.instructions.instructions = drawText(board.paper.paper,board.instructions.center,board.instructions.text);
  board.instructions.instructions.attr({"font-size": parameters.font_medsize});
  board.instructions.instructions.attr({"text-anchor": "left"});

  //STIMULI 1
  // stimulusbar (rect)
  board.stimulusbar = {};
  board.stimulusbar.rect = [  board.paper.center[0] - .5*parameters.stimulusbar_width,
                      board.paper.center[1] - .5*parameters.stimulusbar_height,
                      parameters.stimulusbar_width,
                      parameters.stimulusbar_height
                    ];
  board.stimulusbar.center = getCenter(board.stimulusbar.rect);
  board.stimulusbar.angle = 0;
  board.stimulusbar.stimulusbar = drawRect(board.paper.paper,board.stimulusbar.rect);
  board.stimulusbar.stimulusbar.attr({"fill": "#F00"});
  // stimulusline (rect)
  board.stimulusline = {};
  board.stimulusline.rect = [ board.paper.center[0] - .5*parameters.stimulusline_width,
                      board.paper.center[1] - .5*parameters.stimulusline_height,
                      parameters.stimulusline_width,
                      parameters.stimulusline_height
                    ];
  board.stimulusline.center = getCenter(board.stimulusline.rect);
  board.stimulusline.angle = 0;
  board.stimulusline.stimulusline = drawRect(board.paper.paper,board.stimulusline.rect);
  board.stimulusline.stimulusline.attr({"fill": "#0F0"});
  // stimulustriangle (path)
  board.stimulustriangle = {};
  board.stimulustriangle.points = [
                            [ board.paper.center[0],
                              board.paper.center[1] - .5*parameters.stimulustriangle_height ],
                            [ board.paper.center[0] - .5*parameters.stimulustriangle_width,
                              board.paper.center[1] + .5*parameters.stimulustriangle_height ],
                            [ board.paper.center[0] + .5*parameters.stimulustriangle_width,
                              board.paper.center[1] + .5*parameters.stimulustriangle_height ]
                          ];
  board.stimulustriangle.path     = pathTriangle(board.stimulustriangle.points);
  board.stimulustriangle.angle = 0;
  board.stimulustriangle.stimulustriangle = drawPath(board.paper.paper,board.stimulustriangle.path);
  board.stimulustriangle.stimulustriangle.attr({"fill": "#00F"});
  //stimulusellipse (ellipsoid)
  board.stimulusellipse = {};
  board.stimulusellipse.rect = [  board.paper.center[0],
                                  board.paper.center[1],
                                  parameters.stimulusellipse_width,
                                  parameters.stimulusellipse_height
                                ];
  board.stimulusellipse.center = [board.paper.center[0],board.paper.center[1]];
  board.stimulusellipse.angle = 0;
  board.stimulusellipse.stimulusellipse = drawEllipsoid(board.paper.paper,board.stimulusellipse.rect);
  board.stimulusellipse.stimulusellipse.attr({"fill": "#F0F"});


  // COUNTERS
  // trials (text)
  board.trials = {};
  board.trials.center = [board.paper.center[0], board.paper.rect[3] - 40];
  board.trials.text   = '';
  board.trials.trials = drawText(board.paper.paper,board.trials.center,'');
  board.trials.trials.attr({"font-size": parameters.font_medsize});
  // blocks (text)
  board.blocks = {};
  board.blocks.center = [board.paper.center[0], board.paper.rect[3] - 20];
  board.blocks.text   = '';
  board.blocks.blocks = drawText(board.paper.paper,board.blocks.center,'');
  board.blocks.blocks.attr({"font-size": parameters.font_medsize});
  
  // RESPONSE BAR
  // responsebar (rect)
  board.responsebar = {};
  board.responsebar.rect  = [ board.paper.rect[2]   - 100,
                              board.paper.center[1] - .5*parameters.responsebar_height,
                              parameters.responsebar_width,
                              parameters.responsebar_height ];
  board.responsebar.center = getCenter(board.responsebar.rect);
  board.responsebar.responsebar = drawRect(board.paper.paper,board.responsebar.rect);
  board.responsebar.responsebar.attr({"fill": parameters.responsebar_fill});
  board.responsebar.responsebar.click(function(e) {
    handleResponse(e.layerY);
  });
  // responselabel (text)
  board.responselabel = {};
  board.responselabel.center  = [ board.responsebar.rect[0],
                                  board.responsebar.rect[1]-20];
  board.responselabel.text    = "Response bar - click here\u2193";
  board.responselabel.responselabel   = drawText(board.paper.paper,board.responselabel.center,board.responselabel.text);
  board.responselabel.responselabel.attr({"font-size": parameters.font_medsize});
  board.responselabel.responselabel.attr({"fill": parameters.responselabel_colour});

  // FEEDBACK
  // answer (rect)
  board.answer = {};
  board.answer.rect   = [board.responsebar.center[0]-.5*parameters.answer_width, 0, parameters.answer_width, parameters.answer_height];
  board.answer.answer = drawRect(board.paper.paper,board.answer.rect);
  board.answer.answer.attr({"fill": parameters.answer_colour});
  // feedback (text)
  board.feedback = {};
  board.feedback.center   = [board.responsebar.rect[0]+board.responsebar.rect[2], 0];
  board.feedback.text     = "\u2190 Correct value";
  board.feedback.feedback = drawText(board.paper.paper,board.feedback.center,board.feedback.text);
  board.feedback.feedback.attr({"text-anchor": "start"});
  board.feedback.feedback.attr({"font-size": parameters.font_tinysize});

  newTrial();
}

