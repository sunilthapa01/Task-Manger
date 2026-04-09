import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { cn } from "../lib/utils"

export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {
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
      <Card className="relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground/60">{title}</h3>
            <div className="h-10 w-10 shrink-0 rounded-xl bg-black/5 flex items-center justify-center border border-black/5">
              <Icon className="h-5 w-5 text-foreground/80" />
            </div>
          </div>
          
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">{value}</span>
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
