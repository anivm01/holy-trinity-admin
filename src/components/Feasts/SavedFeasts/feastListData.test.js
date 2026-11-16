import { groupUpcomingFeastsByMonth } from "./feastListData";

describe("groupUpcomingFeastsByMonth", () => {
  const now = new Date("2026-11-15T12:00:00");

  it("removes past feasts and orders future feasts by month and date", () => {
    const months = groupUpcomingFeastsByMonth(
      [
        { id: 4, event_date: "2027-01-06T10:30:00" },
        { id: 2, event_date: "2026-11-20T10:30:00" },
        { id: 1, event_date: "2026-11-14T10:30:00" },
        { id: 3, event_date: "2026-12-25T10:30:00" },
        { id: 5, event_date: "2026-11-16T10:30:00" },
      ],
      now,
    );

    expect(months.map((month) => month.key)).toEqual([
      "2026-11",
      "2026-12",
      "2027-01",
    ]);
    expect(months[0].feasts.map((feast) => feast.id)).toEqual([5, 2]);
  });
});
