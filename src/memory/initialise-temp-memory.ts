export default (value: number): Array<number> => {
  const memory = [];

  for (let i = 0; i < 8; i++) {
    memory[i] = value;
  }

  return memory;
}
