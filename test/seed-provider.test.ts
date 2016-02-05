/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { SeedProvider } from '../src/seed-provider';

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

for (let testCase of [
  [ 'a', -3969392806 ],
  [ 'b', -1780940711 ],
  [ 'c', -1021952437 ],
  [ 'd', 255990488 ],
  [ 'e', -651539848 ],
  [ 'f', -1525007287 ],
  [ 'g', -990909925 ],
  [ 'h', 811634969 ]
]) {
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

for (let testCase of [
  [0, 0, 114073829], [1, 0, 2076997778], [2, 0, 447929969], [3, 0, 737963188],
  [4, 0, 1426416244], [5, 0, -1348792071], [6, 0, 329369436], [7, 0, 270769140],
  [8, 0, -2701666440], [9, 0, -3891496838], [10, 0, -2791298383], [11, 0, 1994196341],
  [12, 0, 1397175574], [13, 0, -505205223], [14, 0, -2026334245], [15, 0, -1435155033],
  [16, 0, 2120352492], [17, 0, 1167932382], [18, 0, 1032979720], [19, 0, 1864126593],
  [20, 0, 1032731476], [21, 0, -74399850], [22, 0, -573009321], [23, 0, 550775402],
  [24, 0, -4356444433], [25, 0, -3910452444], [26, 0, -3684745514], [27, 0, -793540164],
  [28, 0, -2130260477], [29, 0, 1303232735], [30, 0, -1969260160], [31, 0, -2026432159],
  [32, 0, -794593966], [33, 0, 1394199931], [34, 0, -409386310], [35, 0, 698642329],
  [36, 0, 137101746], [37, 0, -671295256], [38, 0, 549197612], [39, 0, 215090745],
  [40, 0, -237843279], [41, 0, 612286355], [42, 0, 1439586780], [43, 0, 1408128185],
  [44, 0, 514784218], [45, 0, -1366597684], [46, 0, 556367608], [47, 0, -122444489],
  [48, 0, 1663428830], [49, 0, -142192132], [50, 0, -267779812], [51, 0, -435504719],
  [52, 0, -627106812], [53, 0, 1735475761], [54, 0, -2008562972], [55, 0, 1053267926],
  [56, 0, 4218799906], [57, 0, 861026587], [58, 0, -1578667386], [59, 0, -303691837],
	[60, 0, 119803455], [61, 0, 1987675433], [62, 0, 1472161212], [63, 0, 241903067],
	[64, 0, -270353893], [65, 0, -175891542], [66, 0, 2933403835], [67, 0, 1560782912],
	[68, 0, 1284298451], [69, 0, -1885241521], [70, 0, -129784662], [71, 0, 1428927568],
]) {
  testInitialSeededMemory(testCase[0] as number, testCase[1] as number, testCase[2] as number);
}
