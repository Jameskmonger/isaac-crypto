/**
 * Copies 8 values from the source array to the target array, starting at the given index.
 * If a value in the source array is greater than 32 bits, it will be truncated to fit into a 32-bit integer.
 * 
 * @param {number[]} target - The target array to copy the values to.
 * @param {number[]} source - The source array to copy the values from.
 * @param {number} index - The index of the target array to start copying the values to.
 * 
 * @returns {void}
 */
export default (target: number[], source: number[], index: number): void => {
  for (let i = 0; i < 8; i++) {
    target[index + i] = source[i] & 0xffffffff;
  }
};
