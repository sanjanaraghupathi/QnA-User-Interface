import { motion } from 'framer-motion'
import { 
  Search, 
  LayoutGrid, 
  List,
  Filter,
  X
} from 'lucide-react'

const ProjectFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  viewMode,
  setViewMode,
  statuses,
  departments 
}) => {
  const hasActiveFilters = statusFilter || departmentFilter || searchQuery

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('')
    setDepartmentFilter('')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6"
    >
      {/* Search and Filters */}
      <div className="flex flex-wrap gap-3 items-center flex-1">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search by Project ID or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-800/50 border border-surface-700/50 text-white placeholder-surface-500 text-sm focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-surface-800/50 border border-surface-700/50 text-surface-300 text-sm focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition-all cursor-pointer"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
        </div>

        {/* Department Filter */}
        <div className="relative">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-surface-800/50 border border-surface-700/50 text-surface-300 text-sm focus:border-electric-500/50 focus:ring-2 focus:ring-electric-500/20 transition-all cursor-pointer"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-surface-400 hover:text-white hover:bg-surface-700/50 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-800/50 border border-surface-700/50">
        <motion.button
          onClick={() => setViewMode('card')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'card' 
              ? 'bg-electric-600 text-white' 
              : 'text-surface-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LayoutGrid className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={() => setViewMode('table')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'table' 
              ? 'bg-electric-600 text-white' 
              : 'text-surface-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <List className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProjectFilters

