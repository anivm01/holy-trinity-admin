import { Announcement } from "../../components/Announcement/Announcement";
import PageHeader from "../../components/UI/PageHeader/PageHeader";

function AnnouncementPage() {
  return (
    <section>
      <PageHeader title="Announcement" />
      <Announcement />
    </section>
  );
}

export default AnnouncementPage;
