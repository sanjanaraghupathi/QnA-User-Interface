import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  MinusCircle,
  HelpCircle,
  ExternalLink,
  Clock
} from 'lucide-react'

const HistoryTable = ({ executions }) => {
  const navigate = useNavigate()

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'pass':
        return {
          class: 'result-pass',
          icon: CheckCircle,
          label: 'Pass'
        }
      case 'fail':
        return {
          class: 'result-fail',
          icon: XCircle,
          label: 'Fail'
        }
      case 'partial':
        return {
          class: 'result-partial',
          icon: AlertTriangle,
          label: 'Partial'
        }
      case 'nr':
        return {
          class: 'result-nr',
          icon: MinusCircle,
          label: 'NR'
        }
      case 'na':
        return {
          class: 'result-na',
          icon: HelpCircle,
          label: 'NA'
        }
      default:
        return {
          class: 'result-na',
          icon: HelpCircle,
          label: status
        }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRowClick = (resultId) => {
    navigate(`/results/${resultId}`)
  }

  if (!executions || executions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl p-12 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-800/50 flex items-center justify-center">
          <Clock className="w-8 h-8 text-surface-500" />
        </div>
        <h3 className="text-lg font-medium text-surface-300 mb-2">No execution history</h3>
        <p className="text-surface-500">Run your first QA check to see results here</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-700/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Result ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Execution Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Project ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Environment
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/30">
            {executions.map((execution, index) => {
              const statusConfig = getStatusConfig(execution.status)
              const StatusIcon = statusConfig.icon

              return (
                <motion.tr
                  key={execution.resultId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => handleRowClick(execution.resultId)}
                  className="table-row-hover transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-white group-hover:text-electric-400 transition-colors">
                      {execution.resultId}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-300">
                    {formatDate(execution.executionDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-400">
                    {execution.projectId}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.class}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-300">
                    {execution.duration}
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-400">
                    {execution.environment}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRowClick(execution.resultId)
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700/50 hover:bg-electric-600 text-surface-300 hover:text-white text-xs font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.button>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default HistoryTable

