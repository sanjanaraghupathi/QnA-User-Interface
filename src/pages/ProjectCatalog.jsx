import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FolderKanban, Plus } from 'lucide-react'
import { departments, statuses } from '../data/projects'
import { useProject } from '../context/ProjectContext'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectTable from '../components/projects/ProjectTable'
import ProjectFilters from '../components/projects/ProjectFilters'
import TriggerRunModal from '../components/modals/TriggerRunModal'
import ConfigurationModal from '../components/modals/ConfigurationModal'
import CreateProjectModal from '../components/modals/CreateProjectModal'

const ProjectCatalog = () => {
  const navigate = useNavigate()

  // State
  const { projects, addProject } = useProject()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [viewMode, setViewMode] = useState('card')

  // Modal state
  const [runModalOpen, setRunModalOpen] = useState(false)
  const [configModalOpen, setConfigModalOpen] = useState(false)
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = !searchQuery ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = !statusFilter || project.status === statusFilter
      const matchesDepartment = !departmentFilter || project.department === departmentFilter

      return matchesSearch && matchesStatus && matchesDepartment
    })
  }, [projects, searchQuery, statusFilter, departmentFilter])

  // Handlers
  const handleRun = (project) => {
    setSelectedProject(project)
    setRunModalOpen(true)
  }

  const handleConfig = (project) => {
    setSelectedProject(project)
    setConfigModalOpen(true)
  }

  const handleHistory = (project) => {
    navigate(`/history/${project.id}`)
  }

  const handleCreateProject = (projectData) => {
    const newProject = {
      ...projectData,
      status: 'Active',
      lastRun: 'Never',
      metrics: null
    }
    // Add to context
    addProject(newProject)
    setCreateProjectModalOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <motion.div
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="p-2 rounded-xl bg-electric-500/10 border border-electric-500/20">
              <FolderKanban className="w-6 h-6 text-electric-400" />
            </div>
            <h1 className="font-heading font-bold text-3xl text-white">
              Project Catalog
            </h1>
          </motion.div>
          <motion.p
            className="text-surface-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Manage and run quality assurance checks across your projects
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => setCreateProjectModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-medium transition-colors shadow-lg shadow-electric-600/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Filters */}
      <ProjectFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        statuses={statuses}
        departments={departments}
      />

      {/* Results Count */}
      <motion.p
        className="text-sm text-surface-500 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Showing {filteredProjects.length} of {projects.length} projects
      </motion.p>

      {/* Project Grid or Table */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onRun={handleRun}
              onConfig={handleConfig}
              onHistory={handleHistory}
            />
          ))}
        </div>
      ) : (
        <ProjectTable
          projects={filteredProjects}
          onRun={handleRun}
          onConfig={handleConfig}
          onHistory={handleHistory}
        />
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-800/50 flex items-center justify-center">
            <FolderKanban className="w-8 h-8 text-surface-500" />
          </div>
          <h3 className="text-lg font-medium text-surface-300 mb-2">No projects found</h3>
          <p className="text-surface-500">Try adjusting your search or filters</p>
        </motion.div>
      )}

      {/* Modals */}
      <TriggerRunModal
        isOpen={runModalOpen}
        onClose={() => setRunModalOpen(false)}
        project={selectedProject}
      />
      <ConfigurationModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        project={selectedProject}
      />
      <CreateProjectModal
        isOpen={createProjectModalOpen}
        onClose={() => setCreateProjectModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </motion.div>
  )
}

export default ProjectCatalog

