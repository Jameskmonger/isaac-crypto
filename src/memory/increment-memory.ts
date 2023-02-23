export default (memory: Array<number>, startIndex: number, valueFunction: (index: number) => number): void => {
  for (let i = 0; i < 8; i++) {
    memory[i] += valueFunction(startIndex + i);
    memory[i] &= 0xffffffff;
  }
};
