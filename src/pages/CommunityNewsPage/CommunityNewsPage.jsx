import { useState } from "react";
import CommunityNewsList from "../../components/CommunityNews/CommunityNewsList/CommunityNewsList";
import CommunityNewsPostForm from "../../components/CommunityNews/CommunityNewsPostForm/CommunityNewsPostForm";
import CommunityNewsStatusConfirmation from "../../components/CommunityNews/CommunityNewsStatusConfirmation/CommunityNewsStatusConfirmation";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import Modal from "../../components/UI/Modal/Modal";
import { DeletePopup } from "../../components/UI/DeletePopup/DeletePopup";
import { communityNewsPosts } from "../../data/communityNewsPosts";
import "./CommunityNewsPage.scss";

function CommunityNewsPage() {
  const [posts, setPosts] = useState(communityNewsPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [statusPost, setStatusPost] = useState(null);

  const addPost = (post) => {
    setPosts((currentPosts) => [post, ...currentPosts]);
  };

  const updatePost = (post) => {
    setPosts((currentPosts) =>
      currentPosts.map((currentPost) =>
        currentPost.id === post.id ? post : currentPost,
      ),
    );
    setEditingPost(null);
  };

  const deletePost = () => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== deletingPost.id),
    );
    setDeletingPost(null);
  };

  const changePostStatus = () => {
    const nextStatus = statusPost.status === "published" ? "draft" : "published";

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === statusPost.id ? { ...post, status: nextStatus } : post,
      ),
    );
    setStatusPost(null);
  };

  return (
    <main className="community-news-page">
      <PageHeader title="Community News" />
      <section className="community-news-page__intro">
        <p className="community-news-page__eyebrow">Admin prototype</p>
        <h2 className="community-news-page__heading">Community posts</h2>
        <p className="community-news-page__description">
          Build a bilingual community post with optional text, images, and
          YouTube videos. This prototype keeps post records in local state. New
          images are uploaded to the shared asset library only when the post is
          saved.
        </p>
      </section>
      <CommunityNewsPostForm onSave={addPost} />
      <CommunityNewsList
        posts={posts}
        onEdit={setEditingPost}
        onDelete={setDeletingPost}
        onStatusChange={setStatusPost}
      />

      <CommunityNewsStatusConfirmation
        post={statusPost}
        onConfirm={changePostStatus}
        onCancel={() => setStatusPost(null)}
      />

      <Modal
        visible={Boolean(editingPost)}
        setVisible={(visible) => !visible && setEditingPost(null)}
        size="wide"
      >
        {editingPost && (
          <CommunityNewsPostForm
            key={editingPost.id}
            initialPost={editingPost}
            onCancel={() => setEditingPost(null)}
            onSave={updatePost}
          />
        )}
      </Modal>

      <Modal
        visible={Boolean(deletingPost)}
        setVisible={(visible) => !visible && setDeletingPost(null)}
      >
        <DeletePopup
          deleteItem={deletePost}
          setVisible={(visible) => !visible && setDeletingPost(null)}
        />
      </Modal>
    </main>
  );
}

export default CommunityNewsPage;
