/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { SeedProvider } from '../src/seed-provider';
import { Utils } from './_utils';

test("_getInitialValues not undefined", (t) => {
  let provider = new SeedProvider();

  let values = provider["_getInitialValues"]();

  t.notEqual(values, undefined, "values not undefined");
  t.end();
});

test("_getInitialValues returns 8 values", (t) => {
  let provider = new SeedProvider();

  let values = provider["_getInitialValues"]();

  t.equal(Object.keys(values).length, 8, "8 initial values");
  t.end();
});

let testValue = (key: string, expected: number) => {
  test(`_getInitialValues().${key} is ${expected}`, (t) => {
    let provider = new SeedProvider();

    let values = provider["_getInitialValues"]();

    t.equal(values[key], expected, `correct value for ${key}`);
    t.end();
  });
};

for (let testCase of Utils.getInitialValues()) {
  testValue(testCase[0] as string, testCase[1] as number);
}

let testInitialSeededMemory = (location: number, input: number, expected: number) => {
  let seed = [];
  for (let i = 0; i < 256; i++) {
    seed[i] = input;
  }

 test(`_getInitialSeededMemory()[${location}] is ${expected} when seed is made up of ${input}s`, (t) => {
   let provider = new SeedProvider();

   let values = provider["_getInitialSeededValues"](seed);

   t.equal(values[location], expected, `correct value for ${location}`);
   t.end();
 });
}

for (let seedValue = 0; seedValue < 4; seedValue++) {
  for (let testCase of Utils.getSeedTestCases(seedValue)) {
    testInitialSeededMemory(testCase[0] as number, testCase[1] as number, testCase[2] as number);
  }
}
