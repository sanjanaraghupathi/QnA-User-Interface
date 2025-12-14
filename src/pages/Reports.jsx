import { motion } from 'framer-motion'
import { FileSearch, BarChart, PieChart, TrendingUp, Download } from 'lucide-react'

const Reports = () => {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <FileSearch className="w-6 h-6 text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-700 hover:bg-surface-600 text-white transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export All</span>
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass p-6 rounded-2xl border border-surface-700/50"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <BarChart className="w-5 h-5 text-electric-400" />
                        <h3 className="text-lg font-bold text-white">Test Coverage</h3>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">84%</div>
                    <p className="text-sm text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +2.4% from last week
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass p-6 rounded-2xl border border-surface-700/50"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <PieChart className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-white">Pass Rate</h3>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">92%</div>
                    <p className="text-sm text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +1.2% from last week
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass p-6 rounded-2xl border border-surface-700/50"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FileSearch className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white">Total Runs</h3>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">1,248</div>
                    <p className="text-sm text-surface-400">
                        Across 15 projects
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass p-8 rounded-3xl border border-surface-700/50 flex items-center justify-center min-h-[300px]"
            >
                <p className="text-surface-400">Detailed interactive charts would appear here.</p>
            </motion.div>
        </div>
    )
}

export default Reports
