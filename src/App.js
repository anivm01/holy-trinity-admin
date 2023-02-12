import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewWeeklyAnnouncement from './components/AddNewWeeklyAnnouncement/AddNewWeeklyAnnouncement';
import Dashboard from './components/Dashboard/Dashboard';
import WeeklyAnnouncementsPage from './pages/WeeklyAnnouncementsPage/WeeklyAnnouncementsPage';
import EditWeeklyAnnouncement from './components/EditWeeklyAnnouncement/EditWeeklyAnnouncement';
import AddNewWorshipOffice from './components/AddNewWorshipOffice/AddNewWorshipOffice';
import WorshipOfficesPage from './pages/WorshipOfficesPage/WorshipOfficesPage';
import EditWorshipOffice from './components/EditWorshipOffice/EditWorshipOffice';
import AddNewEvent from './components/AddNewEvent/AddNewEvent';
import EventsPage from './pages/EventsPage/EventsPage';
import EditEvent from './components/EditEvent/EditEvent';
import CommunityNewsPage from './pages/CommunityNewsPage/CommunityNewsPage';
import AddNewCommunityNews from './components/AddNewCommunityNews/AddNewCommunityNews';
import EditCommunityNews from './components/EditCommunityNews/EditCommunityNews';

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Dashboard />
      <div className='app__main'>
        <Routes>
          <Route path="/" />
          <Route path="/weekly-announcements" element={<WeeklyAnnouncementsPage />}/>
          <Route path="/weekly-announcements/add-new" element={<AddNewWeeklyAnnouncement />}/>
          <Route path="/weekly-announcements/:id" element={<EditWeeklyAnnouncement />}/>
          <Route path="/worship-offices" element={<WorshipOfficesPage />} />
          <Route path="/worship-offices/add-new" element={<AddNewWorshipOffice />} />
          <Route path="/worship-offices/:id" element={<EditWorshipOffice />} />
          <Route path="/events" element={<EventsPage/>} />
          <Route path="/events/add-new" element={<AddNewEvent/>} />
          <Route path="/events/:id" element={<EditEvent/>} />
          <Route path="/community-news" element={<CommunityNewsPage/>} />
          <Route path="/community-news/add-new" element={<AddNewCommunityNews/>} />
          <Route path="/community-news/:id" element={<EditCommunityNews />} />
          <Route path="/obituaries" />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App;
