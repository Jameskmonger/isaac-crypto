import { SeedProvider } from './seed-provider';

export class IsaacGenerator {
  private _count: number;
  private _memory: any;

  constructor(seed: Array<number>) {
    this._count = 0;

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
