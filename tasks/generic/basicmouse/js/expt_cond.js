function createSdata(numbers) {
  var sdata = {};
  var edata = {};

  // set numbers
  var nb_blocks = numbers.blocks;
  var nb_values = numbers.values;
  var nb_samples = numbers.samples;
  var nb_trials = numbers.trials;
  var nb_indices = numbers.indices;

  // declare variables
  sdata.vb_index = colon(1,nb_indices);;
  sdata.vb_block = [];
  sdata.vb_trial = [];
  sdata.vb_x1    = [];
  sdata.vb_x2    = [];
  sdata.vb_y     = [];
  // set all blocks but the last one
  var block;
  for (var i_block=1; i_block<=nb_blocks; i_block++) {
    block = createBlock(i_block,numbers);
    sdata.vb_block    = sdata.vb_block.concat(block.vb_block);
    sdata.vb_trial    = sdata.vb_trial.concat(block.vb_trial);
    sdata.vb_x1       = sdata.vb_x1.concat(block.vb_x1);
    sdata.vb_x2       = sdata.vb_x2.concat(block.vb_x2);
    sdata.vb_y        = sdata.vb_y.concat(block.vb_y);
  }
  // return
  var data = {};
  data.sdata = sdata;
  data.edata = edata;
  return data;
}

function createBlock(i_block,numbers) {
  var sdata = {};
  var nb_values = numbers.values;
  var nb_samples = numbers.samples;
  var nb_trials = numbers.trials;
  //set values
  sdata.vb_block = replicateArray(i_block,nb_trials);
  sdata.vb_trial = colon(1,nb_trials);

  // CHANGE VALUES HERE
  // SO THAT THEY DEFINE YOUR CONDITIONS
  sdata.vb_x1 = shuffleArray(replicateArray(linspace(0,1,nb_values),nb_samples));
  sdata.vb_x2 = shuffleArray(replicateArray(linspace(0,1,nb_values),nb_samples));
  sdata.vb_y  = shuffleArray(replicateArray(linspace(0,1,nb_values),nb_samples));

  // return
  return sdata;
}
