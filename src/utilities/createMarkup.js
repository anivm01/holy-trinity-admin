import DOMPurify from "dompurify";

export const messageMarkupSanitizerConfig = {
  ADD_TAGS: ["iframe"],
  ADD_ATTR: [
    "allow",
    "allowfullscreen",
    "frameborder",
    "loading",
    "referrerpolicy",
    "sandbox",
    "title",
  ],
  FORBID_ATTR: ["srcdoc"],
};

export const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

export const createMessageMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html, messageMarkupSanitizerConfig),
  };
};

export const createPlainTextMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }),
  };
};
