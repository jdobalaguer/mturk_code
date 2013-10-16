
function swap(array,i,j) {
  var temp;
  temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}

function bin2num(b) {
  if (b) {
    return 1;
  } else {
    return 0;
  }
}
function num2bin(n) {
  if (b) {
    return true;
  } else {
    return false;
  }
}

function toPrecision(x,n){
  var s = x.toFixed(n);
  return str2num(s);
}

<!-- Array methods -->
function createArray(k,s) {
  var s = [].concat(s);
  var t = copyArray(s);
  var n = t.splice(0,1);
  var y = [];
  for(var i=0; i<n; i++){
    if(t.length){
      y[i] = createArray(k,t);
    } else {
      y[i] = k;
    }
  }
  return y;
}

function copyArray(array) {
  return [].concat(array);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      array = swap(array,i,j);
  }
  return array;
}

function normalizeArray(y) {
  var max_y = Math.max.apply(Math, y);
  var i;
  for (i=0; i<y.length; i++) {
    y[i] = y[i] / max_y;
  }
  return y;
}

function replicateArray(x,k) {
  x = [].concat(x);
  var y = x;
  var i;
  for(i=1; i<k; i++) {
    y = y.concat(x);
  }
  return y;
}
