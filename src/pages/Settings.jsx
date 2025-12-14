import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell, Shield, User, Monitor } from 'lucide-react'

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
            >
                <div className="p-2 rounded-xl bg-surface-700/50 border border-surface-600">
                    <SettingsIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
            </motion.div>

            <div className="space-y-4">
                <SettingSection title="Account" icon={User}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                            <div>
                                <p className="text-white font-medium">Profile Information</p>
                                <p className="text-sm text-surface-400">Update your photo and personal details</p>
                            </div>
                            <button className="text-electric-400 hover:text-electric-300 text-sm font-medium">Edit</button>
                        </div>
                    </div>
                </SettingSection>

                <SettingSection title="Notifications" icon={Bell}>
                    <div className="space-y-4">
                        <Toggle label="Email Notifications" description="Receive updates via email" />
                        <Toggle label="Push Notifications" description="Receive updates in browser" defaultChecked />
                    </div>
                </SettingSection>

                <SettingSection title="Security" icon={Shield}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
                            <div>
                                <p className="text-white font-medium">Password</p>
                                <p className="text-sm text-surface-400">Last changed 3 months ago</p>
                            </div>
                            <button className="text-electric-400 hover:text-electric-300 text-sm font-medium">Change</button>
                        </div>
                        <Toggle label="Two-Factor Authentication" description="Add an extra layer of security" />
                    </div>
                </SettingSection>

                <SettingSection title="Display" icon={Monitor}>
                    <div className="space-y-4">
                        <Toggle label="Dark Mode" description="Use dark theme" defaultChecked />
                    </div>
                </SettingSection>
            </div>
        </div>
    )
}

const SettingSection = ({ title, icon: Icon, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl border border-surface-700/50"
    >
        <div className="flex items-center gap-2 mb-6 text-xl font-bold text-white">
            <Icon className="w-5 h-5 text-surface-400" />
            {title}
        </div>
        {children}
    </motion.div>
)

const Toggle = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-surface-800/50">
        <div>
            <p className="text-white font-medium">{label}</p>
            <p className="text-sm text-surface-400">{description}</p>
        </div>
        <div className={`w-12 h-6 rounded-full relative transition-colors ${defaultChecked ? 'bg-electric-500' : 'bg-surface-600'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${defaultChecked ? 'left-7' : 'left-1'}`} />
        </div>
    </div>
)

export default Settings
