import "./SavedPriestResources.scss";
import { ThreeDots } from "react-loader-spinner";
import NoData from "../../NoData/NoData";
import useFetch from "../../../utilities/useFetch";
import { API_URL } from "../../../utilities/api";
import SinglePriestResource from "../SinglePriestResource/SinglePriestResrouce";
import ReorderResources from "../ReorderResources/ReorderResources";


function SavedPriestResources() {
  const { data, error, loading } = useFetch(`${API_URL}/priest-resources`);
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
      <div className="priest-resources">
        {data.map((category) => (
          <div key={category.category_id}>
            <h3 className="priest-resources__category">{category.category}</h3>
            <ReorderResources category={category.category} categoryId={category.category_id} resources={category.resources} />
            <ul className="priest-resources__list">
              {category.resources.map((resource) => (
                <SinglePriestResource key={resource.id} resource={resource} />
              ))}
            </ul>
          </div>
        ))}
      </div>

    );
  }
}

export default SavedPriestResources;
