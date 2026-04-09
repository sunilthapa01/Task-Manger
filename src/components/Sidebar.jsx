import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  CheckSquare, 
  Target, 
  TrendingUp, 
  PieChart, 
  Settings,
  ChevronLeft,
  Menu
} from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: Target, label: "Habits", path: "/habits" },
  { icon: TrendingUp, label: "Goals", path: "/goals" },
  { icon: PieChart, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
]

export default function Sidebar({ isMobileOpen, setMobileOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  const sidebarWidth = isCollapsed ? "w-20" : "w-64"

  const content = (
    <div className="flex w-64 h-full flex-col bg-background/90 backdrop-blur-xl border-r border-black/5">
      <div className="flex h-16 items-center px-4 justify-between h-20">
        <div className="flex items-center gap-3 overflow-hidden ml-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#39FF14] via-[#00FF00] to-[#03ff00] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(57,255,20,0.6)]">
            <LayoutDashboard className="h-4 w-4 text-black" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-lg tracking-tight whitespace-nowrap"
              >
                TaskFlow
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex text-foreground/50 hover:text-foreground"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        {navItems.map((item, index) => {
          const isActive = currentPath === item.path
          return (
            <motion.div
               key={item.label}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path || "#"}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200 group relative",
                  isActive 
                    ? "text-slate-900 bg-black/5" 
                    : "text-foreground/60 hover:text-foreground hover:bg-black/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl border border-black/5 bg-black/5 -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={cn("h-5 w-5 shrink-0 transition-all duration-300", isActive && "text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]")} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="p-4 border-t border-black/5">
        <div className={cn("flex items-center gap-3 rounded-xl bg-black/5 p-2 transition-all", isCollapsed ? "justify-center" : "")}>
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shrink-0" />
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-800 truncate">Alex Morgan</p>
              <p className="text-xs text-foreground/50 truncate">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="hidden md:block fixed left-0 top-0 z-40 h-screen transition-all duration-300 pointer-events-auto"
      >
        {content}
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-white/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed left-0 top-0 z-50 h-screen w-64 md:hidden pointer-events-auto"
          >
            {content}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
