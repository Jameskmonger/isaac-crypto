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
  [72, 0, -1198352777], [73, 0, -1137599530], [74, 0, -1551634145], [75, 0, 146699534],
  [76, 0, -1258571133], [77, 0, 757141638], [78, 0, 742873995], [79, 0, 116807945],
  [80, 0, 804573390], [81, 0, 1445287312], [82, 0, 1726885823], [83, 0, 1767631595],
  [84, 0, -1678774945], [85, 0, -1518119737], [86, 0, -556800802], [87, 0, 2094605851],
  [88, 0, -2064458144], [89, 0, -507361530], [90, 0, 3036403568], [91, 0, -1353943249],
  [92, 0, 858382142], [93, 0, -1646770548], [94, 0, 1025128550], [95, 0, 1398932728],
  [96, 0, -885323406], [97, 0, 960387672], [98, 0, 347150289], [99, 0, 885186269],
  [100, 0, 1125378419], [101, 0, -80625478], [102, 0, 2109566638], [103, 0, 674915282],
  [104, 0, 1591336736], [105, 0, 2147748303], [106, 0, 1655949255], [107, 0, -92061112],
  [108, 0, 734075178], [109, 0, -1528034337], [110, 0, 926994930], [111, 0, 851327143],
  [112, 0, 2564884888], [113, 0, -383738172], [114, 0, -2552429730], [115, 0, -1627977947],
  [116, 0, -1000069473], [117, 0, 824755124], [118, 0, -284852643], [119, 0, -1498076625],
  [120, 0, 705564141], [121, 0, 1995946786], [122, 0, 19789199], [123, 0, 1216165694],
  [124, 0, -96441757], [125, 0, 385820979], [126, 0, 770496557], [127, 0, 1414687860],
  [128, 0, 2418051303], [129, 0, 2994797412], [130, 0, -2992234343], [131, 0, 1392771023],
  [132, 0, 1705932578], [133, 0, 1170763670], [134, 0, 974269842], [135, 0, -1748058401],
  [136, 0, -2168837714], [137, 0, 1136294012], [138, 0, -2479349382], [139, 0, 1677511502],
  [140, 0, -764842526], [141, 0, -1560016821], [142, 0, 812377249], [143, 0, -1523932629],
  [144, 0, 2234141], [145, 0, -678029150], [146, 0, -1511260796], [147, 0, -1730407453],
  [148, 0, -856730037], [149, 0, 2064790733], [150, 0, 580486906], [151, 0, -1699630322],
  [152, 0, -105341013], [153, 0, 165836972], [154, 0, 2282250855], [155, 0, 1806400378],
  [156, 0, -795096861], [157, 0, 1055858658], [158, 0, -1259761819], [159, 0, 1532250595],
  [160, 0, -2243938756], [161, 0, -1030321469], [162, 0, 1557249902], [163, 0, -626097386],
  [164, 0, 1390353627], [165, 0, -852775986], [166, 0, 246269753], [167, 0, 1703331554],
  [168, 0, -1766507691], [169, 0, 678721924], [170, 0, 930329894], [171, 0, 67088172],
  [172, 0, -1565251245], [173, 0, -1607822443], [174, 0, 538465178], [175, 0, 1984729702],
  [176, 0, 2566123619], [177, 0, 1900946612], [178, 0, 2174631433], [179, 0, 778126175],
  [180, 0, -613249166], [181, 0, -231952294], [182, 0, 521756881], [183, 0, 2037858146],
  [184, 0, -2059981922], [185, 0, 264828885], [186, 0, 583275235], [187, 0, -969491059],
  [188, 0, -2057186090], [189, 0, -1952980122], [190, 0, 1027410582], [191, 0, 1954414360],
  [192, 0, 3195968759], [193, 0, 2270455444], [194, 0, 3670466284], [195, 0, 1214159772],
  [196, 0, -1015900854], [197, 0, 1956688581], [198, 0, 1293441172], [199, 0, 1862361054],
  [200, 0, 3828830790], [201, 0, 2723269243], [202, 0, -1008277200], [203, 0, 2110158853],
  [204, 0, 707284681], [205, 0, 614157012], [206, 0, 1302779968], [207, 0, -617626447],
  [208, 0, 6283788723], [209, 0, 2737131753], [210, 0, -860428259], [211, 0, 1762974226],
  [212, 0, -1758101505], [213, 0, 1761683076], [214, 0, 1281640194], [215, 0, 1168328610],
  [216, 0, 2849863028], [217, 0, 769674477], [218, 0, -2404975363], [219, 0, -1186409758],
  [220, 0, -34185114], [221, 0, 535879380], [222, 0, -789657108], [223, 0, -1079300581],
  [224, 0, -5531912133], [225, 0, -2617227150], [226, 0, 1185604932], [227, 0, -441923788],
  [228, 0, 1569156450], [229, 0, -1500818859], [230, 0, -514764387], [231, 0, 1867590129],
  [232, 0, -3261894740], [233, 0, 127495159], [234, 0, -103064407], [235, 0, -1304958671],

]) {
  testInitialSeededMemory(testCase[0] as number, testCase[1] as number, testCase[2] as number);
}
