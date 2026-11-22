const getTitle = (post, language) => {
  const primaryTitle = language === "bg" ? post.title_bg : post.title_en;
  const fallbackTitle = language === "bg" ? post.title_en : post.title_bg;

  return primaryTitle?.trim() || fallbackTitle?.trim() || "";
};

export const getCommunityNewsImageAlt = (post, index, language = "en") => {
  const title = getTitle(post, language);
  const imageCount = post.images?.length || 0;
  const imageNumber = index + 1;
  const isBulgarian = language === "bg";

  if (imageCount <= 1) {
    return title || (isBulgarian ? "Снимка към публикацията" : "Post image");
  }

  const position = isBulgarian
    ? `снимка ${imageNumber} от ${imageCount}`
    : `image ${imageNumber} of ${imageCount}`;

  return title ? `${title} — ${position}` : position;
};
