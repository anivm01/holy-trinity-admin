import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Masonry from "react-responsive-masonry";
import "./ChooseImages.scss";

function ChooseImages({ data, chosenIds, setChosenIds, setVisible }) {
    
  const [selected, setSelected ] = useState([...chosenIds]);
  console.log(selected)

  const chooseImages = (id) => {
    const selection = [...selected]
    if (selection.includes(id)) {
      selection.splice(selection.indexOf(id), 1);
      setSelected(selection);
    } else {
      selection.push(id);
      setSelected(selection);
    }
  };

  const saveSelection = () => {
    setChosenIds(selected);
  };

  if (selected === undefined) {
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

  return (
    <>
      <Masonry columnsCount={4} gutter="1rem">
        {data.map((image) => {
          return (
            <div
              onClick={() => {
                chooseImages(image.id);
              }}
              className="image-upload__choice"
              key={image.id}
            >
              <img
                className={`${
                  selected.includes(image.id)
                    ? "image-upload__single chosen"
                    : "image-upload__single"
                }`}
                src={image.src}
                alt={image.description}
              />
            </div>
          );
        })}
      </Masonry>
      <button
        onClick={() => {
          saveSelection();
          setVisible(false)
        }}
        className="button"
        type="button"
      >
        Save
      </button>
    </>
  );
}

export default ChooseImages;
