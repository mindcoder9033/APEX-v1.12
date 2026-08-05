import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AcademyLayout } from './components/layout/AcademyLayout'
import { Home } from './pages/Home'
import { CurriculumOverview } from './pages/CurriculumOverview'
import { DriverProfile } from './pages/DriverProfile'
import { NotFound } from './pages/NotFound'

export const App: React.FC = () => {
  return (
    <Router>
      <AcademyLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum" element={<CurriculumOverview />} />
          <Route path="/profile" element={<DriverProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AcademyLayout>
    </Router>
  )
}

export default App
