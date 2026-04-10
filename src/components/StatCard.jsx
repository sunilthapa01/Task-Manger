import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { cn } from "../lib/utils"
import { useTheme } from "../themeFile/useTheme"

export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {

  const { theme, mode, activePalette } = useTheme();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden transition-all duration-300">
        {/* Subtle background glow */}
        <div 
          className="absolute right-[-20px] top-[-20px] w-32 h-32 rounded-full opacity-20 blur-2xl transition-colors duration-500 pointer-events-none"
          style={{ backgroundColor: activePalette?.primary || "#39FF14" }}
        />

        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium ${theme.textSecondary}`}>{title}</h3>
            <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-500`} style={{ backgroundColor: `${activePalette?.primary || "#39FF14"}33` }}>
              <Icon className="h-5 w-5" style={{ color: activePalette?.primary || "#39FF14" }} />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`${theme.textPrimary} text-3xl font-bold tracking-tight`}>{value}</span>
            <span className={cn(
              "text-xs font-medium",
              trendUp ? "text-success" : "text-danger"
            )}>
              {trend}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
