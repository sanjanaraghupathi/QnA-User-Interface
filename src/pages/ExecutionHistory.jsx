import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  History, 
  Play,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { projects } from '../data/projects'
import { executions, activeRuns } from '../data/executions'
import ActiveRunDashboard from '../components/history/ActiveRunDashboard'
import HistoryTable from '../components/history/HistoryTable'

const ExecutionHistory = () => {
  const { projectId } = useParams()
  
  // Find the project
  const project = projects.find(p => p.id === projectId)
  
  // Get executions for this project
  const projectExecutions = executions[projectId] || []

  // Calculate stats
  const totalRuns = projectExecutions.length
  const passRate = totalRuns > 0 
    ? Math.round((projectExecutions.filter(e => e.status === 'Pass').length / totalRuns) * 100)
    : 0
  const lastRunDate = projectExecutions.length > 0 
    ? new Date(projectExecutions[0].executionDate).toLocaleDateString()
    : 'Never'

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <h2 className="text-xl font-medium text-surface-300 mb-4">Project not found</h2>
        <Link to="/" className="text-electric-400 hover:text-electric-300 transition-colors">
          Return to catalog
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Back Link */}
      <Link to="/">
        <motion.div
          className="inline-flex items-center gap-2 text-surface-400 hover:text-white mb-6 transition-colors"
          whileHover={{ x: -4 }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Catalog</span>
        </motion.div>
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <motion.div 
          className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <History className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-3xl text-white">
                  {project.id}
                </h1>
                <p className="text-surface-400">{project.domain}</p>
              </div>
            </div>
            <p className="text-surface-400 mt-3 max-w-2xl">
              {project.description}
            </p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-medium transition-colors shadow-lg shadow-electric-600/25 whitespace-nowrap"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5" />
            <span>New Run</span>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-electric-500/10">
                <TrendingUp className="w-5 h-5 text-electric-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalRuns}</p>
                <p className="text-sm text-surface-400">Total Runs</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-emerald-400 border-2 border-emerald-400">
                  %
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{passRate}%</p>
                <p className="text-sm text-surface-400">Pass Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{lastRunDate}</p>
                <p className="text-sm text-surface-400">Last Run</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Active Runs Dashboard */}
      <ActiveRunDashboard activeRuns={activeRuns} projectId={projectId} />

      {/* History Section */}
      <div className="mb-4">
        <h2 className="font-heading font-semibold text-lg text-white mb-4">
          Execution History
        </h2>
        <HistoryTable executions={projectExecutions} />
      </div>
    </motion.div>
  )
}

export default ExecutionHistory

