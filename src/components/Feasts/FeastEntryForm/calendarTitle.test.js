import { getCalendarTitle } from "./calendarTitle";

describe("getCalendarTitle", () => {
  it("returns the complete calendar title", () => {
    expect(
      getCalendarTitle("The first feast title. More calendar text."),
    ).toBe("The first feast title. More calendar text.");
  });

  it("trims surrounding whitespace", () => {
    expect(getCalendarTitle("  A complete calendar title  ")).toBe(
      "A complete calendar title",
    );
  });
});
