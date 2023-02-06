import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeeklyAnnouncementForm from './components/WeeklyAnnouncementForm/WeeklyAnnouncementForm';
import Dashboard from './components/Dashboard/Dashboard';
import WeeklyAnnouncementsPage from './pages/WeeklyAnnouncementsPage/WeeklyAnnouncementsPage';

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Dashboard />
      <div className='app__main'>
        <Routes>
          <Route path="/" element={<WeeklyAnnouncementForm />}/>
          <Route path="/weekly-announcements" element={<WeeklyAnnouncementsPage />}/>
          <Route path="/weekly-announcements/add-new" element={<WeeklyAnnouncementForm />}/>
          <Route path="/weekly-announcements/:id" element={<WeeklyAnnouncementForm />}/>
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
