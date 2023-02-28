import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, worshipOfficeSlug } from "../../utilities/api";
import { dateShorthandConverter } from "../../utilities/dateConverter";
import { sortNewestToOldest } from "../../utilities/sort";
import ImagePreview from "../ImagePreview/ImagePreview";
import "./SavedWorshipOffices.scss";
import deleteIcon from "../../assets/delete.svg";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "../DeleteModal/DeleteModal";

function SavedWorshipOffices() {
  const [worshipOffices, setWorshipOffices] = useState([]);

  const navigate = useNavigate();

  //delete associated states
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const getWorshipOffices = async () => {
    try {
      const response = await axios.get(`${API_URL}${worshipOfficeSlug}/en`);
      console.log(response.data);
      setWorshipOffices(sortNewestToOldest(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}${worshipOfficeSlug}/en/${id}`);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorshipOffices();
  }, []);

  if (worshipOffices.length === 0) {
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
    <div className="saved-worship-office">
      {deleteVisible && (
        <DeleteModal
          imageId={deleteId}
          setVisible={setDeleteVisible}
          deleteFunction={deleteItem}
        />
      )}
      {worshipOffices.map((single, index) => {
        return (
          <div className="saved-worship-office__single" key={index}>
            <Link to={`${single.id}`} className="saved-worship-office__link">
              <ImagePreview imageId={single.thumbnail_id} />
            </Link>
            <span className="saved-worship-office__date">
              {dateShorthandConverter(single.date)}
            </span>
            <button
              className="saved-worship-office__delete"
              onClick={() => {
                setDeleteId(single.id);
                setDeleteVisible(true);
              }}
              type="button"
            >
              <img
                className="saved-worship-office__icon"
                src={deleteIcon}
                alt="delete"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SavedWorshipOffices;
