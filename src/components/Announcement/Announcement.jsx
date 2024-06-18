import React from "react";
import { API_URL } from "../../utilities/api";
import useFetch from "../../utilities/useFetch";
import NoData from "../NoData/NoData";
import { ThreeDots } from "react-loader-spinner";
import { AnnouncementContent } from "./AnnouncementContent";

export const Announcement = () => {
  const { data, error, loading } = useFetch(`${API_URL}/announcement/1`);

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
      <div>
        <AnnouncementContent data={data} />
      </div>
    );
  }
};
