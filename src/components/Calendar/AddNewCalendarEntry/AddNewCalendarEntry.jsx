import { useState } from "react";
import "./AddNewCalendarEntry.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import CalendarEntryForm from "../CalendarEntryForm/CalendarEntryForm";
import { getDefaultDateTime } from "../../../utilities/dateConverter";

function AddNewCalendarEntry() {
  //regular inputs controlled and stored into one object
  const [entry, setEntry] = useState({
    title: "", 
    title_bg: "",
    date: getDefaultDateTime(0, 0),
    cross: false,
    bold: false,
    red: false,
    star: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setEntry((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setEntry((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  //success and error message states
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //function to handle uploading the new entry
  const onPublish = (e) => {
    e.preventDefault();

    //validate the date before publishing
    if (!entry.date) {
      setUploadError(true);
      setErrorMessage("Make sure to add a date for this entry");
      return;
    }

    const uploadEntry = async (post) => {
      const token = sessionStorage.getItem("authToken");
      try {
        await axios.post(`${API_URL}/calendar`, post, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUploadSuccess(true);
      } catch (err) {
        console.log(err.response);
        setUploadError(true);
        setErrorMessage(
          "There was a problem with the connection. Try again later."
        );
      }
    };
    uploadEntry(entry);
  };

  return (
    <div className="add-new-calendar-entry">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <CalendarEntryForm
        formType={"add"}
        formTitle={"Add New Entry"}
        entry={entry}
        handleChange={handleChange}
        onPublish={onPublish}
      />
    </div>
  );
}

export default AddNewCalendarEntry;
