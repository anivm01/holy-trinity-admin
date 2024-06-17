import AddNewFeast from "../../components/Feasts/AddNewFeast/AddNewFeast";
import SavedFeasts from "../../components/Feasts/SavedFeasts/SavedFeasts";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import "./FeastsPage.scss";

function FeastsPage() {
  return (
    <>
      <PageHeader title="Feasts" />
      <section className="feasts-page">
        <AddNewFeast />
        <SavedFeasts />
      </section>
    </>
  );
}

export default FeastsPage;
