import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./MessagesTable.scss";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import EditMessage from "../EditMessage/EditMessage";
import ViewMessage from "../ViewMessage/ViewMessage";
import { createPlainTextMarkup } from "../../../utilities/createMarkup";

function MessagesTable({
  messages = [],
  associatedFeasts = [],
  messageTags = [],
  onUpdateMessage,
  onMakeMessageVisible,
  onDeleteMessage,
  onAddTag,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeastId, setSelectedFeastId] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [hasHiddenTagRows, setHasHiddenTagRows] = useState(false);
  const [firstRowTagCount, setFirstRowTagCount] = useState(messageTags.length);
  const [collapsedTagHeight, setCollapsedTagHeight] = useState(0);
  const [activatingMessageId, setActivatingMessageId] = useState(null);
  const [activationError, setActivationError] = useState("");
  const tagOptionsRef = useRef(null);

  const makeVisible = async (messageId) => {
    setActivatingMessageId(messageId);
    setActivationError("");

    try {
      await onMakeMessageVisible(messageId);
    } catch (error) {
      setActivationError(error.message || "Unable to make the message visible.");
    } finally {
      setActivatingMessageId(null);
    }
  };

  const sortedAssociatedFeasts = useMemo(
    () =>
      [...associatedFeasts].sort((firstFeast, secondFeast) =>
        (firstFeast.name_en || firstFeast.name_bg || "").localeCompare(
          secondFeast.name_en || secondFeast.name_bg || "",
          "en",
          { sensitivity: "base" },
        ),
      ),
    [associatedFeasts],
  );

  const sortedTagOptions = useMemo(() => {
    const usageCounts = new Map();

    messages.forEach((message) => {
      const uniqueTagIds = new Set(
        (message.tags || []).map((tagId) => String(tagId)),
      );

      uniqueTagIds.forEach((tagId) => {
        usageCounts.set(tagId, (usageCounts.get(tagId) || 0) + 1);
      });
    });

    return messageTags
      .map((tag) => ({
        ...tag,
        filterId: String(tag.id),
        usageCount: usageCounts.get(String(tag.id)) || 0,
      }))
      .sort(
        (firstTag, secondTag) =>
          secondTag.usageCount - firstTag.usageCount ||
          firstTag.label.localeCompare(secondTag.label, undefined, {
            sensitivity: "base",
          }),
      );
  }, [messageTags, messages]);

  useLayoutEffect(() => {
    const tagOptions = tagOptionsRef.current;

    if (!tagOptions) {
      return undefined;
    }

    const measureTagRows = () => {
      const tagButtons = Array.from(tagOptions.children);

      if (!tagButtons.length) {
        setFirstRowTagCount(0);
        setCollapsedTagHeight(0);
        setHasHiddenTagRows(false);
        return;
      }

      const firstRowTop = tagButtons[0].offsetTop;
      const firstRowButtons = tagButtons.filter(
        (button) => Math.abs(button.offsetTop - firstRowTop) < 2,
      );
      const hasMoreThanOneRow = firstRowButtons.length < tagButtons.length;

      setFirstRowTagCount(firstRowButtons.length);
      setCollapsedTagHeight(
        Math.max(...firstRowButtons.map((button) => button.offsetHeight)),
      );
      setHasHiddenTagRows(hasMoreThanOneRow);

      if (!hasMoreThanOneRow) {
        setTagsExpanded(false);
      }
    };

    measureTagRows();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measureTagRows);
    resizeObserver?.observe(tagOptions);
    window.addEventListener("resize", measureTagRows);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureTagRows);
    };
  }, [sortedTagOptions]);

  const toggleTag = (tagId) => {
    setSelectedTagIds((currentTagIds) =>
      currentTagIds.includes(tagId)
        ? currentTagIds.filter((currentTagId) => currentTagId !== tagId)
        : [...currentTagIds, tagId],
    );
  };

  const filteredMessages = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

    return messages.filter((message) => {
      if (
        selectedFeastId &&
        String(message.associated_feast_id) !== selectedFeastId
      ) {
        return false;
      }

      const messageTagIds = (message.tags || []).map((tagId) => String(tagId));

      if (
        selectedTagIds.length &&
        !selectedTagIds.every((tagId) => messageTagIds.includes(tagId))
      ) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const associatedFeast = associatedFeasts.find(
        (feast) => feast.id === message.associated_feast_id,
      );
      const selectedTagLabels = messageTags
        .filter((tag) => (message.tags || []).includes(tag.id))
        .map((tag) => tag.label);
      const searchableValues = [
        message.title_en,
        message.title_bg,
        associatedFeast?.name_en,
        associatedFeast?.name_bg,
        message.associated_feast_name_en,
        message.associated_feast_name_bg,
        ...selectedTagLabels,
      ];

      return searchableValues.some((value) =>
        String(value || "")
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      );
    });
  }, [
    associatedFeasts,
    messageTags,
    messages,
    searchQuery,
    selectedFeastId,
    selectedTagIds,
  ]);

  if (!messages.length) {
    return (
      <div className="messages-table--empty">
        <p>No priest messages have been added yet.</p>
      </div>
    );
  }

  return (
    <section className="messages-list" aria-label="Priest messages">
      <div className="messages-list__search">
        <div className="messages-list__filter">
          <label
            className="messages-list__search-label"
            htmlFor="messages-search"
          >
            Search messages
          </label>
          <div className="messages-list__search-control">
            <input
              id="messages-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title, associated feast, or tag"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}>
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="messages-list__filter">
          <label
            className="messages-list__search-label"
            htmlFor="messages-feast-filter"
          >
            Associated feast
          </label>
          <div className="messages-list__search-control">
            <select
              id="messages-feast-filter"
              value={selectedFeastId}
              onChange={(event) => setSelectedFeastId(event.target.value)}
            >
              <option value="">All associated feasts</option>
              {sortedAssociatedFeasts.map((feast) => (
                <option key={feast.id} value={feast.id}>
                  {[feast.name_en, feast.name_bg].filter(Boolean).join(" / ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="messages-list__result-count" aria-live="polite">
          {searchQuery.trim() || selectedFeastId || selectedTagIds.length
            ? `${filteredMessages.length} ${
                filteredMessages.length === 1 ? "message" : "messages"
              } found`
            : `${messages.length} ${messages.length === 1 ? "message" : "messages"}`}
        </p>

        {sortedTagOptions.length > 0 && (
          <div className="messages-list__tag-filter">
            <div className="messages-list__tag-filter-header">
              <div>
                <span id="messages-tag-filter-label">Filter by tag</span>
                <span className="messages-list__tag-filter-hint">
                  Matches all selected tags
                </span>
              </div>
              {selectedTagIds.length > 0 && (
                <button
                  className="messages-list__clear-tags"
                  type="button"
                  onClick={() => setSelectedTagIds([])}
                >
                  Clear selected ({selectedTagIds.length})
                </button>
              )}
            </div>

            <div
              className="messages-list__tag-options-viewport"
              style={
                !tagsExpanded && hasHiddenTagRows
                  ? { maxHeight: `${collapsedTagHeight}px` }
                  : undefined
              }
            >
              <div
                className="messages-list__tag-options"
                id="messages-tag-options"
                ref={tagOptionsRef}
                role="group"
                aria-labelledby="messages-tag-filter-label"
              >
                {sortedTagOptions.map((tag, index) => {
                  const isSelected = selectedTagIds.includes(tag.filterId);
                  const isHidden =
                    hasHiddenTagRows &&
                    !tagsExpanded &&
                    index >= firstRowTagCount;

                  return (
                    <button
                      className="messages-list__tag-option"
                      type="button"
                      key={tag.id}
                      lang={tag.language}
                      aria-label={`${tag.label}, used by ${tag.usageCount} ${
                        tag.usageCount === 1 ? "message" : "messages"
                      }`}
                      aria-pressed={isSelected}
                      aria-hidden={isHidden || undefined}
                      tabIndex={isHidden ? -1 : undefined}
                      onClick={() => toggleTag(tag.filterId)}
                    >
                      <span>{tag.label}</span>
                      <span
                        className="messages-list__tag-count"
                        aria-hidden="true"
                      >
                        {tag.usageCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {hasHiddenTagRows && (
              <button
                className="messages-list__tag-toggle"
                type="button"
                aria-expanded={tagsExpanded}
                aria-controls="messages-tag-options"
                onClick={() => setTagsExpanded((isExpanded) => !isExpanded)}
              >
                {tagsExpanded ? "Show fewer tags" : "Show all tags"}
                <span aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>

      {activationError && (
        <p className="messages-list__action-error" role="alert">
          {activationError}
        </p>
      )}

      {!filteredMessages.length ? (
        <div className="messages-table--empty">
          <p>No messages match the current search and filter.</p>
        </div>
      ) : (
        <div className="messages-table">
      {filteredMessages.map((message) => {
        const associatedFeast = associatedFeasts.find(
          (feast) => feast.id === message.associated_feast_id,
        );
        const selectedTags = messageTags.filter((tag) =>
          (message.tags || []).includes(tag.id),
        );

        return (
          <div className="messages-table__row" key={message.id}>
            <div className="messages-table__content">
              <div className="messages-table__metadata">
                <div className="messages-table__feast">
                  <span className="messages-table__meta-label">
                    Associated feast
                  </span>
                  {associatedFeast ? (
                    <div className="messages-table__feast-names">
                      <span lang="en">{associatedFeast.name_en}</span>
                      <span
                        className="messages-table__feast-separator"
                        aria-hidden="true"
                      >
                        /
                      </span>
                      <span lang="bg">{associatedFeast.name_bg}</span>
                    </div>
                  ) : (
                    <span className="messages-table__empty-meta">None</span>
                  )}
                </div>

                <div className="messages-table__tags">
                  <span className="messages-table__meta-label">Tags</span>
                  {selectedTags.length ? (
                    <div className="messages-table__tag-list">
                      {selectedTags.map((tag) => (
                        <span
                          className="messages-table__tag"
                          key={tag.id}
                          lang={tag.language}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="messages-table__empty-meta">No tags</span>
                  )}
                </div>
              </div>

              <div className="messages-table__translations">
                <section className="messages-table__translation" lang="en">
                  <p className="messages-table__language">English</p>
                  <h3 className="messages-table__title">
                    {message.title_en || "Untitled message"}
                  </h3>
                  <p
                    className="messages-table__preview"
                    dangerouslySetInnerHTML={createPlainTextMarkup(
                      message.message_en || "No English message text yet.",
                    )}
                  />
                </section>

                <section className="messages-table__translation" lang="bg">
                  <p className="messages-table__language">Bulgarian</p>
                  <h3 className="messages-table__title">
                    {message.title_bg || "Untitled message"}
                  </h3>
                  <p
                    className="messages-table__preview"
                    dangerouslySetInnerHTML={createPlainTextMarkup(
                      message.message_bg || "No Bulgarian message text yet.",
                    )}
                  />
                </section>
              </div>
            </div>

            <div className="messages-table__actions">
              <button
                className="messages-table__visibility-button"
                type="button"
                data-visible={message.isVisible || undefined}
                disabled={message.isVisible || activatingMessageId !== null}
                onClick={() => makeVisible(message.id)}
              >
                {message.isVisible
                  ? "Visible"
                  : activatingMessageId === message.id
                    ? "Making visible…"
                    : "Make visible"}
              </button>
              <ViewMessage message={message} />
              <EditMessage
                single={message}
                associatedFeasts={associatedFeasts}
                messageTags={messageTags}
                onUpdateMessage={onUpdateMessage}
                onAddTag={onAddTag}
              />
              <DeleteMessage
                id={message.id}
                onDeleteMessage={onDeleteMessage}
              />
            </div>
          </div>
        );
      })}
        </div>
      )}
    </section>
  );
}

export default MessagesTable;
