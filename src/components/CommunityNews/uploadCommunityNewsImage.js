import axios from "axios";
import { API_URL } from "../../utilities/api";

export const uploadCommunityNewsImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("caption", "");
  const token = sessionStorage.getItem("authToken");
  const response = await axios.post(`${API_URL}/assets/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  const uploadResponse = response.data?.upload;
  const uploadedImage = Array.isArray(uploadResponse)
    ? uploadResponse[0]
    : uploadResponse;

  if (!uploadedImage?.url) {
    throw new Error("The upload response did not include an image URL.");
  }

  return uploadedImage;
};
