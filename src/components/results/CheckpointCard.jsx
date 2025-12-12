import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  MinusCircle,
  HelpCircle,
  ChevronDown,
  FileText,
  Sparkles
} from 'lucide-react'

const CheckpointCard = ({ checkpoint, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getOutcomeConfig = (outcome) => {
    switch (outcome.toUpperCase()) {
      case 'PASS':
        return {
          bgClass: 'bg-emerald-500/10 border-emerald-500/20',
          textClass: 'text-emerald-400',
          barClass: 'bg-emerald-500',
          icon: CheckCircle
        }
      case 'FAIL':
        return {
          bgClass: 'bg-red-500/10 border-red-500/20',
          textClass: 'text-red-400',
          barClass: 'bg-red-500',
          icon: XCircle
        }
      case 'NR':
        return {
          bgClass: 'bg-indigo-500/10 border-indigo-500/20',
          textClass: 'text-indigo-400',
          barClass: 'bg-indigo-500',
          icon: MinusCircle
        }
      case 'NA':
        return {
          bgClass: 'bg-surface-500/10 border-surface-500/20',
          textClass: 'text-surface-400',
          barClass: 'bg-surface-500',
          icon: HelpCircle
        }
      default:
        return {
          bgClass: 'bg-amber-500/10 border-amber-500/20',
          textClass: 'text-amber-400',
          barClass: 'bg-amber-500',
          icon: AlertTriangle
        }
    }
  }

  const outcomeConfig = getOutcomeConfig(checkpoint.outcome)
  const OutcomeIcon = outcomeConfig.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`glass rounded-xl overflow-hidden border ${outcomeConfig.bgClass}`}
    >
      {/* Main Content - Always Visible */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${outcomeConfig.bgClass} ${outcomeConfig.textClass}`}>
                {checkpoint.id}
              </span>
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${outcomeConfig.bgClass} ${outcomeConfig.textClass}`}>
                <OutcomeIcon className="w-3.5 h-3.5" />
                {checkpoint.outcome}
              </span>
            </div>
            
            <h3 className="font-medium text-white mb-1">{checkpoint.name}</h3>
            <p className="text-sm text-surface-400">{checkpoint.description}</p>
          </div>

          {/* Confidence Score */}
          <div className="text-right flex-shrink-0">
            <div className="text-sm text-surface-400 mb-1">Confidence</div>
            <div className="flex items-center gap-2 justify-end">
              {checkpoint.confidence > 0 ? (
                <>
                  <div className="w-16 h-1.5 bg-surface-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${outcomeConfig.barClass}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${checkpoint.confidence}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                  <span className={`text-lg font-bold ${outcomeConfig.textClass}`}>
                    {checkpoint.confidence}%
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-surface-500">N/A</span>
              )}
            </div>
          </div>

          {/* Expand Toggle */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="p-1 text-surface-400"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-surface-700/30">
              {/* Reasoning */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-surface-400 mb-2">
                  <Sparkles className="w-4 h-4 text-electric-400" />
                  <span>AI Reasoning</span>
                </div>
                <p className="text-sm text-surface-300 leading-relaxed bg-surface-800/30 rounded-lg p-3">
                  {checkpoint.reasoning}
                </p>
              </div>

              {/* Evidence */}
              {checkpoint.evidence && checkpoint.evidence.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-surface-400 mb-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Supporting Evidence</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {checkpoint.evidence.map((item, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-surface-700/30 text-sm text-surface-300 hover:bg-surface-600/30 transition-colors cursor-pointer"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CheckpointCard

