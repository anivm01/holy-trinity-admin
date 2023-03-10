import axios from "axios";
export const uploadItem = async (posts, url) => {
    try {
      const enResponse = await axios.post(
        `${url}/en`,
        posts.en
      );
      const bgPostUpdated = { ...posts.bg, en_id: enResponse.data.new_entry.id };
      await axios.post(`${url}/bg`, bgPostUpdated);
      return true
    } catch (err) {
      console.log(err.response);
      return false
    }
  };

  export const updateItem = async (posts, url, id) => {
    try {
        await axios.put(
          `${url}/en/${id}`,
          posts.en
        );
        await axios.put(
          `${url}/bg/${id}`,
          posts.bg
        );
        return true
      } catch (err) {
        console.log(err.response);
        return false
      }
  };