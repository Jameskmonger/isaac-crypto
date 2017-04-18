import { TestFixture, Test, Expect } from "alsatian";
import * as cases from "isaac-crypto-test-cases";

import { ISAACGenerator } from "./index";

@TestFixture()
export class ISAACTests {

  @Test()
  public executeTestCases() {
    cases.forEach(c => this.executeTestCase(c));
  }

  private executeTestCase(caseContents: any) {
    // set up isaac
    let isaac = new ISAACGenerator(caseContents.seed);

    // go through each test case results, generate a new one and check they match
    caseContents.results.forEach(r => {
      let nextResult = isaac.getNextResult();

      Expect(nextResult).toBe(r);
    });
  }

}
