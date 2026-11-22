import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { uploadCommunityNewsImage } from "../uploadCommunityNewsImage";
import CommunityNewsPostForm from "./CommunityNewsPostForm";

jest.mock("../uploadCommunityNewsImage", () => ({
  uploadCommunityNewsImage: jest.fn(),
}));

jest.mock(
  "../CommunityNewsImageLibraryPicker/CommunityNewsImageLibraryPicker",
  () =>
    function MockCommunityNewsImageLibraryPicker({ onToggle }) {
      return (
        <button
          type="button"
          onClick={() =>
            onToggle({
              id: 41,
              url: "https://uploads.example.com/saved.jpg",
              fileName: "saved.jpg",
            })
          }
        >
          Select saved test image
        </button>
      );
    },
);

jest.mock(
  "../CommunityNewsHomePreview/CommunityNewsHomePreview",
  () => function MockCommunityNewsHomePreview() {
    return <div data-testid="community-home-preview" />;
  },
);

const fillRequiredTitles = () => {
  fireEvent.change(screen.getByLabelText("Title in English *"), {
    target: { value: "Wedding announcement" },
  });
  fireEvent.change(screen.getByLabelText("Заглавие на български *"), {
    target: { value: "Сватбено тържество" },
  });
};

describe("CommunityNewsPostForm", () => {
  beforeEach(() => {
    uploadCommunityNewsImage.mockReset();
    uploadCommunityNewsImage.mockImplementation((file) =>
      Promise.resolve({
        id: file.name === "first.jpg" ? 501 : 502,
        url: `https://uploads.example.com/${file.name}`,
      }),
    );
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: jest
        .fn()
        .mockReturnValueOnce("blob:first-image")
        .mockReturnValueOnce("blob:second-image"),
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: jest.fn(),
    });
  });

  it("requires both titles", () => {
    const onSave = jest.fn();
    render(<CommunityNewsPostForm onSave={onSave} />);

    fireEvent.click(screen.getByRole("button", { name: "Add post" }));

    expect(screen.getByText("Add the English title.")).toBeInTheDocument();
    expect(screen.getByText("Add the Bulgarian title.")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("allows a title-only post", async () => {
    const onSave = jest.fn();
    render(<CommunityNewsPostForm onSave={onSave} />);
    fillRequiredTitles();

    fireEvent.click(screen.getByRole("button", { name: "Add post" }));

    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          title_en: "Wedding announcement",
          title_bg: "Сватбено тържество",
          body_en: "",
          body_bg: "",
          images: [],
        }),
      ),
    );
  });

  it("keeps selected files local until the post is saved", () => {
    render(<CommunityNewsPostForm onSave={jest.fn()} />);
    expect(screen.getByLabelText("Add new images")).toHaveAttribute("multiple");
    const firstImage = new File(["first"], "first.jpg", {
      type: "image/jpeg",
    });
    const secondImage = new File(["second"], "second.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(screen.getByLabelText("Add new images"), {
      target: { files: [firstImage, secondImage] },
    });

    expect(uploadCommunityNewsImage).not.toHaveBeenCalled();
    expect(screen.getByAltText("image 1 of 2")).toHaveAttribute(
      "src",
      "blob:first-image",
    );
    expect(screen.getByAltText("image 2 of 2")).toHaveAttribute(
      "src",
      "blob:second-image",
    );
    expect(
      screen.getAllByText("Ready to upload when the post is saved"),
    ).toHaveLength(2);

    fireEvent.change(screen.getByLabelText("Title in English *"), {
      target: { value: "Wedding announcement" },
    });
    fireEvent.change(
      screen.getAllByLabelText("English image comment (optional)")[0],
      { target: { value: "First image comment" } },
    );
    fireEvent.click(
      screen.getAllByRole("button", { name: "Move earlier" })[1],
    );
    expect(screen.getAllByRole("img")[0]).toHaveAttribute(
      "src",
      "blob:second-image",
    );

    fireEvent.click(
      screen.getAllByRole("button", { name: "Remove image" })[0],
    );
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAttribute("src", "blob:first-image");
  });

  it("uploads pending files when the whole post is saved", async () => {
    const onSave = jest.fn();
    render(<CommunityNewsPostForm onSave={onSave} />);
    fillRequiredTitles();
    const firstImage = new File(["first"], "first.jpg", {
      type: "image/jpeg",
    });
    const secondImage = new File(["second"], "second.jpg", {
      type: "image/jpeg",
    });
    fireEvent.change(screen.getByLabelText("Add new images"), {
      target: { files: [firstImage, secondImage] },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add post" }));

    expect(uploadCommunityNewsImage).toHaveBeenNthCalledWith(1, firstImage);
    expect(uploadCommunityNewsImage).toHaveBeenNthCalledWith(2, secondImage);
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        images: [
          {
            url: "https://uploads.example.com/first.jpg",
            comment_en: "",
            comment_bg: "",
          },
          {
            url: "https://uploads.example.com/second.jpg",
            comment_en: "",
            comment_bg: "",
          },
        ],
      }),
    );
  });

  it("retries only failed local files on the next save", async () => {
    const onSave = jest.fn();
    uploadCommunityNewsImage.mockRejectedValueOnce({
      response: { data: { message: "Upload refused" } },
    });
    render(<CommunityNewsPostForm onSave={onSave} />);
    fillRequiredTitles();
    const image = new File(["first"], "first.jpg", { type: "image/jpeg" });
    fireEvent.change(screen.getByLabelText("Add new images"), {
      target: { files: [image] },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add post" }));
    expect(
      await screen.findByText(
        "Upload failed: Upload refused. Save again to retry.",
      ),
    ).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Add post" }));
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(uploadCommunityNewsImage).toHaveBeenCalledTimes(2);
  });

  it("adds saved gallery images without uploading them again", async () => {
    const onSave = jest.fn();
    render(<CommunityNewsPostForm onSave={onSave} />);
    fillRequiredTitles();

    fireEvent.click(
      screen.getByRole("button", { name: "Choose saved images" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Select saved test image" }),
    );
    expect(screen.getByAltText("Wedding announcement")).toHaveAttribute(
      "src",
      "https://uploads.example.com/saved.jpg",
    );

    fireEvent.click(screen.getByRole("button", { name: "Add post" }));
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(uploadCommunityNewsImage).not.toHaveBeenCalled();
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        images: [
          {
            url: "https://uploads.example.com/saved.jpg",
            comment_en: "",
            comment_bg: "",
          },
        ],
      }),
    );
  });
});
