import axios from "axios";
import { useNavigate } from "react-router-dom";

function useDelete( url ) {
    const navigate = useNavigate();
  
    const deleteItem = async () => {
      try {
        await axios.delete(url);
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    };
    return {deleteItem}
}

export default useDelete

