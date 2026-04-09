import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border",
        {
          "bg-primary/20 text-primary-light border-primary/30": variant === "default",
          "bg-danger-bg text-danger border-danger/30": variant === "destructive",
          "bg-success-bg text-success border-success/30": variant === "success",
          "bg-warning-bg text-warning border-warning/30": variant === "warning",
          "bg-black/5 text-foreground border-black/10": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
