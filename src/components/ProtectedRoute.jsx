import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  // Simple check for our dummy auth state
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children ? children : <Outlet />
}
