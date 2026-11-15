import { getCalendarTitleExcerpt } from "./calendarTitle";

describe("getCalendarTitleExcerpt", () => {
  it("returns only the text before the first period", () => {
    expect(
      getCalendarTitleExcerpt("The first feast title. More calendar text."),
    ).toBe("The first feast title");
  });

  it("returns the complete title when it has no period", () => {
    expect(getCalendarTitleExcerpt("A complete title without punctuation")).toBe(
      "A complete title without punctuation",
    );
  });
});
