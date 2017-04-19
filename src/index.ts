import getSigned32BitInt from "get-signed-32-bit-int";

import initialiseTempMemory from "./memory/initialise-temp-memory";
import scrambleMemory from "./memory/scramble-memory";
import initializationPass from "./memory/initialization-pass";

// daxxog/project317 used as reference
export class ISAACGenerator {

  private static SIZE: number = 256;
  private static MAGIC_NUMBER: number = getSigned32BitInt(0x9e3779b9);

  private lastResult: number = 0;
  private counter: number = 0;
  private accumulator: number = 0;
  private count: number = 0;

  private memory: Array<number>;
  private results: Array<number>;

  constructor(seed: Array<number>) {
    this.memory = Array(ISAACGenerator.SIZE);

    // initialise the results by cloning the seed
    this.results = seed.slice();

    this.initializeKeySet();
  }

  public getNextResult(): number {
      if(this.count-- == 0) {
          this.generateResults();
          this.count = ISAACGenerator.SIZE - 1;
      }

      return this.getSafeResult(this.count);
  };

  private generateResults(): void {
      this.lastResult += ++this.counter;
      for(let i = 0; i < ISAACGenerator.SIZE; i++) {
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

          let x = this.memory[i];
          this.accumulator += this.memory[(i + 128) & 0xff];
          let y = this.memory[i] =  this.memory[(x >>> 2) & 0xff] + this.accumulator + this.lastResult;
          this.results[i] = this.lastResult = this.memory[(y >>> 10) & 0xff] + x;
      }
  }

  private getSafeResult(index: number) {
    let result = this.results[index];

    if (result === undefined) {
      return 0;
    }

    return getSigned32BitInt(result);
  }

  private initializeKeySet(): void {
    const temp = initialiseTempMemory(ISAACGenerator.MAGIC_NUMBER);

    for(let i = 0; i < 4; i++) {
        scrambleMemory(temp);
    }

    initializationPass(ISAACGenerator.SIZE, this.memory, temp, (index: number) => this.getSafeResult(index));
    initializationPass(ISAACGenerator.SIZE, this.memory, temp, (index: number) => this.memory[index]);

    this.generateResults();
    this.count = ISAACGenerator.SIZE;
  }

}
