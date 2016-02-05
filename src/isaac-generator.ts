export class IsaacGenerator {
  private _count: number;

  constructor() {
    this._count = 0;
  }

  public getValue(): number {
    if (this._count === 0) {
      this._randomise();
    }

    return 0;
  }

  private _randomise(): void {

  }
}
