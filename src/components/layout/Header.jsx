import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileSearch,
  Bell,
  Settings,
  User,
  Sparkles,
  LogIn
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'


const Header = () => {
  const { user } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-700/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-purple-600 flex items-center justify-center shadow-lg shadow-electric-500/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="font-heading font-bold text-xl text-white group-hover:text-electric-400 transition-colors">
                QnA
              </h1>
              <p className="text-[10px] text-surface-400 -mt-1 tracking-wider uppercase">
                Quality Assurance
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" active={isHome}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Projects</span>
            </NavLink>
            <NavLink to="/reports" active={location.pathname === '/reports'}>
              <FileSearch className="w-4 h-4" />
              <span>Reports</span>
            </NavLink>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Link to="/notifications">
              <motion.button
                className="relative p-2 rounded-lg hover:bg-surface-700/50 text-surface-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-electric-500 rounded-full animate-pulse" />
              </motion.button>
            </Link>

            {/* Settings */}
            <Link to="/settings">
              <motion.button
                className="p-2 rounded-lg hover:bg-surface-700/50 text-surface-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </Link>

            {/* Divider */}
            <div className="w-px h-8 bg-surface-700 mx-2" />

            {/* User Profile or Login */}
            {user ? (
              <Link to="/profile">
                <motion.button
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-surface-700/50 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center relative overflow-hidden">
                    {user.avatar && !user.avatar.includes('ui-avatars') ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-xs">{user.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-white group-hover:text-electric-400 transition-colors">{user.name}</p>
                    <p className="text-xs text-surface-400">{user.role}</p>
                  </div>
                </motion.button>
              </Link>
            ) : (
              <Link to="/login">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-700/50 hover:bg-surface-700 text-white transition-colors border border-surface-600 hover:border-surface-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const NavLink = ({ to, active, children }) => {
  return (
    <Link to={to}>
      <motion.div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
          ? 'bg-electric-500/10 text-electric-400'
          : 'text-surface-400 hover:text-white hover:bg-surface-700/50'
          }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    </Link>
  )
}

export default Header

