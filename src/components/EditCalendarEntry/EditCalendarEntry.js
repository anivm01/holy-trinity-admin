import { useState } from "react";
import "./EditCalendarEntry .scss";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";
import DateInputUpdated from "../DateInputUpdated/DateInputUpdated";
import OneLineInputUpdated from "../OneLineInputUpdated/OneLineInputUpdated";
import axios from "axios";
import { API_URL } from "../../utilities/api";
import { dateInputConverter } from "../../utilities/dateConverter";

function EditCalendarEntry({ data }) {

    //regular inputs controlled and stored into one object
    const [entry, setEntry] = useState({
        date: "",
        title: "",
        title_bg: "",
        gospel_reference: "",
        gospel_reference_bg: "",
        epistle_reference: "",
        epistle_reference_bg: "",
        old_testament_reference: "",
        old_testament_reference_bg: "",
    });

    //control change of regular inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEntry((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //rich text inputs controlled individually
    const [details, setDetails] = useState("");
    const [detailsBg, setDetailsBg] = useState("");
    const [gospel, setGospel] = useState("");
    const [gospelBg, setGospelBg] = useState("");
    const [epistle, setEpistle] = useState("");
    const [epistleBg, setEpistleBg] = useState("");
    const [oldTestament, setOldTestament] = useState("")
    const [oldTestamentBg, setOldTestamentBg] = useState("")


    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //function to put together the different inputs into one object
    const createPost = () => {
        const newEntry = {
            date: dateInputConverter(entry.date),
            title: entry.title,
            title_bg: entry.title_bg,
            details: details,
            details_bg: detailsBg,
            gospel_reference: entry.gospel_reference,
            gospel_reference_bg: entry.gospel_reference_bg,
            gospel: gospel,
            gospel_bg: gospelBg,
            epistle_reference: entry.epistle_reference,
            epistle_reference_bg: entry.epistle_reference_bg,
            epistle: epistle,
            epistle_bg: epistleBg,
            old_testament_reference: entry.old_testament_reference,
            old_testament_reference_bg: entry.old_testament_reference_bg,
            old_testament: oldTestament,
            old_testament_bg: oldTestamentBg,
        };
        return newEntry;
    };

    //function to handle uploading the new entry
    const onPublish = (e) => {
        e.preventDefault();

        //validate the date before publishing
        if (!entry.date) {
            setUploadError(true);
            setErrorMessage(
                "Make sure to add a date for this entry"
            );
            return;
        }

        //publish
        const post = createPost();
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
        uploadEntry(post);
    };

    return (
        <>
            {uploadError && (
                <ErrorModal
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    setUploadError={setUploadError}
                />
            )}
            {uploadSuccess && <SuccessModal />}
            <form className="entry">
                <h1 className="entry__heading">Add a New Calendar Entry</h1>
                <DateInputUpdated label="Input the date of the entry" date={entry.date} setDate={handleChange} />
                <section className="entry__section">
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Enter the title in English"
                            name="title"
                            oneLine={entry.title}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Enter the details in English"
                            setContent={setDetails}
                            content={details}
                        />
                    </div>
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Заглавие (Enter the title in Bulgarian)"
                            name="title_bg"
                            oneLine={entry.title_bg}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Детайли (Enter the details in Bulgarian)"
                            setContent={setDetailsBg}
                            content={detailsBg}
                        />
                    </div>
                </section>
                <section className="entry__section">
                    <h3 className="entry__title">Gospel</h3>
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Reference"
                            name="gospel_reference"
                            oneLine={entry.gospel_reference}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Enter the text"
                            setContent={setGospel}
                            content={gospel}
                        />
                    </div>
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Справка"
                            name="gospel_reference_bg"
                            oneLine={entry.gospel_reference_bg}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Въведете текста"
                            setContent={setGospelBg}
                            content={gospelBg}
                        />
                    </div>
                </section>
                <section className="entry__section">
                    <h3 className="entry__title">Epistle</h3>
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Reference"
                            name="epistle_reference"
                            oneLine={entry.epistle_reference}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Enter the text"
                            setContent={setEpistle}
                            content={epistle}
                        />
                    </div>
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Справка"
                            name="epistle_reference_bg"
                            oneLine={entry.epistle_reference_bg}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Въведете текста"
                            setContent={setEpistleBg}
                            content={epistleBg}
                        />
                    </div>
                </section>
                <section className="entry__section">
                    <h3 className="entry__title">Old Testament</h3>
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Reference"
                            name="old_testament_reference"
                            oneLine={entry.old_testament_reference}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Enter the text"
                            setContent={setOldTestament}
                            content={oldTestament}
                        />
                    </div>
                    <div className="entry__column">
                        <OneLineInputUpdated
                            label="Справка"
                            name="old_testament_reference_bg"
                            oneLine={entry.old_testament_reference_bg}
                            setOneLine={handleChange}
                        />
                        <WysiwygEdit
                            editorLabel="Въведете текста"
                            setContent={setOldTestamentBg}
                            content={oldTestamentBg}
                        />
                    </div>
                </section>
                <div className="entry__end">
                    <input
                        className="entry__submit"
                        type="submit"
                        value="Publish"
                        onClick={onPublish}
                    />
                </div>
            </form>
        </>
    );
}

export default EditCalendarEntry;
