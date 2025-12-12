import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import ProjectCatalog from './pages/ProjectCatalog'
import ExecutionHistory from './pages/ExecutionHistory'
//import DetailedResults from './pages/DetailedResults'
import DetailedResults from './pages/DetailedResults'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<ProjectCatalog />} />
            <Route path="/history/:projectId" element={<ExecutionHistory />} />
            <Route path="/results/:resultId" element={<DetailedResults />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App

