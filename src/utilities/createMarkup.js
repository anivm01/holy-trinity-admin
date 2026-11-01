import DOMPurify from "dompurify";

export const createMarkup = (html) => {
    return {
        __html: DOMPurify.sanitize(html)
    }
  }

export const createPlainTextMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    }),
  };
};
