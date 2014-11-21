
/**
 * test
 */

import Debug from 'debug';
import { tri } from 'opendsp/osc';
import Adsr from './index';

var debug = Debug('adsr test');

var adsr = Adsr();
var out;

export function dsp(t) {
  out = adsr(t);
  if (t % 1 === 0) adsr.play(t, { s: 5, dur: 0.1 });
  return tri(t, 440) * out;
}
