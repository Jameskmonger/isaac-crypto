/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { RandomNumberProvider } from '../src/random-number.provider';

test('it calls to Math.random', (t) => {
  let n = new RandomNumberProvider();

  let mathDotRandomCalled = false;

  Math.random = () => {
    mathDotRandomCalled = true;

    return 1;
  };

  n.getRandom();

  t.true(mathDotRandomCalled, "Math.Random was called");
  t.end();
});
