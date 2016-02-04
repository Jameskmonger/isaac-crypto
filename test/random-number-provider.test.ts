/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { RandomNumberProvider } from '../src/random-number-provider';

test('it calls to Math.random', (t) => {
  t.plan(1);

  let n = new RandomNumberProvider();

  let mathDotRandomCalled = false;

  Math.random = () => {
    t.pass();
    return 1;
  };

  n.getRandom();
});
