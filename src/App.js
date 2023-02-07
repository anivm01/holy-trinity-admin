import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewWeeklyAnnouncement from './components/AddNewWeeklyAnnouncement/AddNewWeeklyAnnouncement';
import Dashboard from './components/Dashboard/Dashboard';
import WeeklyAnnouncementsPage from './pages/WeeklyAnnouncementsPage/WeeklyAnnouncementsPage';
import EditWeeklyAnnouncement from './components/EditWeeklyAnnouncement/EditWeeklyAnnouncement';

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
          <Route path="/worship-offices" />
          <Route path="/events" />
          <Route path="/community-news" />
          <Route path="/obituaries" />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App;
