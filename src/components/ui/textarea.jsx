import * as React from "react"
import { cn } from "../../lib/utils"
import { useTheme } from "../../themeFile/useTheme"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <textarea
      className={cn(
        `flex min-h-[80px] w-full rounded-lg px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${theme.headerBg} ${theme.border} ${theme.textPrimary} ${theme.placeholder}`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
