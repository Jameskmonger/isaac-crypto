import * as fs from "fs";
import { ISAACGenerator } from "../src/index";

/**
 * A test case is a seed and a list of expected results.
 */
type TestCase = {
  seed: [number, number, number, number];
  results: number[];
};

/**
 * Reads all test cases from the `./cases/` directory and returns them as an array of TestCase.
 */
function readTestCases(): TestCase[] {
  const testCases: TestCase[] = [];

  fs.readdirSync("./test/cases").forEach(file => {
    const expectedResults = fs.readFileSync(`./test/cases/${file}`, "utf8")
      .split(",")
      .map(s => parseInt(s, 10))
      .filter(n => !isNaN(n));

    const seed = file.split("_").map(s => parseInt(s, 10)) as [number, number, number, number];

    testCases.push({
      seed,
      results: expectedResults
    });
  });

  return testCases;
}

/**
 * Executes a test case and returns true if it passed, false otherwise.
 * 
 * Iterates through the expected results, generates a new result and compares it to the expected one.
 */
function executeTestCase(testCase: TestCase): boolean {
  /**
   * Converts a seed to a file name.
   */
  function getNameFromSeed(seed: [number, number, number, number]): string {
    return seed.join("_");
  }

  /**
   * Writes a log to a logfile for this test case.
   */
  function writeLog(seed: [number, number, number, number], log: string) {
    fs.writeFileSync(`./test/logs/${getNameFromSeed(seed)}.log`, log);
  }

  // set up isaac
  let isaac = new ISAACGenerator(testCase.seed);
  let log = "";

  // go through each test case results, generate a new one and check they match
  testCase.results.forEach((expected, index) => {
    let actual = isaac.getNextResult();

    if (actual !== expected) {
      log += (`FAILURE [index: ${index}] expected: ${expected}, actual: ${actual}, diff: ${expected - actual}\n`)
      return false;
    }
  });

  log += (`\n\n========\n\nTest case passed: ${testCase.seed}\n`);

  writeLog(testCase.seed, log);

  return true;
}

/**
 * Runs the given test cases.
 */
function runTests(testCases: TestCase[]) {
  const allTestsPassed = testCases.map(c => executeTestCase(c));

  if (allTestsPassed.every(p => p)) {
    console.log("### All tests passed. Exiting with code 0.");
    process.exit(0);
  }

  console.error("### All tests passed. Exiting with code 1.");
  process.exit(1);
}

// read test cases and run them
runTests(readTestCases());