import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Mail, Lock, ArrowRight, Command } from "lucide-react"

import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"


export default function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      
      {/* Decorative neon background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[90px] -z-10 mix-blend-screen pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Card className="glass-panel border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center mb-4"
              >
                <Lock className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2">Welcome Back</h1>
              <p className="text-sm text-foreground/60">Enter your credentials to access the dashboard</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault()
              localStorage.setItem("isAuthenticated", "true")
              toast.success("Successfully logged in!")
              setTimeout(() => {
                navigate("/dashboard")
              }, 1200)
            }}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 bg-black/5 border-black/5 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300"
                    defaultValue="demo@taskflow.inc"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground/80">Password</label>
                  <a href="#" className="text-xs text-primary hover:text-primary-light transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 bg-black/5 border-black/5 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300"
                    defaultValue="password123"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full mt-6 transition-all duration-300 rounded-lg group"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-black/10"></div>
              <span className="text-xs text-foreground/40 font-medium px-2">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-black/10"></div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-6 transition-all duration-300"
            >
              <Command className="w-4 h-4 mr-2" />
              SSO Login
            </Button>

            <p className="text-center text-sm text-foreground/60 mt-8">
              Don't have an account? <span onClick={() => navigate("/signup")} className="text-primary hover:text-primary-light transition-colors font-medium cursor-pointer">Sign up</span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
