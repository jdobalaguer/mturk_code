
var numbers;
var sdata;
var edata;
var parameters;
var board;
var coding;

function setExperiment() {

  // NUMBERS --------------
  numbers = {};
  numbers.stimuli = 2;
  numbers.components = 2;
  numbers.features = 2;
  numbers.weights  = numbers.stimuli * numbers.components * numbers.features;

  numbers.blocks  = 40;
  numbers.trials  = 25;
  numbers.indices = numbers.trials * numbers.blocks;

  // PARAMETERS -----------
  parameters = {};
  // tolerance
  parameters.minimum_performance = -1;
  //time outs
  parameters.block_timeout           = 5000;
  parameters.response_timeout        = 1000;
  // task parameters
  parameters.task_kappa = 0;
  parameters.task_stimuli   = taskStimuli();
  parameters.task_component = taskComponent();
  parameters.task_feature   = taskFeature();
  parameters.task_sign      = taskSign();
  parameters.task_weights   = taskWeights();

  var data = createSdata();

  // EDATA ----------------
  //pars
  edata = data.edata;
  // exp
  edata.exp_subject = participant_id;
  edata.exp_sex     = participant_gender;
  edata.exp_age     = participant_age;
  edata.exp_task    = participant_task;

  // SDATA ----------------
  // vb
  sdata = data.sdata;
  // resp
  sdata.resp_timestamp    = [];
  sdata.resp_reactiontime = [];
  sdata.resp_key          = [];
  sdata.resp_category     = [];
  sdata.resp_correct      = [];
  sdata.resp_error        = [];

  // BOARD ----------------
  board = {};

  // CODING ---------------
  coding = {};
  coding.index = 0;
  coding.answering = false;
  coding.webfile   = '';
  coding.timestamp = NaN;
}

function getIallfeature(i_stimuli,i_component,i_feature) {
  var i_allfeature = 0;
  i_allfeature += i_stimuli   * (numbers.components * numbers.features);
  i_allfeature += i_component * (numbers.features);
  i_allfeature += i_feature;
  return i_allfeature;
}
function taskStimuli()    { return randi(numbers.stimuli-1);  }
function taskComponent()  { return randi(numbers.components-1);  }
function taskFeature()    { return randi(numbers.features-1); }
function taskSign()       { return (2*randi(1)-1); }
function taskWeights() {
  var task_weights = zeros(numbers.weights);
  var index_S1 = getIallfeature(parameters.task_stimuli,parameters.task_component,parameters.task_feature);
  task_weights[index_S1] = parameters.task_sign * (1-abs(parameters.task_kappa));
  var index_S2 = getIallfeature(1-parameters.task_stimuli,parameters.task_component,parameters.task_feature);
  task_weights[index_S2] = parameters.task_sign * (parameters.task_kappa);
  return task_weights;
}