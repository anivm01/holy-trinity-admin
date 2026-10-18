import React from "react";
import { ThreeDots } from "react-loader-spinner";
import Masonry from "react-responsive-masonry";
import { API_URL } from "../../utilities/api";
import useFetch from "../../utilities/useFetch";
import NoData from "../NoData/NoData";

function ChooseImage({ chooseImage, chosenId }) {
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
      <Masonry columnsCount={4} gutter="1rem">
        {data.map((image) => {
          return (
            <div
              onClick={() => {
                chooseImage(image.id);
              }}
              className="image-upload__choice"
              key={image.id}
            >
              <img
                className={
                  image.id === chosenId
                    ? "image-upload__single chosen"
                    : "image-upload__single"
                }
                src={image.src}
                alt={image.description}
              />
            </div>
          );
        })}
      </Masonry>
    );
  }
  return <NoData />;
}

export default ChooseImage;
