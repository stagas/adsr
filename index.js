
/**
 * @module adsr
 * @author stagas
 * @version 1.0.0
 * @desc low level adsr envelope
 * @license mit
 */

import merge from 'yields/merge';

export default Adsr;

function Adsr(env){
  env = env || {};
  env.a = env.a || -0.0003;
  env.d = env.d || -0.004;
  env.s = env.s || 5;
  env.r = env.r || -0.04;
  env.c = env.c || 10;
  env.dur = env.dur || 0.1;

  var circ = end;
  var pos = 0;
  var p = 0;
  var v = 0;

  run.play = play;
  
  return run;
  
  function run(t){
    return circ(t) / 10;
  }
  
  function play(t, _env){
    merge(env, _env);
    p = t;
    circ = attack;
  }

  function attack(t){
    v = 15 * (1 - Math.exp((t-p) / (env.a*env.c) ));
    if (v >= 10) p = t, circ = decay;
    return v;
  }

  function decay(t){
    v = 10 * Math.exp((t-p) / (env.d*env.c));
    if (v <= env.s) p = t, circ = sustain;
    return v;
  }
  
  function sustain(t){
    if (t - p >= env.dur) circ = release;
    return env.s;
  }
  
  function release(t){
    v = env.s * Math.exp((t-p) / (env.r*env.c));
    if (v <= 0) circ = end;
    return v;
  }
  
  function end(){
    return 0;
  }
}
