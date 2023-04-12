import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewWeeklyAnnouncement from "./components/AddNewWeeklyAnnouncement/AddNewWeeklyAnnouncement";
import Dashboard from "./components/Dashboard/Dashboard";
import WeeklyAnnouncementsPage from "./pages/WeeklyAnnouncementsPage/WeeklyAnnouncementsPage";
import AddNewWorshipOffice from "./components/AddNewWorshipOffice/AddNewWorshipOffice";
import WorshipOfficesPage from "./pages/WorshipOfficesPage/WorshipOfficesPage";
import AddNewEvent from "./components/AddNewEvent/AddNewEvent";
import EventsPage from "./pages/EventsPage/EventsPage";
import CommunityNewsPage from "./pages/CommunityNewsPage/CommunityNewsPage";
import AddNewCommunityNews from "./components/AddNewCommunityNews/AddNewCommunityNews";
import AddNewObituary from "./components/AddNewObituary/AddNewObituary";
import ObituariesPage from "./pages/ObituariesPage/ObituariesPage";
import ImageGalleryPage from "./pages/ImageGalleryPage/ImageGalleryPage";
import QuickNav from "./components/QuickNav/QuickNav";
import EditObituaryPage from "./pages/EditObituaryPage/EditObituaryPage";
import EditCommunityNewsPage from "./pages/EditCommunityNewsPage/EditCommunityNewsPage";
import EditWorshipOfficePage from "./pages/EditWorshipOfficePage/EditWorshipOfficePage";
import EditAnnouncementPage from "./pages/EditAnnouncementPage/EditAnnouncementPage";
import EditEventPage from "./pages/EditEventPage/EditEventPage";
import { LoggedInProvider } from "./utilities/LoggedInContext";

function App() {
  return (
    <LoggedInProvider>
      <BrowserRouter>
        <div className="app">
          <Dashboard />
          <div className="app__main">
            <Routes>
              <Route path="/" element={<QuickNav />} />
              <Route
                path="/weekly-announcements"
                element={<WeeklyAnnouncementsPage />}
              />
              <Route
                path="/weekly-announcements/add-new"
                element={<AddNewWeeklyAnnouncement />}
              />
              <Route
                path="/weekly-announcements/:id"
                element={<EditAnnouncementPage />}
              />
              <Route path="/worship-offices" element={<WorshipOfficesPage />} />
              <Route
                path="/worship-offices/add-new"
                element={<AddNewWorshipOffice />}
              />
              <Route
                path="/worship-offices/:id"
                element={<EditWorshipOfficePage />}
              />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/add-new" element={<AddNewEvent />} />
              <Route path="/events/:id" element={<EditEventPage />} />
              <Route path="/community-news" element={<CommunityNewsPage />} />
              <Route
                path="/community-news/add-new"
                element={<AddNewCommunityNews />}
              />
              <Route
                path="/community-news/:id"
                element={<EditCommunityNewsPage />}
              />
              <Route path="/obituaries" element={<ObituariesPage />} />
              <Route path="/obituaries/add-new" element={<AddNewObituary />} />
              <Route path="/obituaries/:id" element={<EditObituaryPage />} />
              <Route path="/image-gallery" element={<ImageGalleryPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </LoggedInProvider>
  );
}

export default App;
