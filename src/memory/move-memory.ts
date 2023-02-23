export default (target: Array<number>, source: Array<number>, index: number): void => {
  for (let i = 0; i < 8; i++) {
    target[index + i] = source[i] & 0xffffffff;
  }
};
