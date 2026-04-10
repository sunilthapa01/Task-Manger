import * as React from "react"
import { cn } from "../../lib/utils"
import { useTheme } from "../../themeFile/useTheme"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const { theme } = useTheme()
  return (
    <input
      type={type}
      className={cn(
        `flex h-10 w-full rounded-lg px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${theme.headerBg} ${theme.border} ${theme.textPrimary} ${theme.placeholder}`,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
