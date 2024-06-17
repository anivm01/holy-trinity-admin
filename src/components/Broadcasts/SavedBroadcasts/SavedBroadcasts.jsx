import "./SavedBroadcasts.scss";
import { ThreeDots } from "react-loader-spinner";
import useFetch from "../../../utilities/useFetch";
import NoData from "../../NoData/NoData";
import { API_URL } from "../../../utilities/api";
import SingleBroadcast from "../SingleBroadcast/SingleBroadcast";

function SavedBroadcasts() {
  const { data, error, loading } = useFetch(`${API_URL}/broadcasts`);
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
      <div className="saved-broadcasts">
        {data.map((single) => {
          return (
            <SingleBroadcast key={single.id} single={single} />
          )
        })}
      </div>
    );
  }

}

export default SavedBroadcasts;
