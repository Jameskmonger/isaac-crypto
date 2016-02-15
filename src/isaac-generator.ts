import { SeedProvider } from './seed-provider';

export class IsaacGenerator {
  private _count: number;
  private _accumulatorShifts: Array<(x: number) => number>;
  private _memory: any;

  constructor(seed: Array<number>) {
    this._count = 0;

    this._accumulatorShifts = [
      (x: number) => x << 13,
      (x: number) => x >>> 6,
      (x: number) => x << 2,
      (x: number) => x >>> 16
    ];

    this._memory = SeedProvider.getMemory(seed);
  }

  public getValue(): number {
    if (this._count <= 0) {
      this._randomise();
    }

    return 0;
  }

  private _randomise(): void {
  }
}
