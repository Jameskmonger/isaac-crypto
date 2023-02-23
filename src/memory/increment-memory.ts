/**
 * Increments the values of 8 consecutive elements in the memory array starting at the specified index,
 * using the provided value function to compute the increment for each element. If any element's value exceeds
 * 32 bits after the increment, it is truncated to 32 bits by applying the bitwise AND operation with 0xffffffff.
 *
 * @param memory The memory array to modify
 * @param startIndex The index of the first element to increment
 * @param valueFunction A function that computes the increment for each element, based on its index in the memory array
 */
export default (memory: number[], startIndex: number, valueFunction: (index: number) => number): void => {
  for (let i = 0; i < 8; i++) {
    memory[i] += valueFunction(startIndex + i);
    memory[i] &= 0xffffffff;
  }
};
