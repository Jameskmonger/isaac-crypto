export class SeedProvider {
  /*
   * Some implementations generate these initial values.
   * However they always remain the same, so they can just be provided.
   */
  private _getInitialValues(): any {
    return {
      a: -3969392806,
      b: -1780940711,
      c: -1021952437,
      d: 255990488,
      e: -651539848,
      f: -1525007287,
      g: -990909925,
      h: 811634969
    };
  }

  private _getSeededMemory(seed: number[]): any {
    let initialValues = this._getInitialValues();
    let values = [];

    for (let i = 0; i < 256; i += 8) {
      initialValues.a += seed[i];
			initialValues.b += seed[i + 1];
      initialValues.c += seed[i + 2];
			initialValues.d += seed[i + 3];
			initialValues.e += seed[i + 4];
			initialValues.f += seed[i + 5];
			initialValues.g += seed[i + 6];
			initialValues.h += seed[i + 7];
			initialValues.a ^= initialValues.b << 11;
			initialValues.d += initialValues.a;
			initialValues.b += initialValues.c;
			initialValues.b ^= initialValues.c >>> 2;
			initialValues.e += initialValues.b;
			initialValues.c += initialValues.d;
			initialValues.c ^= initialValues.d << 8;
			initialValues.f += initialValues.c;
			initialValues.d += initialValues.e;
			initialValues.d ^= initialValues.e >>> 16;
			initialValues.g += initialValues.d;
			initialValues.e += initialValues.f;
			initialValues.e ^= initialValues.f << 10;
			initialValues.h += initialValues.e;
			initialValues.f += initialValues.g;
			initialValues.f ^= initialValues.g >>> 4;
			initialValues.a += initialValues.f;
			initialValues.g += initialValues.h;
			initialValues.g ^= initialValues.h << 8;
			initialValues.b += initialValues.g;
			initialValues.h += initialValues.a;
			initialValues.h ^= initialValues.a >>> 9;
			initialValues.c += initialValues.h;
			initialValues.a += initialValues.b;
			values[i] = initialValues.a;
			values[i + 1] = initialValues.b;
			values[i + 2] = initialValues.c;
			values[i + 3] = initialValues.d;
			values[i + 4] = initialValues.e;
			values[i + 5] = initialValues.f;
			values[i + 6] = initialValues.g;
			values[i + 7] = initialValues.h;
    }

    return values;
  }
}
