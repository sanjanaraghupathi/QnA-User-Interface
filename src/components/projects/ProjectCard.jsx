import { motion } from 'framer-motion'
import { 
  Play, 
  Settings, 
  Clock, 
  Building2, 
  Layers,
  Calendar,
  TrendingUp
} from 'lucide-react'

const ProjectCard = ({ project, onRun, onConfig, onHistory, index }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active'
      case 'draft': return 'status-draft'
      case 'archived': return 'status-archived'
      default: return 'status-draft'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass rounded-2xl p-5 flex flex-col h-full group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-semibold text-lg text-white group-hover:text-electric-400 transition-colors">
              {project.id}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
              {project.status}
            </span>
          </div>
          <p className="text-sm text-surface-400">{project.domain}</p>
        </div>
        {project.status === 'Active' && (
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-surface-300 mb-4 line-clamp-2 flex-grow">
        {project.description}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        <div className="flex items-center gap-1.5 text-surface-400">
          <Building2 className="w-3.5 h-3.5" />
          <span>{project.department}</span>
        </div>
        <div className="flex items-center gap-1.5 text-surface-400">
          <Layers className="w-3.5 h-3.5" />
          <span>{project.domain}</span>
        </div>
        {project.totalRuns > 0 && (
          <div className="flex items-center gap-1.5 text-surface-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{project.totalRuns} runs</span>
          </div>
        )}
      </div>

      {/* Last Run */}
      {project.lastRun && (
        <div className="flex items-center gap-1.5 text-xs text-surface-500 mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last run: {new Date(project.lastRun).toLocaleDateString()}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-surface-700/50">
        <motion.button
          onClick={(e) => { e.stopPropagation(); onRun(project); }}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-sm font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={project.status === 'Archived'}
        >
          <Play className="w-4 h-4" />
          <span>Run</span>
        </motion.button>
        <motion.button
          onClick={(e) => { e.stopPropagation(); onConfig(project); }}
          className="p-2 rounded-lg bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={(e) => { e.stopPropagation(); onHistory(project); }}
          className="p-2 rounded-lg bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Clock className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProjectCard

