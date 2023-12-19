import { expect, describe, it } from "vitest";
import { isEven } from ".";

describe("isEven", () => {
  it("should return true when the number is even", () => {
    expect(isEven(0)).toBe(true);
  });
});
