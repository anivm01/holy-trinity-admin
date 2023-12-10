import "./SavedCalendar.scss";
import { ThreeDots } from "react-loader-spinner";
import NoData from "../NoData/NoData";
import useFetch from "../../utilities/useFetch";
import SingleCalendarEntry from "../SingleCalendarEntry/SingleCalendarEntry";

function SavedCalendar({ url }) {
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
          return <SingleCalendarEntry key={index} event={single} />;
        })}
      </div>
    );
  }
}

export default SavedCalendar;
