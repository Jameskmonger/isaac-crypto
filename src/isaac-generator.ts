import { SeedProvider } from './seed-provider';

export class IsaacGenerator {
  private _count: number;
  private _counter: number;
  private _accumulatorShifts: Array<(x: number) => number>;
  private _memory: any;
  private _accumulator: number;
  private _results: Array<number>;

  constructor(seed: Array<number>) {
    this._count = 0;
    this._counter = 0;

    this._accumulatorShifts = [
      (x: number) => x << 13,
      (x: number) => x >>> 6,
      (x: number) => x << 2,
      (x: number) => x >>> 16
    ];

    this._memory = SeedProvider.getMemory(seed);

    this._accumulator = 0;
  }

  public getValue(): number {
    if (this._count <= 0) {
      this._randomise();
    }

    return this._results[this._count];
  }

  private _randomise(): void {
    let a, b, x, y, last;

    last = ++this._counter;
    a = 0;
    b = 128;
    x = 0;
    y = 0;

    while (a < 128) {
      for (let shift of this._accumulatorShifts) {
        x = this._memory[a];
        this._accumulator ^= shift(this._accumulator);
        this._accumulator += this._memory[b++];
        this._memory[a] = y = this._memory[(x & 508) >> 2] + this._accumulator + last;
        this._results[a++] = last = this._memory[((y >> 8) & 508) >> 2] + x;
      }
    }

    b = 0;

    while (b < 128) {
      for (let shift of this._accumulatorShifts) {
        x = this._memory[a];
        this._accumulator ^= shift(this._accumulator);
        this._accumulator += this._memory[b++];
        this._memory[a] = y = this._memory[(x & 508) >> 2] + this._accumulator + last;
        this._results[a++] = last = this._memory[((y >> 8) & 508) >> 2] + x;
      }
    }

    this._count = 255;
  }
}
