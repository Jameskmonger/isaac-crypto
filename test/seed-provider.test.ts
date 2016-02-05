/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { SeedProvider } from '../src/seed-provider';

test("_getInitialValues returns 8 values", (t) => {
  let provider = new SeedProvider();

  let values = provider["_getInitialValues"]();

  t.equal(values.length, 8, "8 initial values");
  t.end();
});
