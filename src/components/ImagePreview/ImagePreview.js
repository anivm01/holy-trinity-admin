import { API_URL } from "../../utilities/api";
import "./ImagePreview.scss";
import { ThreeDots } from "react-loader-spinner";
import useFetch from "../../utilities/useFetch";

function ImagePreview( { imageId } ) {
  const {data, loading, error} = useFetch(`${API_URL}/images/en/${imageId}`)

  if (loading) {
    return <ThreeDots
    height="80" 
    width="80" 
    radius="9"
    color="#6F0B20" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{justifyContent: "center"}}
    wrapperClassName=""
    visible={true}
     />;
  }
  if (error) {
    return <p>NO Data</p>
  }
    if(data) {
      return (
        <img
          className="image-preview"
          src={data.src}
          alt={data.description}
        />
    );
    }
return <p>NO Data</p>
  
}

export default ImagePreview;
