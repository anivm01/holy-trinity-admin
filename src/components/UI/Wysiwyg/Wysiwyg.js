import "./Wysiwyg.scss";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DOMPurify from "dompurify";
import { messageMarkupSanitizerConfig } from "../../../utilities/createMarkup";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
  createButton,
} from "react-simple-wysiwyg";

const alignmentIcon = (alignment) => (
  <span
    aria-hidden="true"
    style={{ display: "block", textAlign: alignment, width: "1.15rem" }}
  >
    ≡
  </span>
);

const BtnAlignLeft = createButton(
  "Align left",
  alignmentIcon("left"),
  "justifyLeft",
);
const BtnAlignCenter = createButton(
  "Align center",
  alignmentIcon("center"),
  "justifyCenter",
);
const BtnAlignRight = createButton(
  "Align right",
  alignmentIcon("right"),
  "justifyRight",
);
const BtnBlockquote = createButton(
  "Block quote",
  "❝",
  (editorState) => {
    const isBlockquote = editorState.$selection?.nodeName === "BLOCKQUOTE";
    document.execCommand(
      "formatBlock",
      false,
      isBlockquote ? "DIV" : "BLOCKQUOTE",
    );
  },
);
const BtnHorizontalRule = createButton(
  "Horizontal separator",
  "―",
  "insertHorizontalRule",
);
const BtnTable = createButton("Insert table", "▦", () => {
  const dimensions = window.prompt(
    "Enter table size as columns x rows (for example: 3x2)",
    "3x2",
  );

  if (dimensions === null) {
    return;
  }

  const match = dimensions.match(/^\s*(\d+)\s*[x×]\s*(\d+)\s*$/i);
  const columns = Number(match?.[1]);
  const rows = Number(match?.[2]);

  if (!match || columns < 1 || columns > 10 || rows < 1 || rows > 20) {
    window.alert("Use columns x rows, with up to 10 columns and 20 rows.");
    return;
  }

  const tableRows = Array.from({ length: rows }, () => {
    const cells = Array.from(
      { length: columns },
      () => "<td><br></td>",
    ).join("");

    return `<tr>${cells}</tr>`;
  }).join("");

  document.execCommand(
    "insertHTML",
    false,
    `<table><tbody>${tableRows}</tbody></table><p><br></p>`,
  );
});

const normalizeHeadingMarkup = (html) => {
  const container = document.createElement("div");
  container.innerHTML = html;

  container.querySelectorAll("h1 span[style], h2 span[style]").forEach((span) => {
    span.style.removeProperty("color");
    span.style.removeProperty("font-size");

    if (!span.getAttribute("style")) {
      span.removeAttribute("style");
    }

    if (!span.attributes.length) {
      span.replaceWith(...span.childNodes);
    }
  });

  return container.innerHTML;
};

function FormattingToolbar() {
  return (
    <Toolbar>
      <BtnUndo />
      <BtnRedo />
      <Separator />
      <BtnBold />
      <BtnItalic />
      <BtnUnderline />
      <BtnStrikeThrough />
      <Separator />
      <BtnStyles />
      <BtnBlockquote />
      <Separator />
      <BtnNumberedList />
      <BtnBulletList />
      <Separator />
      <BtnAlignLeft />
      <BtnAlignCenter />
      <BtnAlignRight />
      <Separator />
      <BtnLink />
      <BtnTable />
      <BtnHorizontalRule />
      <BtnClearFormatting />
      <HtmlButton />
    </Toolbar>
  );
}

function EditorSurface({ content, expanded = false, onChange, onPaste }) {
  return (
    <EditorProvider>
      <Editor
        containerProps={{
          className: `rsw-editor wysiwyg__editor-surface${
            expanded ? "" : " wysiwyg__editor-surface--standard"
          }`,
          style: {
            resize: expanded ? "none" : "vertical",
            height: expanded ? "100%" : undefined,
            minHeight: expanded ? 0 : "200px",
            minWidth: 0,
            width: "100%",
            backgroundColor: "white",
            border: "1px solid #6F0B20",
          },
        }}
        value={content}
        onChange={onChange}
        onPaste={onPaste}
      >
        <FormattingToolbar />
      </Editor>
    </EditorProvider>
  );
}

function Wysiwyg({ editorLabel, setContent, content, allowIframes = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dialogTitleId = useId();
  const expandButtonRef = useRef(null);

  function onChange(event) {
    setContent(normalizeHeadingMarkup(event.target.value));
  }

  function onPaste(event) {
    const clipboardHtml = event.clipboardData.getData("text/html");

    if (!clipboardHtml) {
      return;
    }

    event.preventDefault();
    const cleanHtml = DOMPurify.sanitize(clipboardHtml, {
      ...(allowIframes ? messageMarkupSanitizerConfig : {}),
      FORBID_ATTR: ["class", "style", "srcdoc"],
    });
    document.execCommand("insertHTML", false, cleanHtml);
  }

  const closeExpandedEditor = useCallback(() => {
    setIsExpanded(false);
    requestAnimationFrame(() => expandButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeExpandedEditor();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeExpandedEditor, isExpanded]);

  const expandedEditor = isExpanded
    ? createPortal(
        <div
          className="wysiwyg__expanded-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeExpandedEditor();
            }
          }}
        >
          <section
            className="wysiwyg__expanded-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
          >
            <header className="wysiwyg__expanded-header">
              <h2 id={dialogTitleId}>{editorLabel}</h2>
              <button
                className="wysiwyg__expanded-close"
                type="button"
                onClick={closeExpandedEditor}
                autoFocus
              >
                Close
              </button>
            </header>
            <div className="wysiwyg__expanded-editor">
              <EditorSurface
                content={content}
                expanded
                onChange={onChange}
                onPaste={onPaste}
              />
            </div>
          </section>
        </div>,
        document.body,
      )
    : null;

  return (
    <div className="wysiwyg">
      <div className="wysiwyg__header">
        <span className="wysiwyg__label">{editorLabel}</span>
        <button
          className="wysiwyg__expand"
          type="button"
          ref={expandButtonRef}
          onClick={() => setIsExpanded(true)}
          aria-haspopup="dialog"
        >
          Expand editor
        </button>
      </div>
      <EditorSurface
        content={content}
        onChange={onChange}
        onPaste={onPaste}
      />
      {expandedEditor}
    </div>
  );
}

export default Wysiwyg;
