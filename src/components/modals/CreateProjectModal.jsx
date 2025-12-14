import { motion, AnimatePresence } from 'framer-motion'
import { X, FolderKanban } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        department: 'Engineering',
        description: ''
    })

    const departments = ['Engineering', 'Product', 'Design', 'QA', 'Marketing']

    const handleSubmit = () => {
        if (!formData.name || !formData.id) return // Simple validation
        onCreate(formData)
        setFormData({ id: '', name: '', department: 'Engineering', description: '' }) // Reset
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="glass rounded-2xl border border-surface-700 shadow-xl overflow-hidden">
                            <div className="p-6 border-b border-surface-700 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-electric-500/10 text-electric-400">
                                        <FolderKanban className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Create New Project</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-surface-700 text-surface-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-surface-300">Project Name <span className="text-red-400">*</span></label>
                                    <input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-surface-800/50 border border-surface-700 rounded-lg text-white placeholder-surface-500 focus:outline-none focus:border-electric-500 transition-colors"
                                        placeholder="e.g. Mobile App Beta"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-surface-300">Project ID <span className="text-red-400">*</span></label>
                                        <input
                                            value={formData.id}
                                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                            className="w-full px-4 py-2 bg-surface-800/50 border border-surface-700 rounded-lg text-white placeholder-surface-500 focus:outline-none focus:border-electric-500 transition-colors"
                                            placeholder="e.g. MOB-001"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-surface-300">Department</label>
                                        <select
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            className="w-full px-4 py-2 bg-surface-800/50 border border-surface-700 rounded-lg text-white focus:outline-none focus:border-electric-500 transition-colors"
                                        >
                                            {departments.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-surface-300">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 bg-surface-800/50 border border-surface-700 rounded-lg text-white placeholder-surface-500 focus:outline-none focus:border-electric-500 transition-colors h-24 resize-none"
                                        placeholder="Brief description of the project..."
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-surface-600 text-surface-300 font-medium hover:bg-surface-700 transition-colors">
                                        Cancel
                                    </button>
                                    <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl bg-electric-600 text-white font-medium hover:bg-electric-500 transition-colors shadow-lg shadow-electric-600/20">
                                        Create Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}

export default CreateProjectModal
