import scrambleMemory from "./scramble-memory";
import incrementMemory from "./increment-memory";
import moveMemory from "./move-memory";

export default (size: number, memory: Array<number>, temp: Array<number>, valueFunction: (index: number) => number): void => {
  for(let i = 0; i < size; i += 8) {
      incrementMemory(temp, i, valueFunction);
      scrambleMemory(temp);
      moveMemory(memory, temp, i);
  }
};
