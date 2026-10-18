import AddNewObituary from "../../components/Obituaries/AddNewObituary/AddNewObituary";
import ObituariesList from "../../components/Obituaries/ObituariesList/ObituariesList";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import "./ObituariesPage.scss";

function ObituariesPage() {
  return (
    <main className="obituaries-page">
      <PageHeader title="Obituaries" />
      <AddNewObituary />
      <ObituariesList />
    </main>
  );
}

export default ObituariesPage;
