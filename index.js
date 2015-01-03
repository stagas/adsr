
/**
 * @module adsr
 * @author stagas
 * @version 2.0.0
 * @desc low level adsr envelope
 * @license mit
 */

import merge from 'yields/merge';

export default Adsr;

var defaults = {
  a: 0.2,
  d: 12,
  s: 2,
  r: 30,
  c: 0.01,
  lerp: 0.01,
  dur: 0.1
};

function Adsr(opts){
  var env = {};
  opts = opts || {};
  merge(env, defaults);
  merge(env, opts);
  
  var circ = end;
  var curr = 0;
  var next = 0;
  var pos = 0;
  var p = 0;
  var v = 0;

  run.play = play;
  
  return run;
  
  function run(t){
    next = circ(t) / 10;
    curr = curr + (next - curr) * env.lerp;
    return curr;
  }
  
  function play(t, _env){
    merge(env, defaults);
    merge(env, opts);
    merge(env, _env || {});
    p = t;
    circ = attack;
  }

  function attack(t){
    v = 15 * (1 - Math.exp((t-p) / (-env.a*env.c) ));
    if (v >= 10) p = t, circ = decay;
    return v;
  }

  function decay(t){
    v = 10 * Math.exp((t-p) / (-env.d*env.c));
    if (v <= env.s) p = t, circ = sustain;
    return v;
  }
  
  function sustain(t){
    if (t - p >= env.dur) circ = release;
    return env.s;
  }
  
  function release(t){
    v = env.s * Math.exp((t-p) / (-env.r*env.c));
    if (v <= 0) circ = end;
    return v;
  }
  
  function end(){
    return 0;
  }
}
