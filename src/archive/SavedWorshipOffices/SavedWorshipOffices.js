import "./SavedWorshipOffices.scss";
import { ThreeDots } from "react-loader-spinner";
import useFetch from "../../utilities/useFetch";
import NoData from "../NoData/NoData";
import SingleWorshipOffice from "../SingleWorshipOffice/SingleWorshipOffice";

function SavedWorshipOffices({ url }) {
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
      <div className="saved-worship-offices">
        {data.map((single, index) => {
          return <SingleWorshipOffice key={index} worshipOffice={single} />;
        })}
      </div>
    );
  }
  
}

export default SavedWorshipOffices;
