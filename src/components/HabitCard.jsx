import { useState } from "react"
import { Flame } from "lucide-react"
import { Card } from "./ui/card"
import { Switch } from "./ui/switch"
import { cn } from "../lib/utils"

export default function HabitCard({ name, streak, completed: initialCompleted }) {
  const [completed, setCompleted] = useState(initialCompleted)

  return (
    <Card className={cn(
      "transition-all duration-300",
      completed ? "border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]" : "border-transparent"
    )}>
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate mb-1 text-foreground">{name}</h4>
          <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-medium">
            <Flame className={cn("h-3.5 w-3.5", completed ? "text-warning" : "text-foreground/40")} />
            <span className={completed ? "text-warning shadow-warning/50" : ""}>
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
