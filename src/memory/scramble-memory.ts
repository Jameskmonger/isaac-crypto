/**
 * Scrambles a block of memory using a series of bitwise operations that depend on the current values in the memory
 * block.
 * 
 * This is part of the ISAAC algorithm and is used to increase the entropy of the generated results.
 * 
 * @param memory The memory block to scramble.
 */
export default (memory: number[]): void => {
  memory[0] ^= memory[1] << 11;
  memory[0] &= 0xffffffff;

  memory[3] += memory[0];
  memory[3] &= 0xffffffff;

  memory[1] += memory[2];
  memory[1] &= 0xffffffff;

  memory[1] ^= memory[2] >>> 2;
  memory[1] &= 0xffffffff;

  memory[4] += memory[1];
  memory[4] &= 0xffffffff;

  memory[2] += memory[3];
  memory[2] &= 0xffffffff;

  memory[2] ^= memory[3] << 8;
  memory[2] &= 0xffffffff;

  memory[5] += memory[2];
  memory[5] &= 0xffffffff;

  memory[3] += memory[4];
  memory[3] &= 0xffffffff;

  memory[3] ^= memory[4] >>> 16;
  memory[3] &= 0xffffffff;

  memory[6] += memory[3];
  memory[6] &= 0xffffffff;

  memory[4] += memory[5];
  memory[4] &= 0xffffffff;

  memory[4] ^= memory[5] << 10;
  memory[4] &= 0xffffffff;

  memory[7] += memory[4];
  memory[7] &= 0xffffffff;

  memory[5] += memory[6];
  memory[5] &= 0xffffffff;

  memory[5] ^= memory[6] >>> 4;
  memory[5] &= 0xffffffff;

  memory[0] += memory[5];
  memory[0] &= 0xffffffff;

  memory[6] += memory[7];
  memory[6] &= 0xffffffff;

  memory[6] ^= memory[7] << 8;
  memory[6] &= 0xffffffff;

  memory[1] += memory[6];
  memory[1] &= 0xffffffff;

  memory[7] += memory[0];
  memory[7] &= 0xffffffff;

  memory[7] ^= memory[0] >>> 9;
  memory[7] &= 0xffffffff;

  memory[2] += memory[7];
  memory[2] &= 0xffffffff;

  memory[0] += memory[1];
  memory[0] &= 0xffffffff;
};
