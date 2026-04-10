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
import { useTheme } from "../themeFile/useTheme"

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
  const { theme, activePalette } = useTheme()
  const safePalette = activePalette || { primary: "#39FF14", secondary: "#8A2BE2" }

  const sidebarWidth = isCollapsed ? "w-20" : "w-64"

  const content = (
    <div className={`flex w-64 h-full flex-col backdrop-blur-xl border-r ${theme.headerBg} ${theme.border}`}>
      <div className="flex h-16 items-center px-4 justify-between h-20">
        <div className="flex items-center gap-3 overflow-hidden ml-2">
          <div 
            className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(to top right, ${safePalette.primary}, ${safePalette.secondary})`,
              boxShadow: `0 0 15px ${safePalette.primary}99`
            }}
          >
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
          className={`hidden md:flex ${theme.textSecondary} hover:${theme.textPrimary}`}
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
                    ? `${theme.textPrimary}` 
                    : `${theme.textSecondary} hover:opacity-80`
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-xl -z-10`}
                    style={{
                      backgroundColor: `${safePalette.primary}22`,
                      borderLeft: `4px solid ${safePalette.primary}`
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon 
                  className={cn("h-5 w-5 shrink-0 transition-all duration-300")} 
                  style={{ 
                    color: isActive ? safePalette.primary : undefined, 
                    filter: isActive ? `drop-shadow(0 0 8px ${safePalette.primary}CC)` : undefined 
                  }} 
                />
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

      <div className={`p-4 border-t ${theme.border}`}>
        <div className={cn("flex items-center gap-3 rounded-xl p-2 transition-all bg-black/5 dark:bg-white/5", isCollapsed ? "justify-center" : "")}>
          <div 
            className="h-9 w-9 rounded-full shrink-0" 
            style={{ background: `linear-gradient(to right, ${safePalette.primary}, ${safePalette.secondary})` }}
          />
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className={`text-sm font-medium truncate ${theme.textPrimary}`}>Alex Morgan</p>
              <p className={`text-xs truncate ${theme.textSecondary}`}>Pro Plan</p>
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
