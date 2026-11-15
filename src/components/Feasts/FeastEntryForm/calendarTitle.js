export const getCalendarTitleExcerpt = (value) => {
  const title = String(value || "").trim();
  const firstPeriodIndex = title.indexOf(".");

  if (firstPeriodIndex === -1) {
    return title;
  }

  return title.slice(0, firstPeriodIndex).trim();
};
