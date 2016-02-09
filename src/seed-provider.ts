export class SeedProvider {
  private SIZE: number = 256;

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
    let { a, b, c, d, e, f, g, h } = this._getInitialValues();
    let values = [];

    for (let i = 0; i < this.SIZE; i += 8) {
      a += seed[i];
      b += seed[i + 1];
      c += seed[i + 2];
			d += seed[i + 3];
			e += seed[i + 4];
			f += seed[i + 5];
			g += seed[i + 6];
			h += seed[i + 7];
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
			values[i] = a;
			values[i + 1] = b;
			values[i + 2] = c;
			values[i + 3] = d;
			values[i + 4] = e;
			values[i + 5] = f;
			values[i + 6] = g;
			values[i + 7] = h;
    }

    return values;
  }

  private _getShiftedMemory(seed: number[]): any {
    let memory = this._getSeededMemory(seed);

    let [a, b, c, d, e, f, g, h] = [
      memory[this.SIZE - 8], memory[this.SIZE - 7], memory[this.SIZE - 6],
      memory[this.SIZE - 5], memory[this.SIZE - 4], memory[this.SIZE - 3],
      memory[this.SIZE - 2], memory[this.SIZE - 1]
    ];

    for (let i = 0; i < this.SIZE; i += 8) {
			a += memory[i];
			b += memory[i + 1];
			c += memory[i + 2];
			d += memory[i + 3];
			e += memory[i + 4];
			f += memory[i + 5];
			g += memory[i + 6];
			h += memory[i + 7];
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
			memory[i] = a;
			memory[i + 1] = b;
			memory[i + 2] = c;
			memory[i + 3] = d;
			memory[i + 4] = e;
			memory[i + 5] = f;
			memory[i + 6] = g;
			memory[i + 7] = h;
		}

    return memory;
  }
}
