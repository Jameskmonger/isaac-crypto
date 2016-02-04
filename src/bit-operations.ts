export class BitOperations {
  public static getLeastSignificantBit(input: number): number {
    return input & 0b0001;
  }

  public static getMostSignificantBit(input: number): number {
    let negative: boolean = (input < 0);

    // If negative, the MSB is 0. Otherwise it's 1.
    return negative ? 0 : 1;
  }
}
