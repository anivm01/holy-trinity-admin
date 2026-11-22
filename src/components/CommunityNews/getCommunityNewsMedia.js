export const getCommunityNewsMedia = (post) => {
  const media = Array.isArray(post?.media)
    ? post.media
    : (post?.images || []).map((image) => ({ ...image, type: "image" }));

  return media.map((item, index) => ({
    ...item,
    type: item.type || (item.youtube_video_id ? "video" : "image"),
    client_id: item.client_id || `post-media-${index}`,
  }));
};
