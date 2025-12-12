import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Scale, 
  Lightbulb,
  ChevronDown,
  Brain
} from 'lucide-react'

const InsightsPanel = ({ insights }) => {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const getTypeConfig = (type) => {
    switch (type.toLowerCase()) {
      case 'ai analysis':
        return {
          icon: Brain,
          color: 'text-electric-400',
          bgColor: 'bg-electric-500/10',
          borderColor: 'border-electric-500/20'
        }
      case 'rule evaluation':
        return {
          icon: Scale,
          color: 'text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/20'
        }
      case 'recommendation':
        return {
          icon: Lightbulb,
          color: 'text-amber-400',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20'
        }
      default:
        return {
          icon: Sparkles,
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/10',
          borderColor: 'border-purple-500/20'
        }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-electric-500/20 to-purple-500/20 border border-electric-500/20">
          <Sparkles className="w-5 h-5 text-electric-400" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-lg text-white">
            Insights & Reasoning
          </h2>
          <p className="text-sm text-surface-400">AI-powered analysis and recommendations</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const config = getTypeConfig(insight.type)
          const Icon = config.icon
          const isExpanded = expandedIndex === index

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border ${config.borderColor} overflow-hidden`}
            >
              {/* Header */}
              <div 
                className={`${config.bgColor} p-4 cursor-pointer`}
                onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-medium ${config.color} uppercase tracking-wider`}>
                        {insight.type}
                      </span>
                      <h3 className="font-medium text-white">{insight.title}</h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-surface-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 pt-0 bg-surface-800/20">
                      <div className="pt-4 border-t border-surface-700/30">
                        <p className="text-sm text-surface-300 leading-relaxed">
                          {insight.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default InsightsPanel

