import { motion } from 'framer-motion'
import { 
  Play, 
  Settings, 
  Clock,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'

const ProjectTable = ({ projects, onRun, onConfig, onHistory }) => {
  const [sortField, setSortField] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedProjects = [...projects].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    
    if (sortDirection === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    }
  })

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active'
      case 'draft': return 'status-draft'
      case 'archived': return 'status-archived'
      default: return 'status-draft'
    }
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />
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
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-1">
                  Project ID
                  <SortIcon field="id" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center gap-1">
                  Department
                  <SortIcon field="department" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('domain')}
              >
                <div className="flex items-center gap-1">
                  Domain
                  <SortIcon field="domain" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/30">
            {sortedProjects.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="table-row-hover transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="font-medium text-white">{project.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-surface-300">
                  {project.department}
                </td>
                <td className="px-6 py-4 text-sm text-surface-300">
                  {project.domain}
                </td>
                <td className="px-6 py-4 text-sm text-surface-400 max-w-xs truncate">
                  {project.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      onClick={() => onRun(project)}
                      className="p-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={project.status === 'Archived'}
                    >
                      <Play className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => onConfig(project)}
                      className="p-2 rounded-lg bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Settings className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => onHistory(project)}
                      className="p-2 rounded-lg bg-surface-700/50 hover:bg-surface-600/50 text-surface-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Clock className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ProjectTable

