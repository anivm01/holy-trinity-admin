const resolveAssociatedFeast = (entry, onAddAssociatedFeast) => {
  const hasCustomFeast =
    !entry.associated_feast_id &&
    (entry.associated_feast_name_en.trim() ||
      entry.associated_feast_name_bg.trim());

  if (!hasCustomFeast) {
    return entry;
  }

  const feast = onAddAssociatedFeast({
    name_en: entry.associated_feast_name_en.trim(),
    name_bg: entry.associated_feast_name_bg.trim(),
  });

  if (!feast) {
    return entry;
  }

  return {
    ...entry,
    associated_feast_id: feast.id,
    associated_feast_name_en: feast.name_en,
    associated_feast_name_bg: feast.name_bg,
  };
};

export default resolveAssociatedFeast;
