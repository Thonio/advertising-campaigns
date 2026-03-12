import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Dashboard from './pages/dashboard'
import CampaignList from './pages/campaignList'
import CampaignForm from './pages/campaignForm'
import Navbar from './components/navbar'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaigns" element={<CampaignList />} />
        <Route path="/campaigns/new" element={<CampaignForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
