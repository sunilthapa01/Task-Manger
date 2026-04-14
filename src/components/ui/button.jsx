import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"
import { useTheme } from "../../themeFile/useTheme"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, style, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const { activePalette } = useTheme()

  const safePalette = activePalette || { primary: "#39FF14", secondary: "#8A2BE2" }

  const dynamicStyles = {
    "--btn-primary": safePalette.primary,
    "--btn-secondary": safePalette.secondary,
    "--btn-glow": `${safePalette.primary}66`,
    "--btn-glow-hover": `${safePalette.primary}99`,
    "--btn-ghost-hover": `${safePalette.primary}1A`, // hex equivalent for 0.1 alpha
  }

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-[var(--btn-primary)] text-white font-semibold hover:brightness-110 shadow-[0_0_15px_var(--btn-glow)] hover:shadow-[0_0_25px_var(--btn-glow-hover)]": variant === "default",
          "bg-transparent border border-[var(--btn-primary)] text-[var(--btn-primary)] hover:bg-[var(--btn-ghost-hover)] hover:shadow-[0_0_15px_var(--btn-glow)]": variant === "outline",
          "hover:bg-[var(--btn-ghost-hover)] text-[var(--btn-primary)]": variant === "ghost",
          "h-9 px-4 py-2": size === "default",
          "h-8 rounded-md px-3 text-xs": size === "sm",
          "h-10 rounded-lg px-8": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className
      )}
      style={{ ...dynamicStyles, ...style }}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
