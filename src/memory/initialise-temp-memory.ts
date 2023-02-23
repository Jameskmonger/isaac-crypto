/**
 * Creates and returns a new memory array with 8 consecutive elements, each initialized to the specified value.
 *
 * @param value The value to use for initializing the memory elements
 * @returns A new memory array with 8 consecutive elements, each initialized to the specified value
 */
export default (value: number): number[] => {
  const memory: number[] = [];

  for (let i = 0; i < 8; i++) {
    memory[i] = value;
  }

  return memory;
}
