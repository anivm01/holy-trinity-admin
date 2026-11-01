import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AddNewMessage from "../../components/Messages/AddNewMessage/AddNewMessage";
import MessagesTable from "../../components/Messages/MessagesTable/MessagesTable";
import { API_URL } from "../../utilities/api";

import "./MessagesPage.scss";

const getTagLanguage = (label) =>
  /\p{Script=Cyrillic}/u.test(label) ? "bg" : "en";

const getFeastId = (nameEn, nameBg) =>
  JSON.stringify([nameEn || "", nameBg || ""]);

const normalizeMessage = (message) => {
  const feastNameEn = message.associated_feast_name_en || "";
  const feastNameBg = message.associated_feast_name_bg || "";

  return {
    ...message,
    associated_feast_id:
      feastNameEn || feastNameBg ? getFeastId(feastNameEn, feastNameBg) : "",
    tags: Array.isArray(message.tags) ? message.tags : [],
    isVisible: Boolean(message.is_visible),
  };
};

const createMessagePayload = (message) => ({
  title_en: message.title_en,
  title_bg: message.title_bg,
  message_en: message.message_en,
  message_bg: message.message_bg,
  associated_feast_name_en: message.associated_feast_name_en,
  associated_feast_name_bg: message.associated_feast_name_bg,
  tags: message.tags,
  is_visible: Boolean(message.isVisible),
});

const getAuthorizationConfig = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  },
});

const getRequestErrorMessage = (error, fallbackMessage) =>
  error.response?.data?.message || error.message || fallbackMessage;

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [draftTags, setDraftTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    const loadMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/messages`);

        if (isCurrent) {
          setMessages(response.data.map(normalizeMessage));
          setLoadError("");
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            getRequestErrorMessage(error, "Unable to load the messages."),
          );
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    loadMessages();

    return () => {
      isCurrent = false;
    };
  }, []);

  const associatedFeasts = useMemo(() => {
    const feasts = new Map();

    messages.forEach((message) => {
      const nameEn = message.associated_feast_name_en || "";
      const nameBg = message.associated_feast_name_bg || "";

      if (!nameEn && !nameBg) {
        return;
      }

      const id = getFeastId(nameEn, nameBg);
      feasts.set(id, { id, name_en: nameEn, name_bg: nameBg });
    });

    return [...feasts.values()];
  }, [messages]);

  const messageTags = useMemo(() => {
    const tags = new Map();

    [...messages.flatMap((message) => message.tags), ...draftTags].forEach(
      (label) => {
        const normalizedLabel = label.trim();

        if (normalizedLabel) {
          tags.set(normalizedLabel.toLocaleLowerCase(), {
            id: normalizedLabel,
            label: normalizedLabel,
            language: getTagLanguage(normalizedLabel),
          });
        }
      },
    );

    return [...tags.values()];
  }, [draftTags, messages]);

  const addMessage = async (message) => {
    try {
      const response = await axios.post(
        `${API_URL}/messages`,
        createMessagePayload(message),
        getAuthorizationConfig(),
      );
      const createdMessage = normalizeMessage(response.data.new_entry);

      setMessages((currentMessages) => [
        createdMessage,
        ...currentMessages.map((currentMessage) =>
          createdMessage.isVisible
            ? { ...currentMessage, isVisible: false, is_visible: false }
            : currentMessage,
        ),
      ]);

      return createdMessage;
    } catch (error) {
      throw new Error(
        getRequestErrorMessage(error, "Unable to create the message."),
      );
    }
  };

  const updateMessage = async (id, updatedMessage) => {
    try {
      const response = await axios.put(
        `${API_URL}/messages/${id}`,
        createMessagePayload(updatedMessage),
        getAuthorizationConfig(),
      );
      const savedMessage = normalizeMessage(response.data.updated_entry);

      setMessages((currentMessages) =>
        currentMessages.map((message) => {
          if (message.id === id) {
            return savedMessage;
          }

          return savedMessage.isVisible
            ? { ...message, isVisible: false, is_visible: false }
            : message;
        }),
      );

      return savedMessage;
    } catch (error) {
      throw new Error(
        getRequestErrorMessage(error, "Unable to update the message."),
      );
    }
  };

  const makeMessageVisible = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/messages/${id}/activate`,
        {},
        getAuthorizationConfig(),
      );
      const visibleMessage = normalizeMessage(response.data.updated_entry);

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? visibleMessage
            : { ...message, isVisible: false, is_visible: false },
        ),
      );

      return visibleMessage;
    } catch (error) {
      throw new Error(
        getRequestErrorMessage(error, "Unable to make the message visible."),
      );
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/messages/${id}`,
        getAuthorizationConfig(),
      );
      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== id),
      );
    } catch (error) {
      throw new Error(
        getRequestErrorMessage(error, "Unable to delete the message."),
      );
    }
  };

  const addMessageTag = (label, language) => {
    const normalizedLabel = label.trim();

    if (!normalizedLabel) {
      return null;
    }

    const existingTag = messageTags.find(
      (tag) =>
        tag.language === language &&
        tag.label.toLocaleLowerCase() === normalizedLabel.toLocaleLowerCase(),
    );

    if (existingTag) {
      return existingTag;
    }

    const newTag = {
      id: normalizedLabel,
      label: normalizedLabel,
      language,
    };

    setDraftTags((currentTags) => [...currentTags, normalizedLabel]);
    return newTag;
  };

  return (
    <main className="messages-page">
      <div className="messages-page__header">
        <h1>Home Page Messages</h1>
      </div>

      {loading && <p role="status">Loading messages…</p>}
      {loadError && <p role="alert">{loadError}</p>}

      {!loading && !loadError && (
        <>
          <AddNewMessage
            associatedFeasts={associatedFeasts}
            messageTags={messageTags}
            onAddMessage={addMessage}
            onAddTag={addMessageTag}
          />

          <MessagesTable
            messages={messages}
            associatedFeasts={associatedFeasts}
            messageTags={messageTags}
            onUpdateMessage={updateMessage}
            onMakeMessageVisible={makeMessageVisible}
            onDeleteMessage={deleteMessage}
            onAddTag={addMessageTag}
          />
        </>
      )}
    </main>
  );
}

export default MessagesPage;
