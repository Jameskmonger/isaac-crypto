import getSigned32BitInt from "get-signed-32-bit-int";

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

  private mixStore(store: Array<number>): void {
    store[0] ^= store[1] << 11;
    store[3] += store[0];
    store[1] += store[2];
    store[1] ^= store[2] >>> 2;
    store[4] += store[1];
    store[2] += store[3];
    store[2] ^= store[3] << 8;
    store[5] += store[2];
    store[3] += store[4];
    store[3] ^= store[4] >>> 16;
    store[6] += store[3];
    store[4] += store[5];
    store[4] ^= store[5] << 10;
    store[7] += store[4];
    store[5] += store[6];
    store[5] ^= store[6] >>> 4;
    store[0] += store[5];
    store[6] += store[7];
    store[6] ^= store[7] << 8;
    store[1] += store[6];
    store[7] += store[0];
    store[7] ^= store[0] >>> 9;
    store[2] += store[7];
    store[0] += store[1];
  }

  private incrementStore(store: Array<number>, startIndex: number, valueFunction: (index: number) => number): void {
    for (let i = 0; i < 8; i++) {
      store[i] += valueFunction(startIndex + i);
    }
  }

  private placeStoreInMemory(memory: Array<number>, store: Array<number>, index: number): void {
    for (let i = 0; i < 8; i++) {
      memory[index + i] = store[i];
    }
  };

  private initialiseStore(): Array<number> {
    const store = [];

    for (let i = 0; i < 8; i++) {
      store[i] = ISAACGenerator.MAGIC_NUMBER;
    }

    return store;
  }

  private initializeKeySet(): void {
    const store = this.initialiseStore();

    const resultValueFunction = (index: number) => this.getSafeResult(index);
    const memoryValueFunction = (index: number) => this.memory[index];

    for(let i = 0; i < 4; i++) {
        this.mixStore(store);
    }

    for(let i = 0; i < ISAACGenerator.SIZE; i += 8) {
        this.incrementStore(store, i, resultValueFunction);
        this.mixStore(store);
        this.placeStoreInMemory(this.memory, store, i);
    }

    for(let i = 0; i < ISAACGenerator.SIZE; i += 8) {
        this.incrementStore(store, i, memoryValueFunction);
        this.mixStore(store);
        this.placeStoreInMemory(this.memory, store, i);
    }

    this.generateResults();
    this.count = ISAACGenerator.SIZE;
  }

}
