import "./CalendarPreview.scss";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import { API_URL } from "../../utilities/api";
import useFetch from "../../utilities/useFetch";
import { ThreeDots } from "react-loader-spinner";
import CalendarDisplay from "../../components/Calendar/CalendarDisplay/CalendarDisplay";

function CalendarPreview() {
  const { data, error, loading } = useFetch(`${API_URL}/calendar/byyear`);

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
    return (
      <h2>
        The Bulgarian Orthodox Calendar for this year has not been updated yet.
        As soon as it is released by the Bulgarian Patriarshia, it will be
        updated here
      </h2>
    );
  }
  if (data) {
    return (
      <section>
        <PageHeader title="Calendar Preview"></PageHeader>
        <CalendarDisplay data={data} />
      </section>
    );
  }
}

export default CalendarPreview;
