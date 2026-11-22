import { useId } from "react";
import { API_URL } from "../../../utilities/api";
import useFetch from "../../../utilities/useFetch";
import "./CommunityNewsImageLibraryPicker.scss";

function CommunityNewsImageLibraryPicker({ selectedUrls = [], onToggle }) {
  const headingId = useId();
  const { data, error, loading } = useFetch(`${API_URL}/assets/images`);
  const images = (data?.data || []).filter((image) => image.url);
  const selectedUrlSet = new Set(selectedUrls);

  return (
    <section
      className="community-image-library"
      aria-labelledby={`${headingId}-title`}
    >
      <header className="community-image-library__header">
        <h4 id={`${headingId}-title`}>Saved image gallery</h4>
        <p>Select one or more images. Select an image again to remove it.</p>
      </header>

      {loading && (
        <p className="community-image-library__status" role="status">
          Loading saved images...
        </p>
      )}
      {error && (
        <p
          className="community-image-library__status community-image-library__status--error"
          role="alert"
        >
          The saved image gallery could not be loaded.
        </p>
      )}
      {!loading && !error && images.length === 0 && (
        <p className="community-image-library__status">
          No saved images were found.
        </p>
      )}
      {images.length > 0 && (
        <div className="community-image-library__grid">
          {images.map((image) => {
            const isSelected = selectedUrlSet.has(image.url);
            const label = image.caption || image.fileName || "Saved image";

            return (
              <button
                className={`community-image-library__item${
                  isSelected ? " community-image-library__item--selected" : ""
                }`}
                key={image.id || image.url}
                type="button"
                onClick={() => onToggle(image)}
                aria-pressed={isSelected}
              >
                <img src={image.url} alt={label} loading="lazy" />
                <span className="community-image-library__item-label">
                  {label}
                </span>
                <span className="community-image-library__selection">
                  {isSelected ? "Selected" : "Select"}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CommunityNewsImageLibraryPicker;
