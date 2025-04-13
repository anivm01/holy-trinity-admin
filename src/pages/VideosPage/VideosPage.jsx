import PageHeader from "../../components/UI/PageHeader/PageHeader";
import AddNewVideo from "../../components/Videos/AddNewVideo/AddNewVideo";
import SavedVideos from "../../components/Videos/SavedVideos/SavedVideos";

function VideosPage() {
  return (
    <section>
      <PageHeader title="Videos" />
      <AddNewVideo />
      <SavedVideos />
    </section>
  );
}

export default VideosPage;
