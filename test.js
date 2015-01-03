
/**
 * test
 */

import Debug from 'debug';
import { tri } from 'opendsp/osc';
import Adsr from './index';

var debug = Debug('adsr test');

var adsr = Adsr({ a: 5 });
var out;

export function dsp(t) {
  out = adsr(t);
  if (t % 1 === 0) adsr.play(t, { s: 5, dur: 0.8, r: 10 });
  if ((t+1/2) % 1 === 0) adsr.play(t, { a: 1 });
  return tri(t, 440) * out;
}
