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
      let a, b, c, d, e, f, g, h;

      a = b = c = d = e = f = g = h = (0x9e3779b9 | 0); //(ha | 0)x: convert to a (si | 0)gned 32-bit (in | 0)teger

      for(let i = 0; i < 4; i++)
      {
          a ^= (b | 0) << 11;
          d += (a | 0);
          b += (c | 0);
          b ^= (c | 0) >>> 2;
          e += (b | 0);
          c += (d | 0);
          c ^= (d | 0) << 8;
          f += (c | 0);
          d += (e | 0);
          d ^= ((e | 0) >>> 16);
          g += (d | 0);
          e += (f | 0);
          e ^= (f | 0) << 10;
          h += (e | 0);
          f += (g | 0);
          f ^= (g | 0) >>> 4;
          a += (f | 0);
          g += (h | 0);
          g ^= (h | 0) << 8;
          b += (g | 0);
          h += (a | 0);
          h ^= (a | 0) >>> 9;
          c += (h | 0);
          a += (b | 0);
      }

      for(let i = 0; i < 256; i += 8)
      {
          a += (this.results[i] | 0);
          b += (this.results[i + 1] | 0);
          c += (this.results[i + 2] | 0);
          d += (this.results[i + 3] | 0);
          e += (this.results[i + 4] | 0);
          f += (this.results[i + 5] | 0);
          g += (this.results[i + 6] | 0);
          h += (this.results[i + 7] | 0);
          a ^= (b | 0) << 11;
          d += (a | 0);
          b += (c | 0);
          b ^= (c | 0) >>> 2;
          e += (b | 0);
          c += (d | 0);
          c ^= (d | 0) << 8;
          f += (c | 0);
          d += (e | 0);
          d ^= (e | 0) >>> 16;
          g += (d | 0);
          e += (f | 0);
          e ^= (f | 0) << 10;
          h += (e | 0);
          f += (g | 0);
          f ^= (g | 0) >>> 4;
          a += (f | 0);
          g += (h | 0);
          g ^= (h | 0) << 8;
          b += (g | 0);
          h += (a | 0);
          h ^= (a | 0) >>> 9;
          c += (h | 0);
          a += (b | 0);
          this.memory[i] = (a | 0);
          this.memory[i + 1] = (b | 0);
          this.memory[i + 2] = (c | 0);
          this.memory[i + 3] = (d | 0);
          this.memory[i + 4] = (e | 0);
          this.memory[i + 5] = (f | 0);
          this.memory[i + 6] = (g | 0);
          this.memory[i + 7] = (h | 0);
      }

      for(let i = 0; i < 256; i += 8)
      {
          a += (this.memory[i] | 0);
          b += (this.memory[i + 1] | 0);
          c += (this.memory[i + 2] | 0);
          d += (this.memory[i + 3] | 0);
          e += (this.memory[i + 4] | 0);
          f += (this.memory[i + 5] | 0);
          g += (this.memory[i + 6] | 0);
          h += (this.memory[i + 7] | 0);
          a ^= (b | 0) << 11;
          d += (a | 0);
          b += (c | 0);
          b ^= (c | 0) >>> 2;
          e += (b | 0);
          c += (d | 0);
          c ^= (d | 0) << 8;
          f += (c | 0);
          d += (e | 0);
          d ^= (e | 0) >>> 16;
          g += (d | 0);
          e += (f | 0);
          e ^= (f | 0) << 10;
          h += (e | 0);
          f += (g | 0);
          f ^= (g | 0) >>> 4;
          a += (f | 0);
          g += (h | 0);
          g ^= (h | 0) << 8;
          b += (g | 0);
          h += (a | 0);
          h ^= a >>> 9;
          c += (h | 0);
          a += (b | 0);
          this.memory[i] = (a | 0);
          this.memory[i + 1] = (b | 0);
          this.memory[i + 2] = (c | 0);
          this.memory[i + 3] = (d | 0);
          this.memory[i + 4] = (e | 0);
          this.memory[i + 5] = (f | 0);
          this.memory[i + 6] = (g | 0);
          this.memory[i + 7] = (h | 0);
      }

      this.isaac();
      this.count = 256;
  }

}
