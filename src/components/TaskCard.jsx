import { useState } from "react"
import { Calendar, MoreVertical } from "lucide-react"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Switch } from "./ui/switch"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { useTheme } from "../themeFile/useTheme"

export default function TaskCard({ title, priority, date, completed: initialCompleted ,description}) {
  const [completed, setCompleted] = useState(initialCompleted)
  const { theme } = useTheme()

  const priorityConfig = {
    High: { variant: "destructive" },
    Medium: { variant: "warning" },
    Low: { variant: "success" }
  }

  return (
    <Card className={cn(
      "transition-all duration-300", theme.cardBg, theme.border, theme.shadow,
      completed ? "opacity-60 grayscale-[0.5]" : ""
    )}>
      <div className="flex items-center gap-4 p-4">
        <Switch checked={completed} onCheckedChange={setCompleted} />
        
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "text-sm font-medium truncate transition-all duration-300",
            completed ? "line-through opacity-50" : "", theme.textPrimary
          )}>
            {title}
          </h4>
          <div className="flex items-center gap-3 mt-1.5 opacity-80">
            <Badge variant={priorityConfig[priority]?.variant || "default"}>
              {priority}
            </Badge>
            <div className={`flex items-center gap-1.5 text-xs ${theme.textSecondary}`}>
              <Calendar className="h-3.5 w-3.5" />
              <span>{date}</span>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className={`shrink-0 ${theme.textSecondary} hover:${theme.textPrimary}`}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
