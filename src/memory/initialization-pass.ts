import scrambleMemory from "./scramble-memory";
import incrementMemory from "./increment-memory";
import moveMemory from "./move-memory";

/**
 * Performs the initialization pass of the Salsa20 encryption algorithm. The initialization pass consists of three
 * steps: (1) incrementing values in temporary memory, (2) scrambling the temporary memory, and (3) moving the
 * scrambled temporary memory to the main memory block. These steps are repeated until the entire main memory block
 * has been initialized.
 * 
 * @param size The size of the memory block to initialize.
 * @param memory The main memory block to initialize.
 * @param temp Temporary memory used for initialization.
 * @param valueFunction A function that takes an index and returns a 32-bit unsigned integer value to be added to
 *                      temporary memory during initialization.
 */
export default (size: number, memory: number[], temp: number[], valueFunction: (index: number) => number): void => {
  for (let i = 0; i < size; i += 8) {
    incrementMemory(temp, i, valueFunction);
    scrambleMemory(temp);
    moveMemory(memory, temp, i);
  }
};
