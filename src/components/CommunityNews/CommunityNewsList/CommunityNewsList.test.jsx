import { fireEvent, render, screen } from "@testing-library/react";
import { communityNewsPosts } from "../../../data/communityNewsPosts";
import CommunityNewsList from "./CommunityNewsList";

describe("CommunityNewsList", () => {
  it("sorts posts newest first", () => {
    render(<CommunityNewsList posts={communityNewsPosts} />);

    expect(screen.getAllByRole("heading", { level: 2 })[1]).toHaveTextContent(
      "Parish council update",
    );
    expect(
      screen.getByAltText(
        "A joyful Sunday with our parish community — image 1 of 3",
      ),
    ).toBeInTheDocument();
  });

  it("filters posts by status and search text", () => {
    render(<CommunityNewsList posts={communityNewsPosts} />);

    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "draft" },
    });

    expect(
      screen.getByRole("heading", { name: "December volunteer schedule" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Parish council update" }),
    ).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "all" },
    });
    fireEvent.change(screen.getByLabelText("Search posts"), {
      target: { value: "joyful Sunday" },
    });

    expect(
      screen.getByRole("heading", {
        name: "A joyful Sunday with our parish community",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Showing 1 of 4 posts")).toBeInTheDocument();
  });
});
