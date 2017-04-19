import getSigned32BitInt from "get-signed-32-bit-int";

// daxxog/project317 used as reference
export class ISAACGenerator {

  private static SIZE: number = 256;

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
          this.isaac();
          this.count = ISAACGenerator.SIZE - 1;
      }

      return this.getSafeResult(this.count);
  };

  private isaac(): void {
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
      let a, b, c, d, e, f, g, h;
      a = b = c = d = e = f = g = h = getSigned32BitInt(0x9e3779b9); //(ha | 0)x: convert to a (si | 0)gned 32-bit (in | 0)teger

      const mixSeed = () => {
        a ^= b << 11;
        d += a;
        b += c;
        b ^= c >>> 2;
        e += b;
        c += d;
        c ^= d << 8;
        f += c;
        d += e;
        d ^= e >>> 16;
        g += d;
        e += f;
        e ^= f << 10;
        h += e;
        f += g;
        f ^= g >>> 4;
        a += f;
        g += h;
        g ^= h << 8;
        b += g;
        h += a;
        h ^= a >>> 9;
        c += h;
        a += b;
      }

      for(let i = 0; i < 4; i++) {
          mixSeed();
      }

      for(let i = 0; i < ISAACGenerator.SIZE; i += 8) {
          a += this.getSafeResult(i);
          b += this.getSafeResult(i + 1);
          c += this.getSafeResult(i + 2);
          d += this.getSafeResult(i + 3);
          e += this.getSafeResult(i + 4);
          f += this.getSafeResult(i + 5);
          g += this.getSafeResult(i + 6);
          h += this.getSafeResult(i + 7);
          mixSeed();
          this.memory[i] = a;
          this.memory[i + 1] = b;
          this.memory[i + 2] = c;
          this.memory[i + 3] = d;
          this.memory[i + 4] = e;
          this.memory[i + 5] = f;
          this.memory[i + 6] = g;
          this.memory[i + 7] = h;
      }

      for(let i = 0; i < ISAACGenerator.SIZE; i += 8) {
          a += this.memory[i];
          b += this.memory[i + 1];
          c += this.memory[i + 2];
          d += this.memory[i + 3];
          e += this.memory[i + 4];
          f += this.memory[i + 5];
          g += this.memory[i + 6];
          h += this.memory[i + 7];
          mixSeed();
          this.memory[i] = a;
          this.memory[i + 1] = b;
          this.memory[i + 2] = c;
          this.memory[i + 3] = d;
          this.memory[i + 4] = e;
          this.memory[i + 5] = f;
          this.memory[i + 6] = g;
          this.memory[i + 7] = h;
      }

      this.isaac();
      this.count = ISAACGenerator.SIZE;
  }

}
