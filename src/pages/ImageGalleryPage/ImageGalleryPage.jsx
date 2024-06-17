import "./ImageGalleryPage.scss";
import SavedImages from "../../components/UploadedFiles/SavedImages/SavedImages";
import AddImage from "../../components/UploadedFiles/AddImage/AddImage";
import PageHeader from "../../components/UI/PageHeader/PageHeader";

function ImageGalleryPage() {
  return (
    <section>
      <PageHeader title="Image Gallery"></PageHeader>
      <AddImage />
      <SavedImages />
    </section>
  );
}

export default ImageGalleryPage;
