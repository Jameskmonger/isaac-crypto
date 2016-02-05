export class Utils {
  public static getInitialValues() {
    return [
      [ 'a', -3969392806 ],
      [ 'b', -1780940711 ],
      [ 'c', -1021952437 ],
      [ 'd', 255990488 ],
      [ 'e', -651539848 ],
      [ 'f', -1525007287 ],
      [ 'g', -990909925 ],
      [ 'h', 811634969 ]
    ];
  }

  public static getSeedTestCases(seedValue: number) {
    console.log(`getting ${seedValue}`);

    let outputs = [];

    var a = -3969392806;
    var b = -1780940711;
    var c = -1021952437;
    var d = 255990488;
    var e = -651539848;
    var f = -1525007287;
    var g = -990909925;
    var h = 811634969;

    var results = [];

    for (let i = 0; i < 256; i++) {
      results[i] = seedValue;
    }

    var memory = [];

    for (let i = 0; i < 256; i += 8) {
    	a += results[i];
    	b += results[i + 1];
    	c += results[i + 2];
    	d += results[i + 3];
    	e += results[i + 4];
    	f += results[i + 5];
    	g += results[i + 6];
    	h += results[i + 7];

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

    for (var _m in memory) {
      outputs.push([_m, seedValue, memory[_m]]);
    }

    return outputs;
  }
}
