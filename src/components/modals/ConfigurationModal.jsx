import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Save,
  Bell,
  Clock,
  Users,
  FileText,
  Shield,
  Database,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

const ConfigurationModal = ({ isOpen, onClose, project }) => {
  const [config, setConfig] = useState({
    notifications: true,
    autoSchedule: false,
    scheduleFrequency: 'daily',
    notifyOnFail: true,
    notifyOnPass: false,
    assignees: ['john.smith@company.com'],
    dataSource: 'SharePoint',
    retentionDays: 90
  })

  const handleToggle = (field) => {
    setConfig(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSave = () => {
    // Simulate save
    onClose()
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass rounded-2xl border border-surface-700/50 z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 glass border-b border-surface-700/50 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-xl text-white">
                  Project Configuration
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
            <div className="p-6 space-y-6">
              {/* Notifications Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-electric-400" />
                  <h3 className="font-medium text-white">Notifications</h3>
                </div>
                <div className="space-y-3 pl-7">
                  <ToggleRow
                    label="Enable notifications"
                    description="Receive alerts for run completions"
                    enabled={config.notifications}
                    onToggle={() => handleToggle('notifications')}
                  />
                  <ToggleRow
                    label="Notify on failure"
                    description="Get alerts when runs fail"
                    enabled={config.notifyOnFail}
                    onToggle={() => handleToggle('notifyOnFail')}
                  />
                  <ToggleRow
                    label="Notify on pass"
                    description="Get alerts when runs pass"
                    enabled={config.notifyOnPass}
                    onToggle={() => handleToggle('notifyOnPass')}
                  />
                </div>
              </motion.div>

              {/* Scheduling Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-medium text-white">Scheduling</h3>
                </div>
                <div className="space-y-3 pl-7">
                  <ToggleRow
                    label="Auto-schedule runs"
                    description="Automatically run at scheduled intervals"
                    enabled={config.autoSchedule}
                    onToggle={() => handleToggle('autoSchedule')}
                  />
                  {config.autoSchedule && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2"
                    >
                      <label className="block text-sm text-surface-400 mb-2">Frequency</label>
                      <select
                        value={config.scheduleFrequency}
                        onChange={(e) => setConfig(prev => ({ ...prev, scheduleFrequency: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white text-sm focus:border-electric-500/50 transition-all cursor-pointer"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Team Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-purple-400" />
                  <h3 className="font-medium text-white">Team Assignees</h3>
                </div>
                <div className="pl-7">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {config.assignees.map((email, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-700/50 text-sm text-surface-300">
                        {email}
                      </span>
                    ))}
                  </div>
                  <input
                    type="email"
                    placeholder="Add team member email..."
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white placeholder-surface-500 text-sm focus:border-electric-500/50 transition-all"
                  />
                </div>
              </motion.div>

              {/* Data Source Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-amber-400" />
                  <h3 className="font-medium text-white">Data Source</h3>
                </div>
                <div className="pl-7 space-y-3">
                  <div className="p-4 rounded-xl bg-surface-800/30 border border-surface-700/30">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-surface-400" />
                      <div>
                        <p className="text-sm font-medium text-white">SharePoint Integration</p>
                        <p className="text-xs text-surface-500">/Compliance/Regulatory/Basel_III/</p>
                      </div>
                      <span className="ml-auto px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Connected
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-surface-400">Result retention period</label>
                    <select
                      value={config.retentionDays}
                      onChange={(e) => setConfig(prev => ({ ...prev, retentionDays: Number(e.target.value) }))}
                      className="px-3 py-1.5 rounded-lg bg-surface-800/50 border border-surface-700/50 text-white text-sm cursor-pointer"
                    >
                      <option value={30}>30 days</option>
                      <option value={60}>60 days</option>
                      <option value={90}>90 days</option>
                      <option value={180}>180 days</option>
                      <option value={365}>1 year</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Security Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-red-400" />
                  <h3 className="font-medium text-white">Security & Access</h3>
                </div>
                <div className="pl-7">
                  <div className="p-4 rounded-xl bg-surface-800/30 border border-surface-700/30 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-400">Access Level</span>
                      <span className="text-surface-300">Department-wide</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-400">Audit Logging</span>
                      <span className="text-emerald-400">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-400">Data Encryption</span>
                      <span className="text-emerald-400">AES-256</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 glass border-t border-surface-700/50 px-6 py-4 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-sm font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const ToggleRow = ({ label, description, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-800/30 border border-surface-700/30">
      <div>
        <p className="text-sm font-medium text-surface-300">{label}</p>
        <p className="text-xs text-surface-500">{description}</p>
      </div>
      <motion.button
        onClick={onToggle}
        className={`p-1 rounded-lg transition-colors ${enabled ? 'text-electric-400' : 'text-surface-500'}`}
        whileTap={{ scale: 0.9 }}
      >
        {enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
      </motion.button>
    </div>
  )
}

export default ConfigurationModal

