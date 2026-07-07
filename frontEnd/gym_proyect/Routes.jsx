import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./src/components/nav-bar/NavBar";

export function PublicRoute(){
    return (
        <div className="app-shell">
            <NavBar />
            <main className="page-content">
                <Outlet />
            </main>
        </div>
    )
}

export function PrivateRoute(){
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to='/auth/login' />
    
    return (
        <div className="app-shell">
            <NavBar />
            <Outlet />
        </div>
    )
}

export function AdminRoute(){
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token) return <Navigate to='/auth/login' />
    if (role !== 'ADMIN') return <Navigate to='/home' />
    
    return (
        <div className="app-shell">
            <NavBar />
            <Outlet />
        </div>
    )
}