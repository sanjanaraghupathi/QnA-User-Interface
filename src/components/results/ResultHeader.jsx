import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  User,
  Server,
  Calendar
} from 'lucide-react'

const ResultHeader = ({ result }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'pass':
        return {
          bgClass: 'bg-emerald-500/20 border-emerald-500/30',
          textClass: 'text-emerald-400',
          icon: CheckCircle,
          label: 'PASS'
        }
      case 'fail':
        return {
          bgClass: 'bg-red-500/20 border-red-500/30',
          textClass: 'text-red-400',
          icon: XCircle,
          label: 'FAIL'
        }
      case 'partial':
        return {
          bgClass: 'bg-amber-500/20 border-amber-500/30',
          textClass: 'text-amber-400',
          icon: AlertTriangle,
          label: 'PARTIAL'
        }
      default:
        return {
          bgClass: 'bg-surface-500/20 border-surface-500/30',
          textClass: 'text-surface-400',
          icon: AlertTriangle,
          label: status.toUpperCase()
        }
    }
  }

  const statusConfig = getStatusConfig(result.status)
  const StatusIcon = statusConfig.icon

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Result Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className={`px-6 py-3 rounded-xl border-2 ${statusConfig.bgClass}`}
            >
              <div className="flex items-center gap-3">
                <StatusIcon className={`w-8 h-8 ${statusConfig.textClass}`} />
                <span className={`text-3xl font-heading font-bold ${statusConfig.textClass}`}>
                  {statusConfig.label}
                </span>
              </div>
            </motion.div>
            
            {/* Confidence Score */}
            <div className="hidden sm:block">
              <div className="text-sm text-surface-400 mb-1">Overall Confidence</div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-surface-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${result.status === 'Pass' ? 'bg-emerald-500' : result.status === 'Fail' ? 'bg-red-500' : 'bg-amber-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${result.overallConfidence}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
                <span className="text-lg font-bold text-white">{result.overallConfidence}%</span>
              </div>
            </div>
          </div>

          <h1 className="font-heading font-bold text-2xl text-white mb-2">
            {result.resultId}
          </h1>
          <p className="text-surface-400">
            {result.projectName} • {result.projectId}
          </p>
        </div>

        {/* Right: Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
          <MetaItem 
            icon={Calendar}
            label="Executed"
            value={formatDate(result.executionDate)}
          />
          <MetaItem 
            icon={Clock}
            label="Duration"
            value={result.duration}
          />
          <MetaItem 
            icon={Server}
            label="Environment"
            value={result.environment}
          />
          <MetaItem 
            icon={User}
            label="Triggered By"
            value={result.triggeredBy}
          />
        </div>
      </div>
    </motion.div>
  )
}

const MetaItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-surface-700/30">
        <Icon className="w-4 h-4 text-surface-400" />
      </div>
      <div>
        <p className="text-xs text-surface-500">{label}</p>
        <p className="text-sm text-surface-200 font-medium">{value}</p>
      </div>
    </div>
  )
}

export default ResultHeader

