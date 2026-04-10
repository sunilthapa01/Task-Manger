import * as React from "react"
import { cn } from "../../lib/utils"
import { useTheme } from "../../themeFile/useTheme"

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <select
      className={cn(
        `flex h-10 w-full appearance-none rounded-lg px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${theme.headerBg} ${theme.border} ${theme.textPrimary}`,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})
Select.displayName = "Select"

export { Select }
