import "./SavedWeeklyAnnouncements.scss";
import { ThreeDots } from "react-loader-spinner";
import SingleWeeklyAnnouncement from "../SingleWeeklyAnnounement/SingleWeeklyAnnouncement";
import useFetch from "../../utilities/useFetch";
import NoData from "../NoData/NoData";

function SavedWeeklyAnnouncements({url}) {

  const { data, error, loading } = useFetch(
    url
  );
 
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
    return <NoData/>;
  }
  if (data) {
    return (
      <div className="saved-weekly-announcements">
        {data.map((single, index) => {
          return (
            <div key={index}>
              <SingleWeeklyAnnouncement
                announcement={single}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default SavedWeeklyAnnouncements;
