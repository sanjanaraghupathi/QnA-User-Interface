import { motion } from 'framer-motion'
import { User, Mail, Building, Shield, Clock, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    const { user } = useAuth()

    if (!user) return null

    // Dummy run history data
    const runHistory = [
        { id: 101, project: "Payment Gateway Integration", date: "2024-03-10", status: "Passed", duration: "12m 30s", coverage: "94%" },
        { id: 102, project: "User Authentication Flow", date: "2024-03-09", status: "Failed", duration: "4m 15s", coverage: "67%" },
        { id: 103, project: "Cart Checkout Module", date: "2024-03-08", status: "Passed", duration: "8m 45s", coverage: "89%" },
        { id: 104, project: "API Rate Limiting", date: "2024-03-05", status: "Warning", duration: "15m 10s", coverage: "78%" },
        { id: 105, project: "Search Functionality", date: "2024-03-01", status: "Passed", duration: "5m 20s", coverage: "92%" },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case 'Passed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            case 'Failed': return 'text-red-400 bg-red-500/10 border-red-500/20'
            case 'Warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            default: return 'text-surface-400 bg-surface-500/10 border-surface-500/20'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Passed': return <CheckCircle className="w-4 h-4" />
            case 'Failed': return <XCircle className="w-4 h-4" />
            case 'Warning': return <AlertTriangle className="w-4 h-4" />
            default: return <Clock className="w-4 h-4" />
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-3xl border border-surface-700/50"
            >
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/20 text-4xl text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="px-3 py-1 rounded-full bg-surface-700/50 border border-surface-600 text-sm text-surface-200 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-electric-400" />
                                    {user.role}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-surface-700/50 border border-surface-600 text-sm text-surface-200 flex items-center gap-2">
                                    <Building className="w-4 h-4 text-purple-400" />
                                    {user.department}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-surface-700/50 border border-surface-600 text-sm text-surface-200 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-emerald-400" />
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Run History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass p-8 rounded-3xl border border-surface-700/50"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <Clock className="w-5 h-5 text-electric-400" />
                        Recent Run History
                    </h2>
                    <button className="text-sm text-electric-400 hover:text-electric-300 transition-colors">
                        View All History
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-surface-700">
                                <th className="text-left py-4 px-4 text-sm font-medium text-surface-400">Project Name</th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-surface-400">Date</th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-surface-400">Duration</th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-surface-400">Coverage</th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-surface-400">Status</th>
                                <th className="text-right py-4 px-4 text-sm font-medium text-surface-400">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-700">
                            {runHistory.map((run) => (
                                <tr key={run.id} className="group hover:bg-surface-700/30 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-surface-800 text-surface-300 group-hover:text-electric-400 transition-colors">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-surface-200">{run.project}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-surface-400 text-sm">{run.date}</td>
                                    <td className="py-4 px-4 text-surface-400 text-sm">{run.duration}</td>
                                    <td className="py-4 px-4">
                                        <div className="w-24 h-2 bg-surface-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-electric-500 rounded-full"
                                                style={{ width: run.coverage }}
                                            />
                                        </div>
                                        <span className="text-xs text-surface-400 mt-1 block">{run.coverage}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(run.status)}`}>
                                            {getStatusIcon(run.status)}
                                            {run.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <Link
                                            to={`/history/${run.id}`}
                                            className="text-sm text-surface-400 hover:text-electric-400 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    )
}

export default UserProfile
