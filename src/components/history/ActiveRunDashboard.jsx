import { motion } from 'framer-motion'
import { 
  Zap, 
  Clock, 
  Loader2,
  Play,
  Pause
} from 'lucide-react'

const ActiveRunDashboard = ({ activeRuns, projectId }) => {
  // Filter active runs for current project if projectId is provided
  const relevantRuns = projectId 
    ? activeRuns.filter(run => run.projectId === projectId)
    : activeRuns

  if (relevantRuns.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-amber-400" />
        <h2 className="font-heading font-semibold text-lg text-white">Active Runs</h2>
        <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
          {relevantRuns.length} active
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {relevantRuns.map((run, index) => (
          <ActiveRunCard key={run.resultId} run={run} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

const ActiveRunCard = ({ run, index }) => {
  const isRunning = run.status === 'Running'
  const isPending = run.status === 'Pending'

  const formatTime = (dateString) => {
    if (!dateString) return '--:--'
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-xl p-4 border-l-4 border-l-amber-500"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-white">{run.resultId}</h3>
            {isRunning && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Running
              </span>
            )}
            {isPending && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-surface-500/20 text-surface-400 border border-surface-500/30">
                <Clock className="w-3 h-3" />
                Pending
              </span>
            )}
          </div>
          <p className="text-sm text-surface-400 mt-0.5">{run.projectId}</p>
        </div>
        
        <div className="flex items-center gap-1">
          {isRunning && (
            <motion.button
              className="p-1.5 rounded-lg bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Pause className="w-4 h-4" />
            </motion.button>
          )}
          {isPending && (
            <motion.button
              className="p-1.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-surface-400 mb-1.5">
            <span>{run.currentStep}</span>
            <span>{run.progress}%</span>
          </div>
          <div className="h-2 bg-surface-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-500 to-purple-500 rounded-full progress-animate"
              initial={{ width: 0 }}
              animate={{ width: `${run.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Time Info */}
      <div className="flex items-center gap-4 text-xs text-surface-500">
        {run.startTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Started: {formatTime(run.startTime)}</span>
          </div>
        )}
        {isRunning && run.estimatedCompletion && (
          <div className="flex items-center gap-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Est. completion: {formatTime(run.estimatedCompletion)}</span>
          </div>
        )}
        {isPending && (
          <div className="flex items-center gap-1 text-surface-500">
            <span>Queued for execution</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ActiveRunDashboard

