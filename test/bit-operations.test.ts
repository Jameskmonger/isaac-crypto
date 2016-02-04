/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { BitOperations } from '../src/bit-operations';

let testLeastSignificantBit = (input: number, output: number) => {
  test(`it gets the correct least significant bit [TestCase: ${input}]`, (t) => {
    let lsb = BitOperations.getLeastSignificantBit(input);

    t.equal(lsb, output);
    t.end();
  });
};

for (let testCase of [[0b0001, 1], [0b0010, 0], [0b0101, 1], [0b1010, 0]]) {
  testLeastSignificantBit(testCase[0], testCase[1]);
}
