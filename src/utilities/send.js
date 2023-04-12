import axios from "axios";
const token = sessionStorage.getItem("authToken");
export const uploadItem = async (posts, url) => {
  try {
    const enResponse = await axios.post(`${url}/en`, posts.en, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const bgPostUpdated = { ...posts.bg, en_id: enResponse.data.new_entry.id };
    await axios.post(`${url}/bg`, bgPostUpdated, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    console.log(err.response);
    return false;
  }
};

export const updateItem = async (posts, url, id) => {
  console.log(posts);
  try {
    await axios.put(`${url}/en/${id}`, posts.en, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await axios.put(`${url}/bg/${id}`, posts.bg, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    console.log(err.response);
    return false;
  }
};
