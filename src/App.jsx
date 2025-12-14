import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ProjectCatalog from './pages/ProjectCatalog'
import ExecutionHistory from './pages/ExecutionHistory'
import DetailedResults from './pages/DetailedResults'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import ProtectedLayout from './components/layout/ProtectedLayout'
import { AuthProvider } from './context/AuthContext'
import { ProjectProvider } from './context/ProjectContext'

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<ProjectCatalog />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/history/:projectId" element={<ExecutionHistory />} />
              <Route path="/results/:resultId" element={<DetailedResults />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </ProjectProvider>
    </AuthProvider>
  )
}

export default App

