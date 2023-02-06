import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeeklyAnnouncementForm from './components/WeeklyAnnouncementForm/WeeklyAnnouncementForm';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Dashboard />
      <Routes>
        <Route path="/" element={<WeeklyAnnouncementForm />}/>
        <Route path="/weekly-announcements" element={<WeeklyAnnouncementForm />}/>
        <Route path="/weekly-announcements/add-new" element={<WeeklyAnnouncementForm />}/>
        <Route path="/weekly-announcements/:id" element={<WeeklyAnnouncementForm />}/>
        <Route path="/worship-offices" />
        <Route path="/events" />
        <Route path="/community-news" />
        <Route path="/obituaries" />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
