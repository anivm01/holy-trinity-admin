import DOMPurify from "dompurify";
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from "../../../utilities/api";
import useFetch from "../../../utilities/useFetch";
import DeleteObituary from "../DeleteObituary/DeleteObituary";
import EditObituary from "../EditObituary/EditObituary";
import "./ObituariesList.scss";

const sanitizedPreview = (content) => ({
  __html: DOMPurify.sanitize(content || ""),
});

function ObituariesList() {
  const { data, error, loading } = useFetch(`${API_URL}/obituaries`);

  if (loading) {
    return (
      <div className="obituaries-list__status" aria-live="polite">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#6F0B20"
          ariaLabel="Loading obituaries"
          wrapperStyle={{ justifyContent: "center" }}
          visible
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="obituaries-list__status obituaries-list__status--error" role="alert">
        <h2>Obituaries could not be loaded.</h2>
        <p>Please check that the server is running and try again.</p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="obituaries-list__status">
        <h2>No obituaries yet</h2>
        <p>Obituaries added to the database will appear here.</p>
      </div>
    );
  }

  return (
    <section className="obituaries-list" aria-label="Saved obituaries">
      {data.map((obituary) => {
        const previews = [
          obituary.obituary?.trim() && {
            content: obituary.obituary,
            label: "English",
            lang: "en",
          },
          obituary.obituary_bg?.trim() && {
            content: obituary.obituary_bg,
            label: "Български",
            lang: "bg",
          },
        ].filter(Boolean);

        return (
          <div className="obituaries-list__item" key={obituary.id}>
            <article className="obituaries-list__card">
              <img
                className="obituaries-list__image"
                src={obituary.image_url}
                alt={obituary.name || obituary.name_bg || "Obituary portrait"}
                loading="lazy"
              />
              <div className="obituaries-list__content">
                <header className="obituaries-list__memorial">
                  <h2 className="obituaries-list__name">
                    {obituary.name || obituary.name_bg || "Unnamed obituary"}
                  </h2>
                  {obituary.name && obituary.name_bg && (
                    <p className="obituaries-list__name-bg" lang="bg">
                      {obituary.name_bg}
                    </p>
                  )}
                  <p className="obituaries-list__years">
                    {obituary.years?.trim() || "Dates not provided"}
                  </p>
                </header>

                {previews.length ? (
                  <div className="obituaries-list__excerpts">
                    {previews.map((preview) => (
                      <section
                        className="obituaries-list__excerpt"
                        key={preview.lang}
                        lang={preview.lang}
                      >
                        <span className="obituaries-list__language">
                          {preview.label}
                        </span>
                        <div
                          className="obituaries-list__preview"
                          dangerouslySetInnerHTML={sanitizedPreview(
                            preview.content,
                          )}
                        />
                      </section>
                    ))}
                  </div>
                ) : (
                  <p className="obituaries-list__preview obituaries-list__preview--empty">
                    No obituary text has been added.
                  </p>
                )}
              </div>
            </article>

            <div className="obituaries-list__actions" aria-label="Obituary actions">
              <EditObituary single={obituary} />
              <DeleteObituary id={obituary.id} />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ObituariesList;
