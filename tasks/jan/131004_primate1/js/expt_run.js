function runExperiment(){
  board = {};
  // fonts
  board.font_bigsize   = 20;
  board.font_medsize   = 15;
  board.font_tinysize  = 12;
  // paper (paper)
  board.paper = {};
  board.paper.width  = window.innerWidth;
  board.paper.height = window.innerHeight;
  board.paper.centre = [.5*board.paper.width , .5*board.paper.height];
  board.paper.marge  = 10;
  board.paper.rect   = [ board.paper.marge,
                        board.paper.marge,
                        board.paper.width-2*board.paper.marge,
                        board.paper.height-2*board.paper.marge
                      ];
  board.paper.object = drawPaper(board.paper.rect);

  // TEXT
  // instructions (text)
  board.instructions = {};
  board.instructions.centre       = [board.paper.centre[0], 80];
  board.instructions.text         = "For some pairs of shapes you should press LEFT and for some others you should press RIGHT\nTry to learn which ones correspond to which!\n \nPlease respond using the arrows in your keyboard\nAfter every trial you will get a feedback 'CORRECT' or 'INCORRECT' on the center of the screen\n \nJust keep on trying - it will get easier with more time";
  board.instructions.object       = drawText(board.paper.object,board.instructions.centre,board.instructions.text);
  board.instructions.object.attr({"font-size": board.font_medsize});
  board.instructions.object.attr({"text-anchor": "left"});

  //STIMULI 1
  // stimuli
  board.stimuli = [];
  for (var i_stimuli=0; i_stimuli<numbers.stimuli; i_stimuli++) {
    var stimulus_centre = [ board.paper.rect[0] + ((i_stimuli+1)/(numbers.stimuli+1))*board.paper.rect[2],
                            board.paper.centre[1]
                          ];

    board.stimuli[i_stimuli] = [];
    board.stimuli[i_stimuli] = [];
    // stimuli bar (rect)
    board.stimuli[i_stimuli][0] = {};
    board.stimuli[i_stimuli][0].width       = 100;
    board.stimuli[i_stimuli][0].height      = 40;
    board.stimuli[i_stimuli][0].centre      = stimulus_centre;
    board.stimuli[i_stimuli][0].rect = [ stimulus_centre[0] - .5*board.stimuli[i_stimuli][0].width,
                                                    stimulus_centre[1] - .5*board.stimuli[i_stimuli][0].height,
                                                    board.stimuli[i_stimuli][0].width,
                                                    board.stimuli[i_stimuli][0].height
                                                  ];
    board.stimuli[i_stimuli][0].angle = 0;
    board.stimuli[i_stimuli][0].colour = "#F00";
    board.stimuli[i_stimuli][0].object = drawRect(board.paper.object,board.stimuli[i_stimuli][0].rect);
    board.stimuli[i_stimuli][0].object.attr({"fill": board.stimuli[i_stimuli][0].colour});
    // stimuli line (rect)
    board.stimuli[i_stimuli][1] = {};
    board.stimuli[i_stimuli][1].width       = 15;
    board.stimuli[i_stimuli][1].height      = 100;
    board.stimuli[i_stimuli][1].centre      = stimulus_centre;
    board.stimuli[i_stimuli][1].rect = [ stimulus_centre[0] - .5*board.stimuli[i_stimuli][1].width,
                                                    stimulus_centre[1] - .5*board.stimuli[i_stimuli][1].height,
                                                    board.stimuli[i_stimuli][1].width,
                                                    board.stimuli[i_stimuli][1].height
                                                  ];
    board.stimuli[i_stimuli][1].angle = 0;
    board.stimuli[i_stimuli][1].colour = "#0F0";
    board.stimuli[i_stimuli][1].object = drawRect(board.paper.object,board.stimuli[i_stimuli][1].rect);
    board.stimuli[i_stimuli][1].object.attr({"fill": board.stimuli[i_stimuli][1].colour});
  }

  // COUNTERS
  // trials (text)
  board.trials = {};
  board.trials.centre = [board.paper.centre[0], board.paper.rect[3] - 40];
  board.trials.text   = '';
  board.trials.object = drawText(board.paper.object,board.trials.centre,'');
  board.trials.object.attr({"font-size": board.font_medsize});
  // blocks (text)
  board.blocks = {};
  board.blocks.centre = [board.paper.centre[0], board.paper.rect[3] - 20];
  board.blocks.text   = '';
  board.blocks.object = drawText(board.paper.object,board.blocks.centre,'');
  board.blocks.object.attr({"font-size": board.font_medsize});

  // FEEDBACK
  // posfeedback (text)
  board.posfeedback = {};
  board.posfeedback.centre   = board.paper.centre;
  board.posfeedback.text     = "Correct";
  board.posfeedback.colour   = "#080";
  board.posfeedback.object   = drawText(board.paper.object,board.posfeedback.centre,board.posfeedback.text);
  board.posfeedback.object.attr({"font-size": board.font_bigsize});
  board.posfeedback.object.attr({"fill": board.posfeedback.colour});
  // negfeedback (text)
  board.negfeedback = {};
  board.negfeedback.centre   = board.paper.centre;
  board.negfeedback.text     = "Incorrect";
  board.negfeedback.colour   = "#800";
  board.negfeedback.object   = drawText(board.paper.object,board.negfeedback.centre,board.negfeedback.text);
  board.negfeedback.object.attr({"font-size": board.font_bigsize});
  board.negfeedback.object.attr({"fill": board.negfeedback.colour});

  // BIND KEYS
  jwerty.key('←',handleLeft);
  jwerty.key('→',handleRight);

  // NEW TRIAl
  newTrial();
}

