import { API_URL } from "../../../utilities/api";
import useFetch from "../../../utilities/useFetch";
import NoData from "../../NoData/NoData";
import SingleFeast from "../SingleFeast/SingleFeast";
import "./SavedFeasts.scss";
import { ThreeDots } from "react-loader-spinner";

function SavedFeasts() {
  const { data, error, loading } = useFetch(`${API_URL}/feasts`);
  if (loading) {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#6F0B20"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClassName=""
        visible={true}
      />
    );
  }
  if (error) {
    return <NoData />;
  }
  if (data) {
    return (
      <div className="saved-feasts">
        {data.map((single, index) => {
          return <SingleFeast key={index} item={single} />;
        })}
      </div>
    );
  }
}

export default SavedFeasts;
