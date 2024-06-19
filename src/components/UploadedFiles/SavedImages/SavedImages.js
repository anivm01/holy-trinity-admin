import "./SavedImages.scss";
import { ThreeDots } from "react-loader-spinner";
import NoData from "../../NoData/NoData";
import useFetch from "../../../utilities/useFetch";
import { API_URL } from "../../../utilities/api";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import DeleteFile from "../DeleteFile/DeleteFile";
import EditCaption from "../EditCaption/EditCaption";

function SavedImages() {
    const { data, error, loading } = useFetch(`${API_URL}/assets/images`);
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
        const images = data.data
        console.log(images)
        return (
            <div className="saved-images">
                <ResponsiveMasonry
                    className="saved_images__responsive-masonry"
                    columnsCountBreakPoints={{ 400: 1, 768: 2, 900: 4 }}
                >
                    <Masonry columnsCount={4} gutter="2rem">
                        {images.map((image) => {
                            return (
                                <div className="saved-images__box" key={image.id}>
                                    <img
                                        className="saved-images__img"
                                        src={image.url}
                                        alt={image.caption}
                                    />
                                    <div className="saved-images__buttons">
                                        <DeleteFile id={image.id} />
                                        <EditCaption id={image.id} caption={image.caption} />
                                    </div>
                                </div>
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        );
    }
}

export default SavedImages;
