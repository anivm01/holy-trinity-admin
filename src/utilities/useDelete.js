import axios from "axios";
import { useNavigate } from "react-router-dom";

function useDelete( url ) {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("authToken");
  
    const deleteItem = async () => {
      try {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    };
    return {deleteItem}
}

export default useDelete

