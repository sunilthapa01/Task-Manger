import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { useTheme } from "../themeFile/useTheme"

export default function NotFound() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden ${theme.bg}`}>
      {/* Decorative neon background elements */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-destructive/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

      <motion.div 
        className="text-center max-w-lg z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="relative inline-block mb-8"
        >
          <div className="text-[150px] font-black leading-none text-primary drop-shadow-sm">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-xl -z-10 rounded-full"></div>
        </motion.div>

        <h1 className={`text-3xl font-bold tracking-tight mb-4 ${theme.textPrimary}`}>Page Not Found</h1>
        <p className={`mb-10 text-lg ${theme.textSecondary}`}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto rounded-full border-black/10 hover:bg-black/5"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
          <Button 
            onClick={() => navigate("/dashboard")} 
            size="lg"
            className="w-full sm:w-auto rounded-full shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.4)] transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
