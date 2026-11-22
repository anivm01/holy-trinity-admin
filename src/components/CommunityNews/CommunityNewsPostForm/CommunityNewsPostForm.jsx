import { useId, useState } from "react";
import { getDefaultDateTime } from "../../../utilities/dateConverter";
import Button from "../../UI/Button/Button";
import DatetimeInput from "../../UI/DatetimeInput/DatetimeInput";
import Input from "../../UI/Input/Input";
import VideoIcon from "../../../assets/svg/VideoIcon/VideoIcon";
import Wysiwyg from "../../UI/Wysiwyg/Wysiwyg";
import CommunityNewsHomePreview from "../CommunityNewsHomePreview/CommunityNewsHomePreview";
import CommunityNewsImageLibraryPicker from "../CommunityNewsImageLibraryPicker/CommunityNewsImageLibraryPicker";
import { getCommunityNewsMedia } from "../getCommunityNewsMedia";
import { getCommunityNewsImageAlt } from "../getCommunityNewsImageAlt";
import { uploadCommunityNewsImage } from "../uploadCommunityNewsImage";
import "./CommunityNewsPostForm.scss";

const createEmptyPost = () => ({
  title_en: "",
  title_bg: "",
  body_en: "",
  body_bg: "",
  author: "",
  publish_date: getDefaultDateTime(10, 30),
  status: "draft",
  media: [],
});

const createFormPost = (initialPost) => ({
  ...createEmptyPost(),
  ...initialPost,
  media: getCommunityNewsMedia(initialPost).map((image, index) => ({
    ...image,
    client_id:
      image.client_id || `existing-${initialPost?.id || "post"}-${index}`,
    is_unsaved_preview: false,
  })),
});

