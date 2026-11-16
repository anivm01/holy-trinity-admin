const parseFeastDate = (value) => {
  if (value instanceof Date) {
    return value;
  }

  return new Date(String(value || "").replace(" ", "T"));
};

export const groupUpcomingFeastsByMonth = (data, now = new Date()) => {
  const upcomingFeasts = [...(data || [])]
    .filter((feast) => {
      const eventDate = parseFeastDate(feast.event_date);
      return !Number.isNaN(eventDate.getTime()) && eventDate >= now;
    })
    .sort(
      (firstFeast, secondFeast) =>
        parseFeastDate(firstFeast.event_date) -
        parseFeastDate(secondFeast.event_date),
    );

  const groupedMonths = new Map();

  upcomingFeasts.forEach((feast) => {
    const eventDate = parseFeastDate(feast.event_date);
    const year = eventDate.getFullYear();
    const monthIndex = eventDate.getMonth();
    const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

    if (!groupedMonths.has(key)) {
      groupedMonths.set(key, {
        key,
        label: new Intl.DateTimeFormat("en", {
          month: "long",
          year: "numeric",
        }).format(new Date(year, monthIndex, 1)),
        feasts: [],
      });
    }

    groupedMonths.get(key).feasts.push(feast);
  });

  return [...groupedMonths.values()];
};
