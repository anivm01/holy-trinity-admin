import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ImageGalleryPage from "./pages/ImageGalleryPage/ImageGalleryPage";
import QuickNav from "./components/QuickNav/QuickNav";
import { LoggedInProvider } from "./utilities/LoggedInContext";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import ResourcesPage from "./pages/ResourcesPage/ResourcesPage";
import PriestResourcesPage from "./pages/PriestResourcesPage/PriestResourcesPage";
import PDFUploadsPage from "./pages/PDFUploadsPage/PDFUploadsPage";
import BroadcastsPage from "./pages/BroadcastsPage/BroadcastsPage";
import FeastsPage from "./pages/FeastsPage/FeastsPage";
import AnnouncementPage from "./pages/AnnouncementPage/AnnouncementPage";
import VideosPage from "./pages/VideosPage/VideosPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";

function App() {
  return (
    <LoggedInProvider>
      <BrowserRouter>
        <div className="app">
          <Dashboard />
          <div className="app__main">
            <Routes>
              <Route path="/" element={<QuickNav />} />
              <Route path="/image-gallery" element={<ImageGalleryPage />} />

              <Route path="/calendar" element={<CalendarPage />} />

              <Route path="/messages" element={<MessagesPage />} />

              <Route path="/useful-links" element={<ResourcesPage />} />
              <Route path="/resources" element={<PriestResourcesPage />} />
              <Route path="/upload-pdf" element={<PDFUploadsPage />} />
              <Route path="/broadcasts" element={<BroadcastsPage />} />
              <Route path="/feasts" element={<FeastsPage />} />
              <Route path="/announcement" element={<AnnouncementPage />} />
              <Route path="/videos" element={<VideosPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </LoggedInProvider>
  );
}

export default App;
