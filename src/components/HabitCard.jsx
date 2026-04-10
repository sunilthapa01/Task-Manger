import { useState } from "react"
import { Flame } from "lucide-react"
import { Card } from "./ui/card"
import { Switch } from "./ui/switch"
import { cn } from "../lib/utils"
import { useTheme } from "../themeFile/useTheme"

export default function HabitCard({ name, streak, completed: initialCompleted }) {
  const [completed, setCompleted] = useState(initialCompleted)
  const { theme, activePalette } = useTheme()

  return (
    <Card 
      className={cn("transition-all duration-300 relative overflow-hidden", theme.cardBg, theme.border, theme.shadow)}
      style={{ 
        borderColor: completed ? (activePalette?.primary || "#39FF14") : undefined,
        boxShadow: completed ? `0 0 20px ${activePalette?.primary || "#39FF14"}4D, inset 0 0 10px ${activePalette?.primary || "#39FF14"}22` : undefined
      }}
    >
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium truncate mb-1 transition-colors duration-300`} style={{ color: completed ? (activePalette?.primary || "#39FF14") : undefined }}>{name}</h4>
          <div className={`flex items-center gap-1.5 text-xs font-medium ${theme.textSecondary}`}>
            <Flame className={cn("h-3.5 w-3.5 transition-colors duration-300", completed ? "" : "opacity-40")} style={{ color: completed ? (activePalette?.primary || "#39FF14") : undefined }} />
            <span className={cn("transition-shadow duration-300")} style={{ color: completed ? (activePalette?.primary || "#39FF14") : undefined, textShadow: completed ? `0 0 8px ${activePalette?.primary || "#39FF14"}80` : undefined }}>
              {completed ? streak + 1 : streak} Day Streak
            </span>
          </div>
        </div>
        <div className="shrink-0 scale-90 sm:scale-100">
          <Switch checked={completed} onCheckedChange={setCompleted} />
        </div>
      </div>
    </Card>
  )
}
