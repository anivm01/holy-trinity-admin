import { fireEvent, render, screen } from "@testing-library/react";
import useFetch from "../../../utilities/useFetch";
import CommunityNewsImageLibraryPicker from "./CommunityNewsImageLibraryPicker";

jest.mock("../../../utilities/useFetch", () => jest.fn());

const savedImages = [
  {
    id: 1,
    url: "https://uploads.example.com/first.jpg",
    caption: "First saved image",
    fileName: "first.jpg",
  },
  {
    id: 2,
    url: "https://uploads.example.com/second.jpg",
    caption: "",
    fileName: "second.jpg",
  },
];

describe("CommunityNewsImageLibraryPicker", () => {
  it("loads saved images and toggles a selection", () => {
    const onToggle = jest.fn();
    useFetch.mockReturnValue({
      data: { data: savedImages },
      error: null,
      loading: false,
    });

    render(
      <CommunityNewsImageLibraryPicker
        selectedUrls={[savedImages[0].url]}
        onToggle={onToggle}
      />,
    );

    expect(
      screen.getByRole("button", { name: /First saved image Selected/i }),
    ).toHaveAttribute("aria-pressed", "true");
    const secondImage = screen.getByRole("button", {
      name: /second.jpg Select/i,
    });
    expect(secondImage).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(secondImage);
    expect(onToggle).toHaveBeenCalledWith(savedImages[1]);
  });

  it("shows a loading error", () => {
    useFetch.mockReturnValue({
      data: null,
      error: new Error("No connection"),
      loading: false,
    });

    render(
      <CommunityNewsImageLibraryPicker selectedUrls={[]} onToggle={jest.fn()} />,
    );

    expect(
      screen.getByText("The saved image gallery could not be loaded."),
    ).toHaveAttribute("role", "alert");
  });
});
