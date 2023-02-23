# isaac-crypto

An implementation of ISAAC for Node.js. More information about ISAAC can be found [here](http://burtleburtle.net/bob/rand/isaacafa.html).

This implementation of the algorithm has 24 test seeds, each of which is tested for correctness within the first 1 million results. These results are compared with results obtained from a known-good Java implementation of ISAAC, using the same seeds.

## Installation

    $ npm install isaac-crypto --save

## Usage

    import { ISAACGenerator } from "isaac-crypto";

    const generator = new ISAACGenerator([ 1, 2, 3, 4 ]);

    generator.getNextResult(); // -621246914
    generator.getNextResult(); // 1957022519

## Development

Install all dependencies with `npm`.

Run tests with `npm test`.

Test cases can be set up in `./test/cases`. Each test case represents a set of expected results for a given seed. Logfiles for tests go in `./test/logs` under their test name.

## License

`isaac-crypto` is licensed under The MIT License. To see the full license text included with the project, visit the [LICENSE file](/LICENSE).
