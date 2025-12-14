import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from './Header'

const ProtectedLayout = () => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default ProtectedLayout
