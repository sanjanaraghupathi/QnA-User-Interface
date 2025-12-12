import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Database,
  Terminal,
  Clock,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  FileSpreadsheet,
  File
} from 'lucide-react'

const KnowledgeSourceTabs = ({ knowledgeSources }) => {
  const [activeTab, setActiveTab] = useState('logs')

  const tabs = [
    { id: 'logs', label: 'Execution Logs', icon: Terminal },
    { id: 'sharepoint', label: 'SharePoint References', icon: Database },
  ]

  const getLogLevelConfig = (level) => {
    switch (level.toUpperCase()) {
      case 'INFO':
        return { color: 'text-electric-400', icon: CheckCircle }
      case 'WARN':
        return { color: 'text-amber-400', icon: AlertTriangle }
      case 'ERROR':
        return { color: 'text-red-400', icon: AlertCircle }
      default:
        return { color: 'text-surface-400', icon: Terminal }
    }
  }

  const getFileIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'PDF':
        return FileText
      case 'XLSX':
      case 'XLS':
        return FileSpreadsheet
      default:
        return File
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Tab Headers */}
      <div className="flex border-b border-surface-700/50">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors relative ${
                isActive 
                  ? 'text-electric-400' 
                  : 'text-surface-400 hover:text-surface-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-500"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {activeTab === 'logs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1 font-mono text-sm"
          >
            {knowledgeSources.executionLogs.map((log, index) => {
              const levelConfig = getLogLevelConfig(log.level)
              const LevelIcon = levelConfig.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-700/30 transition-colors"
                >
                  <div className="flex items-center gap-2 text-surface-500 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{formatTime(log.timestamp)}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 flex-shrink-0 ${levelConfig.color}`}>
                    <LevelIcon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium w-12">[{log.level}]</span>
                  </div>
                  <span className="text-surface-300 break-all">{log.message}</span>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {activeTab === 'sharepoint' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {knowledgeSources.sharepointReferences.map((ref, index) => {
              const FileIcon = getFileIcon(ref.type)

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-surface-800/30 border border-surface-700/30 hover:border-electric-500/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-surface-700/30 group-hover:bg-electric-500/10 transition-colors">
                      <FileIcon className="w-5 h-5 text-surface-400 group-hover:text-electric-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-electric-400 transition-colors">
                        {ref.name}
                      </h4>
                      <p className="text-sm text-surface-500">{ref.path}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-surface-700/50 text-surface-400">
                        {ref.type}
                      </span>
                      <p className="text-xs text-surface-500 mt-1">
                        Modified: {new Date(ref.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-surface-500 group-hover:text-electric-400 transition-colors" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default KnowledgeSourceTabs

