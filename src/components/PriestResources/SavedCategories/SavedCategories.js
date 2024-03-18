import { ThreeDots } from "react-loader-spinner";
import NoData from "../../NoData/NoData";
import useFetch from "../../../utilities/useFetch";
import { API_URL } from "../../../utilities/api";
import ReorderCategories from "../ReorderCategories/ReorderCategories";

function SavedCategories() {
    const { data, error, loading } = useFetch(`${API_URL}/priest-resources/category`);
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
            <ReorderCategories categories={data} />
        );
    }
}

export default SavedCategories;
