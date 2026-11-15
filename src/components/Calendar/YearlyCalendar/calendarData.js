const getDateParts = (dateValue) => {
  const datePart = String(dateValue || "").split(/[T ]/)[0];
  const [year, month, day] = datePart.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return { year, monthIndex: month - 1, day };
};

export const groupCalendarEntriesByYear = (data) => {
  const groupedYears = {};
  const entries = Object.values(data || {}).flatMap((month) =>
    Array.isArray(month) ? month : [],
  );

  entries.forEach((entry) => {
    const dateParts = getDateParts(entry.date);

    if (!dateParts) {
      return;
    }

    const { year, monthIndex } = dateParts;

    if (!groupedYears[year]) {
      groupedYears[year] = Array.from({ length: 12 }, () => []);
    }

    groupedYears[year][monthIndex].push(entry);
  });

  Object.values(groupedYears).forEach((months) => {
    months.forEach((month) => {
      month.sort((firstEntry, secondEntry) => {
        const firstDate = getDateParts(firstEntry.date);
        const secondDate = getDateParts(secondEntry.date);
        return (firstDate?.day || 0) - (secondDate?.day || 0);
      });
    });
  });

  return groupedYears;
};

export const getCalendarDateDetails = (dateValue) => {
  const dateParts = getDateParts(dateValue);

  if (!dateParts) {
    return { day: "", weekdayEn: "", weekdayBg: "" };
  }

  const { year, monthIndex, day } = dateParts;
  const weekdayIndex = new Date(Date.UTC(year, monthIndex, day)).getUTCDay();
  const weekdaysEn = ["s", "m", "t", "w", "t", "f", "s"];
  const weekdaysBg = ["н", "п", "в", "с", "ч", "п", "с"];

  return {
    day,
    weekdayEn: weekdaysEn[weekdayIndex],
    weekdayBg: weekdaysBg[weekdayIndex],
  };
};
