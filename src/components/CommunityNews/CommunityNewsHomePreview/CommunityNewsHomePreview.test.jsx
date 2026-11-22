import { fireEvent, render, screen } from "@testing-library/react";
import CommunityNewsHomePreview from "./CommunityNewsHomePreview";

const post = {
  title_en: "Wedding celebration for Elena and Nikolai",
  title_bg: "Сватбено тържество за Елена и Николай",
  body_en:
    `<p>Our parish celebrated a joyful wedding with family and friends.</p>
     <p>${"A long celebration story. ".repeat(12)}The complete ending remains visible.</p>
     <script>unsafe()</script>`,
  body_bg:
    "<p>Нашата енория отпразнува радостна сватба със семейството и приятелите.</p>",
  author: "Church Office",
  publish_date: "2026-11-21T10:30:00",
  status: "draft",
  images: [
    {
      url: "blob:first-image",
      comment_en: "The newly married couple.",
      comment_bg: "Младоженците.",
    },
    {
      url: "blob:second-image",
      comment_en: "",
      comment_bg: "Семейството и приятелите се присъединиха към празника.",
    },
  ],
};

describe("CommunityNewsHomePreview", () => {
  it("previews the complete English post with all images", () => {
    render(<CommunityNewsHomePreview post={post} />);

    expect(
      screen.getByRole("heading", {
        name: "Wedding celebration for Elena and Nikolai",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Community News")).not.toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Wedding celebration for Elena and Nikolai — image 1 of 2",
      ),
    ).toHaveAttribute("src", "blob:first-image");
    expect(
      screen.getByAltText(
        "Wedding celebration for Elena and Nikolai — image 2 of 2",
      ),
    ).toHaveAttribute("src", "blob:second-image");
    expect(
      screen.getByText(
        "Our parish celebrated a joyful wedding with family and friends.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The complete ending remains visible\./),
    ).toBeInTheDocument();
    expect(screen.getByText("The newly married couple.")).toBeInTheDocument();
    const captions = document.querySelectorAll(
      ".community-home-preview__figure figcaption",
    );
    expect(captions).toHaveLength(2);
    expect(captions[1]).toBeEmptyDOMElement();
    expect(captions[1]).toHaveAttribute("aria-hidden", "true");
    const author = screen.getByText("Church Office");
    const imageBox = screen.getByLabelText("Post images");
    const postText = screen.getByText(
      "Our parish celebrated a joyful wedding with family and friends.",
    );
    expect(
      author.compareDocumentPosition(imageBox) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      imageBox.compareDocumentPosition(postText) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.queryByText("unsafe()")).not.toBeInTheDocument();
    expect(screen.queryByText("Read full post")).not.toBeInTheDocument();
  });

  it("switches the preview to Bulgarian", () => {
    render(<CommunityNewsHomePreview post={post} />);

    fireEvent.click(screen.getByRole("button", { name: "Български" }));

    expect(
      screen.getByRole("heading", {
        name: "Сватбено тържество за Елена и Николай",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Сватбено тържество за Елена и Николай — снимка 1 от 2",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Семейството и приятелите се присъединиха към празника."),
    ).toBeInTheDocument();
  });

  it("shows an empty state before content is entered", () => {
    render(
      <CommunityNewsHomePreview
        post={{
          title_en: "",
          title_bg: "",
          body_en: "",
          body_bg: "",
          publish_date: "",
          images: [],
        }}
      />,
    );

    expect(
      screen.getByText("Add a title, text, or image to begin the live preview."),
    ).toBeInTheDocument();
  });
});
