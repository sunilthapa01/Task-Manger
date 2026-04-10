import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TaskPage from "./pages/TaskPage"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import ThemePage from "./pages/ThemePage"

function App() {
  return (
    <>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        toastClassName="!bg-[#f8f9fa] !text-slate-800 !border !border-black/5 !shadow-[0_4px_20px_rgba(0,0,0,0.05)] !rounded-xl"
        progressClassName="!bg-[#39FF14]"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/theme" element={<ProtectedRoute><ThemePage /></ProtectedRoute>} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
