import { expect, describe, it } from "vitest";
import { isOdd } from ".";

describe("isOdd", () => {
  it("should return true when the number is even", () => {
    expect(isOdd(1)).toBe(true);
  });
});
