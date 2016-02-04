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

for (let testCase of [[0b0001, 1], [0b0010, 0], [0b0101, 1], [0b1010, 0],
    [0b0111, 1], [0b1111, 1], [0b0000, 0], [0b10100111, 1]]) {
  testLeastSignificantBit(testCase[0], testCase[1]);
}

let testMostSignificantBit = (input: number, output: number) => {
  test(`it gets the correct most significant bit [TestCase: ${input}]`, (t) => {
    let msb = BitOperations.getMostSignificantBit(input);

    t.equal(msb, output);
    t.end();
  });
};

for (let testCase of [[5, 1], [-20, 0], [70, 1], [-251, 0],
    [1996, 1], [17264, 1], [-18327, 0], [817368, 1]]) {
  testMostSignificantBit(testCase[0], testCase[1]);
}