function CommunityNewsPostForm({ initialPost, onCancel, onSave }) {
  const formId = useId();
  const [post, setPost] = useState(() => createFormPost(initialPost));
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const isEditing = Boolean(initialPost?.id);
  const imageMedia = post.media.filter((item) => item.type === "image");
  const failedImageCount = imageMedia.filter(
    (image) => image.upload_status === "error",
  ).length;
  const selectedLibraryUrls = imageMedia
    .filter((image) => !image.file)
    .map((image) => image.url);

  const updateField = (event) => {
    const { name, value } = event.target;
    setPost((currentPost) => ({ ...currentPost, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    setFormMessage("");
  };

  const setContent = (field) => (content) => {
    setPost((currentPost) => ({ ...currentPost, [field]: content }));
    setFormMessage("");
  };

  const addImages = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length !== selectedFiles.length) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        media: "Only image files can be added to a post.",
      }));
    } else {
      setErrors((currentErrors) => ({ ...currentErrors, media: "" }));
    }

    if (imageFiles.length) {
      const timestamp = Date.now();
      const nextImages = imageFiles.map((file, index) => ({
        client_id: `${timestamp}-${index}`,
        type: "image",
        url: URL.createObjectURL(file),
        file,
        file_name: file.name,
        comment_en: "",
        comment_bg: "",
        upload_status: "pending",
        upload_error: "",
        is_local_preview: true,
        is_unsaved_preview: true,
      }));

      setPost((currentPost) => ({
        ...currentPost,
        media: [...currentPost.media, ...nextImages],
      }));
      setFormMessage("");
    }

    event.target.value = "";
  };

  const toggleLibraryImage = (libraryImage) => {
    setPost((currentPost) => {
      const selectedImage = currentPost.media.find(
        (image) =>
          image.type === "image" &&
          !image.file &&
          image.url === libraryImage.url,
      );

      if (selectedImage) {
        return {
          ...currentPost,
          media: currentPost.media.filter(
            (image) => image.client_id !== selectedImage.client_id,
          ),
        };
      }

      return {
        ...currentPost,
        media: [
          ...currentPost.media,
          {
            client_id: `library-${libraryImage.id || Date.now()}`,
            type: "image",
            url: libraryImage.url,
            file_name: libraryImage.fileName || "Saved image",
            comment_en: "",
            comment_bg: "",
            image_source: "library",
            is_local_preview: false,
            is_unsaved_preview: false,
          },
        ],
      };
    });
    setFormMessage("");
  };

  const updateImageComment = (clientId, field, value) => {
    setPost((currentPost) => ({
      ...currentPost,
      media: currentPost.media.map((image) =>
        image.client_id === clientId ? { ...image, [field]: value } : image,
      ),
    }));
    setFormMessage("");
  };

  const removeImage = (clientId) => {
    setPost((currentPost) => {
      const removedImage = currentPost.media.find(
        (image) => image.client_id === clientId,
      );

      if (removedImage?.is_unsaved_preview) {
        URL.revokeObjectURL(removedImage.url);
      }

      return {
        ...currentPost,
        media: currentPost.media.filter(
          (image) => image.client_id !== clientId,
        ),
      };
    });
    setFormMessage("");
  };

  const moveImage = (index, direction) => {
    const destination = index + direction;

    if (destination < 0 || destination >= post.media.length) {
      return;
    }

    setPost((currentPost) => {
      const nextMedia = [...currentPost.media];
      const [movedItem] = nextMedia.splice(index, 1);
      nextMedia.splice(destination, 0, movedItem);
      return { ...currentPost, media: nextMedia };
    });
    setFormMessage("");
  };

  const addYoutubeVideo = () => {
    const videoId = youtubeVideoId.trim();

    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        video: "Enter a valid 11-character YouTube video ID.",
      }));
      return;
    }

    setPost((currentPost) => ({
      ...currentPost,
      media: [
        ...currentPost.media,
        {
          client_id: `youtube-${videoId}-${Date.now()}`,
          type: "video",
          youtube_video_id: videoId,
          comment_en: "",
          comment_bg: "",
        },
      ],
    }));
    setYoutubeVideoId("");
    setErrors((currentErrors) => ({ ...currentErrors, video: "" }));
    setFormMessage("");
  };

  const resetForm = () => {
    post.media.forEach((image) => {
      if (image.is_unsaved_preview) {
        URL.revokeObjectURL(image.url);
      }
    });
    setPost(createFormPost(initialPost));
    setYoutubeVideoId("");
    setErrors({});
    setFormMessage("");
    onCancel?.();
  };

  const submitPost = async (event) => {
    event.preventDefault();
    const nextErrors = {
      title_en: post.title_en.trim() ? "" : "Add the English title.",
      title_bg: post.title_bg.trim() ? "" : "Add the Bulgarian title.",
    };

    if (nextErrors.title_en || nextErrors.title_bg) {
      setErrors(nextErrors);
      setFormMessage("Add both required titles before saving the post.");
      return;
    }

    setIsSaving(true);
    setFormMessage("");

    const uploadResults = await Promise.all(
      post.media.map(async (item) => {
        if (item.type !== "image" || !item.file) {
          return { item, succeeded: true };
        }

        try {
          const uploadedImage = await uploadCommunityNewsImage(item.file);
          URL.revokeObjectURL(item.url);
          return {
            succeeded: true,
            item: {
              ...item,
              url: uploadedImage.url,
              upload_id: uploadedImage.id,
              upload_status: "uploaded",
              upload_error: "",
              file: undefined,
              is_local_preview: false,
              is_unsaved_preview: false,
            },
          };
        } catch (error) {
          return {
            succeeded: false,
            item: {
              ...item,
              upload_status: "error",
              upload_error:
                error.response?.data?.message ||
                error.message ||
                "The image could not be uploaded.",
            },
          };
        }
      }),
    );
    const nextMedia = uploadResults.map((result) => result.item);
    const uploadFailed = uploadResults.some((result) => !result.succeeded);

    if (uploadFailed) {
      setPost((currentPost) => ({ ...currentPost, media: nextMedia }));
      setFormMessage(
        "Some images could not be uploaded. Save again to retry them, or remove them.",
      );
      setIsSaving(false);
      return;
    }

    const savedPost = {
      ...post,
      id: initialPost?.id || Date.now(),
      title_en: post.title_en.trim(),
      title_bg: post.title_bg.trim(),
      author: post.author.trim(),
      media: nextMedia.map((item) =>
        item.type === "video"
          ? {
              type: "video",
              youtube_video_id: item.youtube_video_id,
              comment_en: item.comment_en || "",
              comment_bg: item.comment_bg || "",
            }
          : {
              type: "image",
              url: item.url,
              comment_en: item.comment_en,
              comment_bg: item.comment_bg,
            },
      ),
      images: nextMedia.filter((item) => item.type === "image").map((image) => ({
        url: image.url,
        comment_en: image.comment_en,
        comment_bg: image.comment_bg,
      })),
    };

    onSave(savedPost);
    setErrors({});
    setIsSaving(false);

    if (isEditing) {
      setFormMessage("Changes saved to the local prototype.");
      return;
    }

    setPost(createEmptyPost());
    setYoutubeVideoId("");
    setFormMessage("Post added to the local prototype.");
  };

  return (
    <>
      <section className="community-post-form" aria-labelledby={`${formId}-title`}>
      <form className="community-post-form__box" onSubmit={submitPost} noValidate>
        <header className="community-post-form__header">
          <div>
            <p className="community-post-form__eyebrow">
              {isEditing ? "Edit post" : "New post"}
            </p>
            <h2 id={`${formId}-title`}>
              {isEditing ? "Update community post" : "Create community post"}
            </h2>
          </div>
          <p>Only the English and Bulgarian titles are required.</p>
        </header>

        <div className="community-post-form__fields community-post-form__fields--titles">
          <div>
            <Input
              label="Title in English *"
              id={`${formId}-title-en`}
              name="title_en"
              value={post.title_en}
              onChange={updateField}
              aria-invalid={Boolean(errors.title_en)}
              aria-describedby={
                errors.title_en ? `${formId}-title-en-error` : undefined
              }
            />
            {errors.title_en && (
              <p
                className="community-post-form__field-error"
                id={`${formId}-title-en-error`}
              >
                {errors.title_en}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Заглавие на български *"
              id={`${formId}-title-bg`}
              name="title_bg"
              value={post.title_bg}
              onChange={updateField}
              aria-invalid={Boolean(errors.title_bg)}
              aria-describedby={
                errors.title_bg ? `${formId}-title-bg-error` : undefined
              }
            />
            {errors.title_bg && (
              <p
                className="community-post-form__field-error"
                id={`${formId}-title-bg-error`}
              >
                {errors.title_bg}
              </p>
            )}
          </div>
        </div>

        <div className="community-post-form__fields community-post-form__fields--details">
          <Input
            label="Author (optional)"
            id={`${formId}-author`}
            name="author"
            value={post.author}
            onChange={updateField}
          />
          <DatetimeInput
            label="Publication date"
            id={`${formId}-publish-date`}
            name="publish_date"
            value={post.publish_date}
            onChange={updateField}
          />
          <label className="community-post-form__status-field">
            <span>Status</span>
            <select name="status" value={post.status} onChange={updateField}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        <div className="community-post-form__editors">
          <Wysiwyg
            editorLabel="Post text in English (optional)"
            content={post.body_en}
            setContent={setContent("body_en")}
            squareCorners
          />
          <Wysiwyg
            editorLabel="Текст на публикацията на български (по желание)"
            content={post.body_bg}
            setContent={setContent("body_bg")}
            squareCorners
          />
        </div>

        <section
          className="community-post-form__media"
          aria-labelledby={`${formId}-media-title`}
        >
          <div className="community-post-form__media-header">
            <div>
              <h3 id={`${formId}-media-title`}>Post media</h3>
              <p id={`${formId}-images-help`}>
                Choose several images at once with Ctrl or Shift on Windows,
                or Command or Shift on Mac. New files stay on this form until
                you save the post. Add YouTube videos with their video ID, then
                arrange all media in the order you want.
              </p>
            </div>
            <div className="community-post-form__media-actions">
              <label className="community-post-form__file-button">
                <span>Add new images</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  multiple
                  aria-describedby={`${formId}-images-help`}
                  onChange={addImages}
                  disabled={isSaving}
                />
              </label>
              <button
                className="community-post-form__library-button"
                type="button"
                onClick={() => setShowImageLibrary((isVisible) => !isVisible)}
                disabled={isSaving}
                aria-expanded={showImageLibrary}
              >
                {showImageLibrary
                  ? "Close saved images"
                  : "Choose saved images"}
              </button>
              <div className="community-post-form__youtube-add">
                <Input
                  label="YouTube video ID"
                  id={`${formId}-youtube-id`}
                  value={youtubeVideoId}
                  onChange={(event) => setYoutubeVideoId(event.target.value)}
                  aria-invalid={Boolean(errors.video)}
                  aria-describedby={errors.video ? `${formId}-youtube-error` : undefined}
                />
                <button
                  className="community-post-form__library-button"
                  type="button"
                  onClick={addYoutubeVideo}
                  disabled={isSaving}
                >
                  Add video
                </button>
              </div>
            </div>
          </div>

          {(errors.media || errors.video) && (
            <p
              className="community-post-form__field-error"
              id={errors.video ? `${formId}-youtube-error` : undefined}
              role="alert"
            >
              {errors.media || errors.video}
            </p>
          )}

          {failedImageCount > 0 && (
            <p
              className="community-post-form__upload-summary community-post-form__upload-summary--error"
              role="alert"
            >
              {failedImageCount} {failedImageCount === 1 ? "image" : "images"}{" "}
              could not be uploaded. Save again to retry or remove the failed
              files.
            </p>
          )}

          {showImageLibrary && (
            <CommunityNewsImageLibraryPicker
              selectedUrls={selectedLibraryUrls}
              onToggle={toggleLibraryImage}
            />
          )}

          {post.media.length > 0 ? (
            <div className="community-post-form__image-list">
              {post.media.map((image, index) => (
                <article
                  className={`community-post-form__image-card community-post-form__image-card--${image.type}`}
                  key={image.client_id}
                >
                  {image.type === "video" ? (
                    <div className="community-post-form__video-thumbnail">
                      <img
                        src={`https://img.youtube.com/vi/${image.youtube_video_id}/maxresdefault.jpg`}
                        alt={`YouTube video ${image.youtube_video_id}`}
                      />
                      <VideoIcon aria-hidden="true" />
                    </div>
                  ) : (
                    <img
                      src={image.url}
                      alt={getCommunityNewsImageAlt(
                        { ...post, images: imageMedia },
                        imageMedia.findIndex(
                          (item) => item.client_id === image.client_id,
                        ),
                      )}
                    />
                  )}
                  <div className="community-post-form__image-details">
                    <p className="community-post-form__image-position">
                      {image.type === "video" ? "Video" : "Image"} {index + 1} of{" "}
                      {post.media.length}
                    </p>
                    {image.file_name && (
                      <p className="community-post-form__file-name">
                        {image.file_name}
                      </p>
                    )}
                    {(image.upload_status || image.image_source === "library") && (
                      <p
                        className={`community-post-form__image-upload-status community-post-form__image-upload-status--${image.upload_status || image.image_source}`}
                      >
                        {image.upload_status === "pending" &&
                          "Ready to upload when the post is saved"}
                        {image.upload_status === "uploaded" && "Image uploaded"}
                        {image.upload_status === "error" &&
                          `Upload failed: ${image.upload_error}. Save again to retry.`}
                        {image.image_source === "library" && "Saved image"}
                      </p>
                    )}
                    {image.type === "video" && (
                      <p className="community-post-form__file-name">
                        YouTube ID: {image.youtube_video_id}
                      </p>
                    )}
                    {image.type === "image" && (
                      <>
                    <Input
                      label="English image comment (optional)"
                      id={`${formId}-${image.client_id}-comment-en`}
                      value={image.comment_en}
                      onChange={(event) =>
                        updateImageComment(
                          image.client_id,
                          "comment_en",
                          event.target.value,
                        )
                      }
                    />
                    <Input
                      label="Коментар към снимката на български (по желание)"
                      id={`${formId}-${image.client_id}-comment-bg`}
                      value={image.comment_bg}
                      onChange={(event) =>
                        updateImageComment(
                          image.client_id,
                          "comment_bg",
                          event.target.value,
                        )
                      }
                    />
                      </>
                    )}
                    {image.type === "video" && (
                      <>
                        <Input
                          label="English video comment (optional)"
                          id={`${formId}-${image.client_id}-comment-en`}
                          value={image.comment_en || ""}
                          onChange={(event) =>
                            updateImageComment(
                              image.client_id,
                              "comment_en",
                              event.target.value,
                            )
                          }
                        />
                        <Input
                          label="Bulgarian video comment (optional)"
                          id={`${formId}-${image.client_id}-comment-bg`}
                          value={image.comment_bg || ""}
                          onChange={(event) =>
                            updateImageComment(
                              image.client_id,
                              "comment_bg",
                              event.target.value,
                            )
                          }
                        />
                      </>
                    )}
                    <div className="community-post-form__image-actions">
                      <button
                        type="button"
                        onClick={() => moveImage(index, -1)}
                        disabled={isSaving || index === 0}
                      >
                        Move earlier
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(index, 1)}
                        disabled={isSaving || index === post.media.length - 1}
                      >
                        Move later
                      </button>
                      <button
                        className="community-post-form__remove-image"
                        type="button"
                        onClick={() => removeImage(image.client_id)}
                        disabled={isSaving}
                      >
                        Remove media
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="community-post-form__no-images">
              No media selected. A title-only or text-only post is valid.
            </p>
          )}
        </section>

        {formMessage && (
          <p
            className={`community-post-form__message${
              errors.title_en || errors.title_bg || failedImageCount
                ? " community-post-form__message--error"
                : ""
            }`}
            role={
              errors.title_en || errors.title_bg || failedImageCount
                ? "alert"
                : "status"
            }
          >
            {formMessage}
          </p>
        )}

        <div className="community-post-form__actions">
          <Button
            className="community-post-form__save"
            type="submit"
            disabled={isSaving}
            text={isSaving
              ? "Saving post..."
              : isEditing
                ? "Save changes"
                : "Add post"}
            variant="primary"
          />
          <Button
            className="community-post-form__reset"
            type="button"
            onClick={resetForm}
            disabled={isSaving}
            text={isEditing ? "Cancel editing" : "Clear form"}
            variant="secondary"
          />
        </div>
        </form>
      </section>
      <CommunityNewsHomePreview post={post} />
    </>
  );
}

export default CommunityNewsPostForm;
