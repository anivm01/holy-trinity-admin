import { createMarkup, createMessageMarkup } from "./createMarkup";

const getSanitizedIframe = (markup) => {
  const container = document.createElement("div");
  container.innerHTML = markup.__html;
  return container.querySelector("iframe");
};

test("iframes are enabled only for message markup", () => {
  const html = '<iframe src="https://www.youtube.com/embed/example"></iframe>';

  expect(getSanitizedIframe(createMarkup(html))).toBeNull();
  expect(getSanitizedIframe(createMessageMarkup(html))).not.toBeNull();
});

test("unsafe iframe content is removed from message markup", () => {
  const iframe = getSanitizedIframe(
    createMessageMarkup(
      '<iframe src="javascript:alert(1)" srcdoc="<script>alert(1)</script>" onload="alert(1)"></iframe>',
    ),
  );

  expect(iframe).not.toBeNull();
  expect(iframe.hasAttribute("src")).toBe(false);
  expect(iframe.hasAttribute("srcdoc")).toBe(false);
  expect(iframe.hasAttribute("onload")).toBe(false);
});
