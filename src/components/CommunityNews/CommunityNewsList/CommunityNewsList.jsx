import { useMemo, useState } from "react";
import CommunityNewsPostCard from "../CommunityNewsPostCard/CommunityNewsPostCard";
import "./CommunityNewsList.scss";

function CommunityNewsList({
  posts,
  onEdit = () => {},
  onDelete = () => {},
  onStatusChange = () => {},
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");

  const visiblePosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();

    return [...posts]
      .filter((post) => status === "all" || post.status === status)
      .filter((post) => {
        if (!normalizedSearch) {
          return true;
        }

        return [post.title_en, post.title_bg, post.author]
          .filter(Boolean)
          .some((value) =>
            value.toLocaleLowerCase().includes(normalizedSearch),
          );
      })
      .sort(
        (firstPost, secondPost) =>
          new Date(secondPost.publish_date) - new Date(firstPost.publish_date),
      );
  }, [posts, searchTerm, status]);

  return (
    <section className="community-news-list" aria-labelledby="community-posts-title">
      <div className="community-news-list__toolbar">
        <h2 className="community-news-list__title" id="community-posts-title">
          Saved posts
        </h2>
        <div className="community-news-list__controls">
          <label className="community-news-list__field">
            <span>Search posts</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title or author"
            />
          </label>
          <label className="community-news-list__field">
            <span>Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </label>
        </div>
        <p className="community-news-list__count" aria-live="polite">
          Showing {visiblePosts.length} of {posts.length} posts
        </p>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="community-news-list__feed">
          {visiblePosts.map((post) => (
            <CommunityNewsPostCard
              key={post.id}
              post={post}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="community-news-list__empty">
          <h3>No matching posts</h3>
          <p>Try another search or status filter.</p>
        </div>
      )}
    </section>
  );
}

export default CommunityNewsList;
