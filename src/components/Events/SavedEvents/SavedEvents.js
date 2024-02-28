import useFetch from "../../../utilities/useFetch";
import NoData from "../../NoData/NoData";
import SingleEvent from "../SingleEvent/SingleEvent";
import "./SavedEvents.scss";
import { ThreeDots } from "react-loader-spinner";


function SavedEvents({ url }) {
  const { data, error, loading } = useFetch(url);
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
      <div className="saved-events">
        {data.map((single, index) => {
          return <SingleEvent key={index} event={single} />;
        })}
      </div>
    );
  }
}

export default SavedEvents;
