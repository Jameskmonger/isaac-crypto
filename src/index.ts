import initialiseTempMemory from "./memory/initialise-temp-memory";
import scrambleMemory from "./memory/scramble-memory";
import initializationPass from "./memory/initialization-pass";

/**
 * ISAAC (Indirection, Shift, Accumulate, Add, and Count) is a pseudo-random number generator
 * developed by Robert J. Jenkins Jr. in 1996. It is a cryptographically secure algorithm
 * that is designed to be fast and unpredictable.
 * 
 * This implementation of ISAAC is based on the pseudocode provided in the original paper.
 * @see https://www.burtleburtle.net/bob/rand/isaac.html
 * 
 * Also referenced the project daxxog/project317
 */
export class ISAACGenerator {
  /**
   * The size of the generator's memory array.
   */
  private static SIZE: number = 256;

  /**
   * The magic number used to initialize the generator's memory array.
   */
  private static MAGIC_NUMBER: number = 0x9e3779b9 & 0xffffffff;

  /**
   * The last result generated by the generator.
   */
  private lastResult: number = 0;

  /**
   * How many times a set of results has been generated.
   */
  private counter: number = 0;

  /**
   * An accumulator value used when generating results.
   */
  private accumulator: number = 0;

  /**
   * The number of results remaining in the current set of results.
   */
  private count: number = 0;

  /**
   * The generator's memory array.
   */
  private memory: number[];

  /**
   * The current set of results.
   */
  private results: number[];

  constructor(seed: number[]) {
    this.results = Array(ISAACGenerator.SIZE);
    this.memory = Array(ISAACGenerator.SIZE);
    this.initializeMemory(seed);
  }

  public getNextResult(): number {
    if (this.count-- == 0) {
      this.generateResults();
      this.count = ISAACGenerator.SIZE - 1;
    }

    return this.getSafeResult(this.count);
  };

  /**
   * Generates ISAAC pseudo-random numbers and stores them in results.
   * Uses the values in memory and the accumulator value to generate the pseudo-random numbers.
   * Applies bit masks to ensure that the numbers generated are within the correct range.
   */
  private generateResults(): void {
    this.counter = (this.counter + 1) & 0xffffffff;
    this.lastResult = (this.lastResult + this.counter) & 0xffffffff;
    for (let i = 0; i < ISAACGenerator.SIZE; i++) {
      /**
       * These bitwise operations are part of the ISAAC algorithm and are used
       * to scramble the accumulator value in a pseudo-random way, which helps
       * to increase the unpredictability of the generated results.
       */
      switch (i & 3) {
        case 0:
          this.accumulator ^= this.accumulator << 13;
          break;
        case 1:
          this.accumulator ^= this.accumulator >>> 6;
          break;
        case 2:
          this.accumulator ^= this.accumulator << 2;
          break;
        case 3:
          this.accumulator ^= this.accumulator >>> 16;
          break;
      }

      this.accumulator = (this.accumulator + this.memory[(i + 128) & 0xff]) & 0xffffffff;

      const x = this.memory[i];
      this.memory[i] = (this.memory[(x >>> 2) & 0xff] + this.accumulator + this.lastResult) & 0xffffffff;

      const y = this.memory[i];
      this.results[i] = (this.memory[(y >>> 10) & 0xff] + x) & 0xffffffff;

      this.lastResult = this.results[i];
    }
  }

  private getSafeResult(index: number) {
    const result = this.results[index];

    if (result === undefined) {
      return 0;
    }

    return result & 0xffffffff;
  }

  /**
   * Initializes the generator's memory with the given seed array.
   * This method follows the initialization process described by the ISAAC algorithm.
   * 
   * @param seed - The array of integers to use as the seed.
   */
  private initializeMemory(seed: number[]): void {
    // Initialize temporary memory array with the magic number constant.
    const temp = initialiseTempMemory(ISAACGenerator.MAGIC_NUMBER);

    // Scramble the temporary memory array 4 times to increase its entropy.
    for (let i = 0; i < 4; i++) {
      scrambleMemory(temp);
    }

    // Use the seed array to initialize the generator's memory.
    // Each element of the seed array is mapped to a corresponding element of the memory array.
    initializationPass(ISAACGenerator.SIZE, this.memory, temp, (index: number) => seed[index] || 0);

    // Perform a second initialization pass to further randomize the memory array.
    // This time, each element of the memory array is mapped to a corresponding element of itself.
    initializationPass(ISAACGenerator.SIZE, this.memory, temp, (index: number) => this.memory[index]);

    // Generate the first set of results using the initialized memory array.
    this.generateResults();

    // Reset the generator's count to its maximum value.
    this.count = ISAACGenerator.SIZE;
  }


}
