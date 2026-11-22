import axios from "axios";
import { uploadCommunityNewsImage } from "./uploadCommunityNewsImage";

jest.mock("axios", () => ({
  post: jest.fn(),
}));

describe("uploadCommunityNewsImage", () => {
  beforeEach(() => {
    sessionStorage.setItem("authToken", "admin-token");
    axios.post.mockReset();
  });

  it("uploads one file through the existing authenticated asset endpoint", async () => {
    const file = new File(["image"], "wedding.jpg", { type: "image/jpeg" });
    axios.post.mockResolvedValue({
      data: {
        upload: [
          {
            id: 81,
            url: "https://uploads.example.com/wedding.jpg",
          },
        ],
      },
    });

    await expect(uploadCommunityNewsImage(file)).resolves.toEqual({
      id: 81,
      url: "https://uploads.example.com/wedding.jpg",
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    const [url, formData, config] = axios.post.mock.calls[0];
    expect(url).toMatch(/\/assets\/upload$/);
    expect(formData.get("file")).toBe(file);
    expect(formData.get("caption")).toBe("");
    expect(config.headers.Authorization).toBe("Bearer admin-token");
  });

  it("rejects a response that does not contain an uploaded image URL", async () => {
    axios.post.mockResolvedValue({ data: { upload: [] } });

    await expect(
      uploadCommunityNewsImage(
        new File(["image"], "wedding.jpg", { type: "image/jpeg" }),
      ),
    ).rejects.toThrow("The upload response did not include an image URL.");
  });
});
