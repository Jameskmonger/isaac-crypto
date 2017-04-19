# isaac-crypto

An implementation of ISAAC for Node.js. More information about ISAAC can be found [here](http://burtleburtle.net/bob/rand/isaacafa.html).

## Installation

    $ npm install isaac-crypto --save

## Usage

    import { ISAACGenerator } from "isaac-crypto";

    const generator = new ISAACGenerator([ 1, 2, 3, 4]);

    generator.getNextResult(); // -621246914
    generator.getNextResult(); // 1957022519

## License

`isaac-crypto` is licensed under The MIT License. To see the full license text included with the project, visit the [LICENSE file](/LICENSE).
