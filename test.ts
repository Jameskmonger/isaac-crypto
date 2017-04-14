import * as fs from "fs";
import * as path from "path";
import { TestFixture, Test, Expect } from "alsatian";

import { ISAACGenerator } from "./index";
const Old = require("./old");

const CASES_DIRECTORY = path.resolve(__dirname, "./cases/");

@TestFixture()
export class ISAACTests {

  @Test()
  public executeTestCases() {
    let files = fs.readdirSync(CASES_DIRECTORY);

    files.forEach(f => this.executeTestCase(f));
  }

  private executeTestCase(caseName: string) {
    // get case info
    let casePath = path.resolve(CASES_DIRECTORY, caseName);
    let caseContents = require(casePath);

    // set up isaac
    let isaac = new ISAACGenerator(caseContents.seed);

    // go through each test case key, generate a new one and check they match
    caseContents.keys.forEach(k => {
      let nextKey = isaac.getNextKey();

      Expect(nextKey).toBe(k);
    });
  }

}
