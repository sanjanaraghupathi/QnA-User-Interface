import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  X, 
  Play, 
  Calendar,
  Server,
  FileText,
  Info,
  Loader2,
  CheckCircle,
  CloudCog
} from 'lucide-react'

const TriggerRunModal = ({ isOpen, onClose, project }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    referenceId: '',
    environment: 'Production',
    executionDate: new Date().toISOString().split('T')[0],
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect after success animation
    setTimeout(() => {
      onClose()
      setIsSuccess(false)
      navigate(`/history/${project?.id}`)
    }, 1000)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-950/80 backdrop-blur-sm z-50"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg glass border-l border-surface-700/50 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 glass border-b border-surface-700/50 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-xl text-white">
                  Trigger QA Run
                </h2>
                <p className="text-sm text-surface-400 mt-0.5">
                  {project.id} • {project.domain}
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-700/50 text-surface-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Data Source Info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-4 rounded-xl bg-electric-500/10 border border-electric-500/20"
              >
                <div className="flex items-start gap-3">
                  <CloudCog className="w-5 h-5 text-electric-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-electric-400">Data Source Configuration</p>
                    <p className="text-xs text-surface-400 mt-1">
                      Inputs configured from SharePoint source. Questions and checklist items will be loaded from the connected knowledge base.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Reference ID */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block text-sm font-medium text-surface-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Reference ID
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.referenceId}
                    onChange={(e) => handleChange('referenceId', e.target.value)}
                    placeholder="e.g., REF-2025-Q4-001"
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white placeholder-surface-500 text-sm focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition-all"
                  />
                </motion.div>

                {/* Environment */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-surface-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Environment
                    </div>
                  </label>
                  <select
                    value={formData.environment}
                    onChange={(e) => handleChange('environment', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white text-sm focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition-all cursor-pointer"
                  >
                    <option value="Production">Production</option>
                    <option value="UAT">UAT (User Acceptance Testing)</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                </motion.div>

                {/* Execution Date */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="block text-sm font-medium text-surface-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Execution Date
                    </div>
                  </label>
                  <input
                    type="date"
                    value={formData.executionDate}
                    onChange={(e) => handleChange('executionDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white text-sm focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition-all cursor-pointer"
                  />
                </motion.div>

                {/* Additional Notes */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-surface-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Additional Notes
                    </div>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Optional notes for this execution..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white placeholder-surface-500 text-sm focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition-all resize-none"
                  />
                </motion.div>

                {/* Project Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-4 rounded-xl bg-surface-800/30 border border-surface-700/30"
                >
                  <h4 className="text-sm font-medium text-surface-300 mb-3">Project Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-surface-500">Department</span>
                      <span className="text-surface-300">{project.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Domain</span>
                      <span className="text-surface-300">{project.domain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Total Runs</span>
                      <span className="text-surface-300">{project.totalRuns}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 pt-4"
                >
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-xl bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 disabled:bg-electric-600/50 text-white text-sm font-medium transition-colors"
                    whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Starting Run...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Run Started!</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Trigger Run</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TriggerRunModal

