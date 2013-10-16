
<!-- MATLAB methods -->

function size(v) {
  var s = [];
  switch(typeof(v)) {
    case 'number':
      return [1];
      break;
    case 'object':
      s = [v.length].concat(size(v[0]));
      break;
  }
  if (s.length>1 && typeof(s[s.length-1])=='undefined') {
    s.pop();
  }
  if (s.length>1 && s[s.length-1]==1) {
    s.pop();
  }
  return s;
}

function numel(v) {
  return prod(size(v));
}

function zeros(s) {
  return createArray(0,s);
}

function ones(s) {
  return createArray(1,s);
}

function abs(v) {
  if (typeof(v)=="number"){
    return Math.abs(v);
  }
  for (var i=0; i<v.length; i++) {
    v[i] = Math.abs(v[i]);
  }
  return v;
}

function power(v,p) {
  if (typeof(v)=="number"){
    return Math.pow(v,p);
  }
  for (var i=0; i<v.length; i++) {
    v[i] = Math.pow(v[i],p);
  }
  return v;  
}

function dot(v,w) {
  var s = 0;
  for (var i=0; i<v.length; i++) {
    s += v[i] * w[i];
  }
  return s;
}

function min(v) {
  var m = NaN;
  for (var i=0; i<v.length; i++) {
    if(!(m<v[i])) {
      m = v[i];
    }
  }
  return m;
}

function max(v) {
  var m = NaN;
  for (var i=0; i<v.length; i++) {
    if(!(m>v[i])) {
      m = v[i];
    }
  }
  return m;
}

function sum(v) {
  var s = 0;
  for (var i=0; i<v.length; i++) {
    s += v[i];
  }
  return s;
}

function prod(v) {
  var s = 1;
  for (var i=0; i<v.length; i++) {
    s *= v[i];
  }
  return s;
}

function mean(v) {
  var s = sum(v);
  var l = v.length;
  var m = s/l;
  return m;
}

function variance(v) {
  var x = [];
  var m = mean(v);
  for(var i=0; i<v.length; i++){
    var d = v[i] - m;
    x[i] = d*d;
  }
  return mean(x);
}

function std(v) {
  return Math.sqrt(variance(v));
}

function nansum(v) {
  var s = 0;
  for (var i=0; i<v.length; i++) {
    if (!isNaN(v[i])){
      s += v[i];
    }
  }
  return s;
}

function nanmean(v) {
  var s = 0;
  var l = 0;
  for (var i=0; i<v.length; i++) {
    if (!isNaN(v[i])){
      s += v[i];
      v += 1;
    }
  }
  var m = s/l;
  return m;
}

function linspace(x1,x2,n) {
  var v_x = [x1];
  for (var i_x = 1; i_x < n; i_x++) {
    v_x.push(x1 + i_x*(x2-x1)/(n-1));
  }
  return v_x;
}

function floor(x) {
  return Math.floor(x);
}
function ceil(x) {
  return Math.ceil(x);
}
function round(x) {
  return Math.round(x);
}

function colon(x1,x2,s_x) {
  if(s_x==undefined){
    s_x = 1;
  }
  if(x2<x1){
    return [];
  }
  var n_x = 1 + (x2-x1)/s_x;
  return linspace(x1,x2,n_x);
}

function sort(x) {
  var y = x;
  y.sort();
  return y;
}

function randunif(n,xmin,xmax) {
  if(typeof(xmin)=='undefined') {console.error("xmin undefined"); return;}
  if(typeof(xmax)=='undefined') {console.error("xmax undefined"); return;}
  if(xmax<xmin)                 {console.error("xmax "+xmax+" < xmin"+xmin); return; }
  if(n==undefined) { n=1; }
  var y = [];
  var dx = xmax-xmin;
  for (var i=0; i<n; i++) {
    var x = xmin + dx*Math.random();
    y[i] = x;
  }
  if(n==1)       {return y[0];}
  return y;
}

function rand(n) {
  return randunif(n,0,1);
}

function randi(x,n) {
  if(n==undefined) { n=1; }
  var y = [];
  for (var i=0; i<n; i++) {
    y[i] = Math.floor((x+1)*Math.random());
  }
  if(n==1)       {return y[0];}
  return y;
}

function randn(n,m,s) {
  if(typeof(n)=='undefined') {n=1;}
  if(typeof(m)=='undefined') {m=0;}
  if(typeof(s)=='undefined') {s=1;}
  var y = [];
  for(var i_n=0; i_n<n; i_n+=2){
    // box-muller method
    var u, v, a, b, y, y0, y1;
    u = Math.random();
    v = Math.random();
    a = Math.sqrt(-2 * Math.log(u));
    b = 2 * Math.PI * v;
    y0 = a * Math.cos(b);
    y1 = a * Math.sin(b);
    y[i_n]   = m + s*y0;
    y[i_n+1] = m + s*y1;
  }
  if(n==1)       {return y[0];}
  if(y.length>n) {y.pop();}
  return y;
}

function normpdf(x, mu, sigma) {
  var tmp1 = -Math.pow((x - mu), 2) / (2 * Math.pow(sigma, 2));
  var tmp2 = Math.pow(Math.E, tmp1);
  var tmp3 = 1 / (sigma * (Math.sqrt(2 * Math.PI)));
  var norm = tmp3 * tmp2;
  return norm;
}

function normcdf(mean, sigma, to) {
  var z = (to - mean) / Math.sqrt(2 * sigma * sigma);
  var t = 1 / (1 + 0.3275911 * Math.abs(z));
  var a1 = 0.254829592;
  var a2 = -0.284496736;
  var a3 = 1.421413741;
  var a4 = -1.453152027;
  var a5 = 1.061405429;
  var erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  var sign = 1;
  if (z < 0){
    sign = -1;
  }
  var ret = (1 / 2) * (1 + sign * erf);
  return ret;
}

function num2str(n) {
  var s = n.toString()
  return s;
}
function str2num(s) {
  var n = parseFloat(s);
  return n;
}