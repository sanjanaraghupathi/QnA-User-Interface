import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = () => {
        // Dummy login
        setUser({
            id: 1,
            name: 'John Smith',
            role: 'Risk Analyst',
            email: 'john.smith@company.com',
            department: 'Risk Management',
            avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10b981&color=fff' // Using ui-avatars for now or just initials
        })
    }

    const logout = () => {
        setUser(null)
    }

    const value = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
