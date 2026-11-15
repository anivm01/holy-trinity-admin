import {
  getCalendarDateDetails,
  groupCalendarEntriesByYear,
} from "./calendarData";

describe("yearly calendar data", () => {
  it("groups entries by year and month regardless of the API group labels", () => {
    const januaryEntry = { id: 1, date: "2025-01-08T00:00:00.000Z" };
    const novemberEntry = { id: 2, date: "2026-11-15T00:00:00.000Z" };
    const groupedYears = groupCalendarEntriesByYear({
      "first group": [novemberEntry],
      "second group": [januaryEntry],
    });

    expect(groupedYears[2025][0]).toEqual([januaryEntry]);
    expect(groupedYears[2026][10]).toEqual([novemberEntry]);
    expect(groupedYears[2026]).toHaveLength(12);
  });

  it("returns localized weekday labels without shifting the calendar date", () => {
    expect(getCalendarDateDetails("2026-11-15T00:00:00.000Z")).toEqual({
      day: 15,
      weekdayEn: "s",
      weekdayBg: "н",
    });
  });
});
