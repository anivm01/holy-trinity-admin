import "./CategoryPicker.scss";
import { ThreeDots } from "react-loader-spinner";
import NoData from "../../NoData/NoData";
import useFetch from "../../../utilities/useFetch";
import { API_URL } from "../../../utilities/api";

function CategoryPicker({ entry, handleChange }) {
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
            <div className="category-picker">
                <label className="category-picker__label" htmlFor="pr-categoryId">Category:</label>
                <select
                    className="category-picker__select"
                    id="pr-categoryId"
                    name="category_id"
                    value={entry.category_id}
                    onChange={handleChange}
                    required
                >
                    <option className="category-picker__option" value="">Select a category</option>
                    {data.map((category) => (
                        <option className="category-picker__option" key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

        );
    }
}

export default CategoryPicker;
