export class ISAACGenerator {

  private lastResult: number;
  private counter: number;
  private memory: Array<number>;
  private results: Array<number>;
  private accumulator: number;
  private count: number;

  constructor(seed: Array<number>) {
    this.lastResult = null;
    this.counter = null;
    this.memory = [];
    this.results = [];
    this.accumulator = null;
    this.count = null;

    // initialise the results
    this.results = seed.slice();

    this.initializeKeySet();
  }

  public getNextKey(): number {
      if(this.count-- == 0)
      {
          this.isaac();
          this.count = 255;
      }
      return (this.results[this.count] | 0);
  };

  private isaac(): void {
      this.lastResult += (++this.counter | 0);
      for(let i = 0; i < 256; i++)
      {
          let j = (this.memory[i] | 0);
          if((i & 3) == 0)
              this.accumulator ^= (this.accumulator | 0) << 13;
          else
          if((i & 3) == 1)
              this.accumulator ^= (this.accumulator | 0) >>> 6;
          else
          if((i & 3) == 2)
              this.accumulator ^= (this.accumulator | 0) << 2;
          else
          if((i & 3) == 3)
              this.accumulator ^= (this.accumulator | 0) >>> 16;
          this.accumulator += (this.memory[i + 128 & 0xff] | 0);
          let k;
          this.memory[i] = k = (this.memory[(j & 0x3fc) >> 2] | 0) + (this.accumulator | 0) + (this.lastResult | 0);
          this.results[i] = this.lastResult = (this.memory[(k >> 8 & 0x3fc) >> 2] | 0) + j;
      }
  }

  private initializeKeySet(): void {
      let i1;
      let j1;
      let k1;
      let l1;
      let i2;
      let j2;
      let k2;
      let l;

      l = i1 = j1 = k1 = l1 = i2 = j2 = k2 = (0x9e3779b9 | 0); //(ha | 0)x: convert to a (si | 0)gned 32-bit (in | 0)teger
      
      for(let i = 0; i < 4; i++)
      {
          l ^= (i1 | 0) << 11;
          k1 += (l | 0);
          i1 += (j1 | 0);
          i1 ^= (j1 | 0) >>> 2;
          l1 += (i1 | 0);
          j1 += (k1 | 0);
          j1 ^= (k1 | 0) << 8;
          i2 += (j1 | 0);
          k1 += (l1 | 0);
          k1 ^= ((l1 | 0) >>> 16);
          j2 += (k1 | 0);
          l1 += (i2 | 0);
          l1 ^= (i2 | 0) << 10;
          k2 += (l1 | 0);
          i2 += (j2 | 0);
          i2 ^= (j2 | 0) >>> 4;
          l += (i2 | 0);
          j2 += (k2 | 0);
          j2 ^= (k2 | 0) << 8;
          i1 += (j2 | 0);
          k2 += (l | 0);
          k2 ^= (l | 0) >>> 9;
          j1 += (k2 | 0);
          l += (i1 | 0);
      }

      for(let j = 0; j < 256; j += 8)
      {
          l += (this.results[j] | 0);
          i1 += (this.results[j + 1] | 0);
          j1 += (this.results[j + 2] | 0);
          k1 += (this.results[j + 3] | 0);
          l1 += (this.results[j + 4] | 0);
          i2 += (this.results[j + 5] | 0);
          j2 += (this.results[j + 6] | 0);
          k2 += (this.results[j + 7] | 0);
          l ^= (i1 | 0) << 11;
          k1 += (l | 0);
          i1 += (j1 | 0);
          i1 ^= (j1 | 0) >>> 2;
          l1 += (i1 | 0);
          j1 += (k1 | 0);
          j1 ^= (k1 | 0) << 8;
          i2 += (j1 | 0);
          k1 += (l1 | 0);
          k1 ^= (l1 | 0) >>> 16;
          j2 += (k1 | 0);
          l1 += (i2 | 0);
          l1 ^= (i2 | 0) << 10;
          k2 += (l1 | 0);
          i2 += (j2 | 0);
          i2 ^= (j2 | 0) >>> 4;
          l += (i2 | 0);
          j2 += (k2 | 0);
          j2 ^= (k2 | 0) << 8;
          i1 += (j2 | 0);
          k2 += (l | 0);
          k2 ^= (l | 0) >>> 9;
          j1 += (k2 | 0);
          l += (i1 | 0);
          this.memory[j] = (l | 0);
          this.memory[j + 1] = (i1 | 0);
          this.memory[j + 2] = (j1 | 0);
          this.memory[j + 3] = (k1 | 0);
          this.memory[j + 4] = (l1 | 0);
          this.memory[j + 5] = (i2 | 0);
          this.memory[j + 6] = (j2 | 0);
          this.memory[j + 7] = (k2 | 0);
      }

      for(let k = 0; k < 256; k += 8)
      {
          l += (this.memory[k] | 0);
          i1 += (this.memory[k + 1] | 0);
          j1 += (this.memory[k + 2] | 0);
          k1 += (this.memory[k + 3] | 0);
          l1 += (this.memory[k + 4] | 0);
          i2 += (this.memory[k + 5] | 0);
          j2 += (this.memory[k + 6] | 0);
          k2 += (this.memory[k + 7] | 0);
          l ^= (i1 | 0) << 11;
          k1 += (l | 0);
          i1 += (j1 | 0);
          i1 ^= (j1 | 0) >>> 2;
          l1 += (i1 | 0);
          j1 += (k1 | 0);
          j1 ^= (k1 | 0) << 8;
          i2 += (j1 | 0);
          k1 += (l1 | 0);
          k1 ^= (l1 | 0) >>> 16;
          j2 += (k1 | 0);
          l1 += (i2 | 0);
          l1 ^= (i2 | 0) << 10;
          k2 += (l1 | 0);
          i2 += (j2 | 0);
          i2 ^= (j2 | 0) >>> 4;
          l += (i2 | 0);
          j2 += (k2 | 0);
          j2 ^= (k2 | 0) << 8;
          i1 += (j2 | 0);
          k2 += (l | 0);
          k2 ^= l >>> 9;
          j1 += (k2 | 0);
          l += (i1 | 0);
          this.memory[k] = (l | 0);
          this.memory[k + 1] = (i1 | 0);
          this.memory[k + 2] = (j1 | 0);
          this.memory[k + 3] = (k1 | 0);
          this.memory[k + 4] = (l1 | 0);
          this.memory[k + 5] = (i2 | 0);
          this.memory[k + 6] = (j2 | 0);
          this.memory[k + 7] = (k2 | 0);
      }

      this.isaac();
      this.count = 256;
  }

}
