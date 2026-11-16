import { useMemo } from "react";
import { API_URL } from "../../../utilities/api";
import useFetch from "../../../utilities/useFetch";
import NoData from "../../NoData/NoData";
import "./SavedFeasts.scss";
import { ThreeDots } from "react-loader-spinner";
import FeastMonthAccordion from "./FeastMonthAccordion";
import { groupUpcomingFeastsByMonth } from "./feastListData";

function SavedFeasts() {
  const { data, error, loading } = useFetch(`${API_URL}/feasts`);
  const upcomingMonths = useMemo(
    () => groupUpcomingFeastsByMonth(data || []),
    [data],
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
    return <NoData />;
  }
  if (data) {
    return (
      <section className="saved-feasts" aria-labelledby="saved-feasts-title">
        <h2 className="saved-feasts__title" id="saved-feasts-title">
          Upcoming Feasts
        </h2>

        {upcomingMonths.length > 0 ? (
          <div className="saved-feasts__months">
            {upcomingMonths.map((month, index) => (
              <FeastMonthAccordion
                defaultOpen={index === 0}
                key={month.key}
                month={month}
              />
            ))}
          </div>
        ) : (
          <p className="saved-feasts__empty">No upcoming feasts found.</p>
        )}
      </section>
    );
  }
}

export default SavedFeasts;
