export class BitOperations {
  public static getLeastSignificantBit(input: number): number {
    return input & 0b1;
  }
}
