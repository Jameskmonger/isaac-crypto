export class Utils {
  public static SIZE: number = 256;

  public static getInitialValues() {
    return {
      a: -3969392806,
      b: -1780940711 ,
      c: -1021952437,
      d: 255990488,
      e: -651539848,
      f: -1525007287,
      g: -990909925,
      h: 811634969
    }
  }

  public static createUniformSeed(value: number): Array<number> {
    let seed = [];

    for (let i = 0; i < Utils.SIZE; i++) {
      seed[i] = value;
    }

    return seed;
  }

  private static _getSeededMemory(seed: Array<number>) {
    let { a, b, c, d, e, f, g, h } = Utils.getInitialValues();

    let memory = [];

    for (let i = 0; i < 256; i += 8) {
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

  private static _getShiftedMemory(seedValue: number) {
    let seed = Utils.createUniformSeed(seedValue);
    let memory = Utils._getSeededMemory(seed);

    let [a, b, c, d, e, f, g, h] = [
      memory[Utils.SIZE - 8], memory[Utils.SIZE - 7], memory[Utils.SIZE - 6],
      memory[Utils.SIZE - 5], memory[Utils.SIZE - 4], memory[Utils.SIZE - 3],
      memory[Utils.SIZE - 2], memory[Utils.SIZE - 1]
    ];

    for (let i = 0; i < Utils.SIZE; i += 8) {
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

  public static getSeedTestCases(seedValue: number) {
    let outputs = [];

    let seed = Utils.createUniformSeed(seedValue);

    let memory = Utils._getSeededMemory(seed);

    for (let _m in memory) {
      outputs.push([_m, seedValue, memory[_m]]);
    }

    return outputs;
  }
}
