import { motion } from 'framer-motion'
import { Bell, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const Notifications = () => {
    const notifications = [
        { id: 1, type: 'success', title: 'Run Completed', message: 'The "Payment Gateway Integration" run completed successfully.', time: '2 mins ago' },
        { id: 2, type: 'error', title: 'Run Failed', message: 'The "User Authentication Flow" run failed due to 3 errors.', time: '1 hour ago' },
        { id: 3, type: 'info', title: 'System Update', message: 'Scheduled maintenance is planned for this Sunday at 2 AM UTC.', time: '1 day ago' },
        { id: 4, type: 'warning', title: 'High Latency', message: 'Warning detected in "Search Functionality" API response times.', time: '2 days ago' },
    ]

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="w-5 h-5 text-emerald-400" />
            case 'error': return <XCircle className="w-5 h-5 text-red-400" />
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />
            default: return <Info className="w-5 h-5 text-electric-400" />
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-electric-500/10 border border-electric-500/20">
                        <Bell className="w-6 h-6 text-electric-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Notifications</h1>
                </div>
                <button className="text-sm text-surface-400 hover:text-white transition-colors">Mark all as read</button>
            </motion.div>

            <div className="space-y-4">
                {notifications.map((note, index) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-6 rounded-2xl border border-surface-700/50 hover:bg-surface-700/30 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                {getIcon(note.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-white group-hover:text-electric-400 transition-colors">{note.title}</h3>
                                    <span className="text-xs text-surface-500">{note.time}</span>
                                </div>
                                <p className="text-surface-400 text-sm">{note.message}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Notifications
