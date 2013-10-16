function createSdata(numbers) {
  var sdata = {};
  var edata = {};

  // set numbers
  var nb_blocks = numbers.blocks;
  var nb_values = numbers.values;
  var nb_trials = numbers.trials;
  var nb_indices = numbers.indices;
  var nb_funcs  = numbers.funcs;
  var nb_shapes = numbers.shapes;

  // set variables randomly
  var funcs  = randi(nb_funcs-1,  2);
  var shapes = randi(nb_shapes-1, 2);
  // set switch
  edata.pars_fswitch = (funcs[0] != funcs[1]);
  edata.pars_sswitch = (shapes[0] != shapes[1]);

  // declare variables
  sdata.vb_index = colon(1,nb_indices);;
  sdata.vb_block = [];
  sdata.vb_trial = [];
  sdata.vb_d1    = [];
  sdata.vb_d2    = [];
  sdata.vb_x1    = [];
  sdata.vb_x2    = [];
  sdata.vb_y     = [];
  sdata.vb_shape = [];
  sdata.vb_func  = [];
  // set all blocks but the last one
  var block;
  for (var i_block=1; i_block<=(nb_blocks-1); i_block++) {
    block = createBlock(i_block,numbers,funcs[0],shapes[0]);
    sdata.vb_block    = sdata.vb_block.concat(block.vb_block);
    sdata.vb_trial    = sdata.vb_trial.concat(block.vb_trial);
    sdata.vb_d1       = sdata.vb_d1.concat(block.vb_d1);
    sdata.vb_d2       = sdata.vb_d2.concat(block.vb_d2);
    sdata.vb_x1       = sdata.vb_x1.concat(block.vb_x1);
    sdata.vb_x2       = sdata.vb_x2.concat(block.vb_x2);
    sdata.vb_y        = sdata.vb_y.concat(block.vb_y);
    sdata.vb_shape    = sdata.vb_shape.concat(block.vb_shape);
    sdata.vb_func     = sdata.vb_func.concat(block.vb_func);
  }
  // set last block
  block = createBlock(nb_blocks,numbers,funcs[1],shapes[1]);
  sdata.vb_block    = sdata.vb_block.concat(block.vb_block);
  sdata.vb_trial    = sdata.vb_trial.concat(block.vb_trial);
  sdata.vb_d1       = sdata.vb_d1.concat(block.vb_d1);
  sdata.vb_d2       = sdata.vb_d2.concat(block.vb_d2);
  sdata.vb_x1       = sdata.vb_x1.concat(block.vb_x1);
  sdata.vb_x2       = sdata.vb_x2.concat(block.vb_x2);
  sdata.vb_y        = sdata.vb_y.concat(block.vb_y);
  sdata.vb_shape    = sdata.vb_shape.concat(block.vb_shape);
  sdata.vb_func     = sdata.vb_func.concat(block.vb_func);
  // return
  var data = {};
  data.sdata = sdata;
  data.edata = edata;
  return data;
}

function createBlock(i_block,numbers,func,shape) {
  var sdata = {};
  var nb_values = numbers.values;
  var nb_samples = numbers.samples;
  var nb_trials = numbers.trials;
  //set values
  var xx = createX(nb_values);
  sdata.vb_block = replicateArray(i_block,nb_trials);
  sdata.vb_trial = colon(1,nb_trials);
  sdata.vb_d1 = replicateArray(randi(2),nb_trials);
  sdata.vb_d2 = replicateArray(randi(2),nb_trials);
  sdata.vb_x1 = xx[0];
  sdata.vb_x2 = xx[1];
  sdata.vb_y  = createY(xx,func);
  sdata.vb_shape = replicateArray([shape],nb_trials);
  sdata.vb_func  = replicateArray([func ],nb_trials);
  // return
  return sdata;
}

// create the XY data
function createX(nb_values) {
  var values = linspace(0,1,nb_values);
  var x1 = [];
  var x2 = [];
  var k = 0;
  for (var i=0; i<nb_values; i++){
    for (var j=0; j<nb_values; j++){
      x1[k] = values[i];
      x2[k] = values[j];
      k++;
    }
  }
  // shuffle all
  var nb_trials = nb_values*nb_values;
  var ii_shuffle = shuffleArray(colon(0,nb_trials-1));
  var new_x1 = [];
  var new_x2 = [];
  for (var i=0; i<nb_trials; i++){
    new_x1[i] = x1[ii_shuffle[i]];
    new_x2[i] = x2[ii_shuffle[i]];
  }
  return [new_x1, new_x2];
}

function createY(xx,func) {
  var y = [];
  for (var i = 0; i < xx[0].length; i++) {
    var y0, y1;
    switch(func){
      case 0:
        var y0 = normpdf(xx[0][i],0.5,0.5)/normpdf(0,0,0.5);
        var y1 = normpdf(xx[1][i],0.5,0.5)/normpdf(0,0,0.5);
        y[i] = (y0 * y1);
        break;
      case 1:
        var y0 = 2 * normcdf(0,0.5,xx[0][i]) - 1;
        var y1 = 2 * normcdf(0,0.5,xx[1][i]) - 1;
        y[i] = (.5*(y0*y1 + 1));
        break;
    }
  }
  return y;
}


