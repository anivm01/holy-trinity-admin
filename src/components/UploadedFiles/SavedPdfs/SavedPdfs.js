import "./SavedPdfs.scss";
import { ThreeDots } from "react-loader-spinner";
import NoData from "../../NoData/NoData";
import useFetch from "../../../utilities/useFetch";
import { API_URL } from "../../../utilities/api";
import DeleteFile from "../DeleteFile/DeleteFile";
import EditCaption from "../EditCaption/EditCaption";
import LinkWithIcon from "../../UI/LinkWithIcon/LinkWithIcon";

function SavedPdfs() {
    const { data, error, loading } = useFetch(`${API_URL}/assets/pdfs`);
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
        const pdfs = data.data
        return (
            <div className="saved-pdfs">
                {pdfs.map((single, index) => {
                    return (
                        <div className="saved-pdfs__single" key={index}>
                            <LinkWithIcon text={single.caption || single.url} href={single.url} className />

                            {/* <p className="saved-pdfs__text">
                                <a className="saved-pdfs__link" href={single.url} target="_blank" rel="noreferrer">
                                    <span className="saved-pdfs__icon-box"><svg className="saved-pdfs__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg></span>
                                    {single.caption || single.url}</a>
                            </p> */}
                            <div className="saved-pdfs__buttons">
                                <DeleteFile id={single.id} />
                                <EditCaption id={single.id} caption={single.caption} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SavedPdfs;
