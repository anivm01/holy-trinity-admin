import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from "../../utilities/api";
import useFetch from "../../utilities/useFetch";
import ChooseImages from "../ChooseImages/ChooseImages";
import NoData from "../NoData/NoData";

function LoadImages({ chosenIds, setChosenIds, setVisible }) {
  const { data, loading, error } = useFetch(`${API_URL}/images/en`);

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
      <ChooseImages
        data={data}
        chosenIds={chosenIds}
        setChosenIds={setChosenIds}
        setVisible={setVisible}
      />
    );
  }
  return <NoData />;
}

export default LoadImages;
