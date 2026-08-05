import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CurriculumProvider } from './context/CurriculumContext'
import { AcademyLayout } from './components/layout/AcademyLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Home } from './pages/Home'
import { CurriculumOverview } from './pages/CurriculumOverview'
import { SessionPlayer } from './pages/SessionPlayer'
import { DriverProfile } from './pages/DriverProfile'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { PasswordReset } from './pages/PasswordReset'
import { NotFound } from './pages/NotFound'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CurriculumProvider>
        <Router>
          <Routes>
            <Route path="/session/:sessionId" element={<SessionPlayer />} />
            <Route
              path="*"
              element={
                <AcademyLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/curriculum" element={<CurriculumOverview />} />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <DriverProfile />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<PasswordReset />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AcademyLayout>
              }
            />
          </Routes>
        </Router>
      </CurriculumProvider>
    </AuthProvider>
  )
}

export default App

