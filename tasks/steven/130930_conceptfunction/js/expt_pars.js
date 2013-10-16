
var numbers;
var sdata;
var edata;
var parameters;
var board;
var coding;

function setExperiment() {

  // set numbers
  numbers = {};
  numbers.blocks  = 20;
  numbers.values  = 5;
  numbers.trials  = numbers.values * numbers.values;
  numbers.indices = numbers.trials * numbers.blocks;
  numbers.funcs   = 2;
  numbers.shapes  = 2;

  var data = createSdata(numbers);
  // EDATA
  //pars
  edata = data.edata;
  // exp
  edata.exp_sub = participant_id;
  edata.exp_sex = participant_gender;
  edata.exp_age = participant_age;
  // SDATA
  // vb
  sdata = data.sdata;
  // resp
  sdata.resp_ts       = [];
  sdata.resp_rt       = [];
  sdata.resp_mouse    = [];
  sdata.resp_y        = [];
  sdata.resp_correct  = [];
  sdata.resp_error    = [];

  // PARAMETERS
  parameters = {};
  // tolerance
  parameters.resp_tolerance = 0.25;
  parameters.minimum_performance = 0;
  // fonts
  parameters.font_bigsize   = 20;
  parameters.font_medsize   = 15;
  parameters.font_tinysize  = 12;
  // instructions
  parameters.instructions_text  = "Click on the bar to the right of the shape\nWe will tell you the right answer, then we'll go on to the next trial\nJust keep on clicking - try to get as near the right answer as you can\nThere'll be a pause every so often";
  //time outs
  parameters.block_timeout           = 5000;
  parameters.response_timeout        = 1000;
  // paper
  parameters.paper_marge    = 10;
  // stimulus
  parameters.stimulusbar_width       = 50;
  parameters.stimulusbar_height      = 80;
  parameters.stimulusline_width      = 10;
  parameters.stimulusline_height     = 150;
  parameters.stimulustriangle_width  = 100;
  parameters.stimulustriangle_height = 100;
  parameters.stimulusellipse_width   = 20;
  parameters.stimulusellipse_height  = 40;
  // response
  parameters.answer_width    = 20;
  parameters.answer_height   = 3;
  parameters.answer_colour   = "blue";
  parameters.responselabel_colour = "#F00"
  parameters.responsebar_height = 400;
  parameters.responsebar_width  = 15;
  parameters.responsebar_fill   = "#CCC";

  // BOARD
  board = {};

  // CODING
  coding = {};
  coding.index = 0;
  coding.answering = false;
  coding.webfile   = "";
  coding.timestamp = NaN;
}
