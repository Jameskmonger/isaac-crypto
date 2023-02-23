import * as cases from "isaac-crypto-test-cases";

import { ISAACGenerator } from "../src/index";

type TestCase = {
  seed: [number, number, number, number];
  results: number[];
};

const ALL_TEST_CASES = cases as TestCase[];

function executeTestCase(caseContents: TestCase): boolean {
  // set up isaac
  let isaac = new ISAACGenerator(caseContents.seed);

  // go through each test case results, generate a new one and check they match
  caseContents.results.forEach(r => {
    let nextResult = isaac.getNextResult();

    if (nextResult !== r) {
      console.error(`Test case failed: ${caseContents.seed} ${r} ${nextResult}`)
      return false;
    }
  });

  console.log(`Test case passed: ${caseContents.seed}`);

  return true;
}

function runTests() {
  const allTestsPassed = ALL_TEST_CASES.map(c => executeTestCase(c));

  if (allTestsPassed.every(p => p)) {
    console.log("### All tests passed. Exiting with code 0.");
    process.exit(0);
  }

  console.log("### All tests passed. Exiting with code 1.");
  process.exit(1);
}

runTests();