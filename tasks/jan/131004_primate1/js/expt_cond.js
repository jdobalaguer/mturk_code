function createSdata() {
  var sdata = {};
  var edata = {};

  // set numbers
  var nb_blocks = numbers.blocks;
  var nb_trials = numbers.trials;
  var nb_indices = numbers.indices;
  var nb_weights = numbers.weights;

  // declare variables
  sdata.vb_index = colon(1,nb_indices);
  sdata.vb_block = [];
  sdata.vb_trial = [];
  sdata.vb_x     = [];
  sdata.vb_b     = [];
  sdata.vb_y     = [];
  sdata.vb_category = [];
  // set blocks
  var block;
  for (var i_block=1; i_block<=nb_blocks; i_block++) {
    block = createBlock(i_block);
    sdata.vb_block    = sdata.vb_block.concat(block.vb_block);
    sdata.vb_trial    = sdata.vb_trial.concat(block.vb_trial);
    sdata.vb_x        = sdata.vb_x.concat(block.vb_x);
    sdata.vb_b        = sdata.vb_b.concat(block.vb_b);
    sdata.vb_y        = sdata.vb_y.concat(block.vb_y);
    sdata.vb_category = sdata.vb_category.concat(block.vb_category);
  }
  // return
  var data = {};
  data.sdata = sdata;
  data.edata = edata;
  return data;
}

function createBlock(i_block) {
  var sdata = {};
  var nb_trials = numbers.trials;
  //set values
  sdata.vb_block = replicateArray(i_block,nb_trials);
  sdata.vb_trial = colon(1,nb_trials);
  sdata.vb_x  = createX();
  sdata.vb_b  = createB();
  sdata.vb_y  = createY(sdata.vb_x,sdata.vb_b);
  sdata.vb_category = createCategory(sdata.vb_y);
  // return
  return sdata;
}

// create the XY data
function createX() {
  var nb_trials     = numbers.trials;
  var nb_stimuli    = numbers.stimuli;
  var nb_components = numbers.components;
  var nb_features   = numbers.features;
  var nb_weights    = numbers.weights;
  // create conditions
  var x = [];
  for (var i_trial=0; i_trial<nb_trials; i_trial++){
    x[i_trial] = zeros(nb_weights);
    for (var i_stimuli  =0; i_stimuli  <nb_stimuli;    i_stimuli++){
    for (var i_component=0; i_component<nb_components; i_component++){
    for (var i_feature  =0; i_feature  <nb_features;   i_feature++){
      i_allfeature = getIallfeature(i_stimuli,i_component,i_feature);
      switch(i_feature){
        case parameters.task_feature:
          x[i_trial][i_allfeature] = randunif(1,-1,1);
          break;
      }
    }
    }
    }
  }
  return x;
}

function createB() {
  var nb_trials = numbers.trials;
  var nb_weights = numbers.weights;
  var b = [];
  for (var i_trial=0; i_trial<nb_trials; i_trial++){
    b[i_trial] = parameters.task_weights;
  }
  return b;
}

function createY(x,b) {
  var nb_trials = numbers.trials;
  var y = [];
  for (var i_trial=0; i_trial<nb_trials; i_trial++){
    y[i_trial] = dot(x[i_trial],b[i_trial]);
  }
  return y;
}

function createCategory(y) {
  var nb_trials = numbers.trials;
  var c = [];
  for (var i_trial=0; i_trial<nb_trials; i_trial++){
    c[i_trial] = bin2num(y[i_trial]>0);
  }
  return c;
}


