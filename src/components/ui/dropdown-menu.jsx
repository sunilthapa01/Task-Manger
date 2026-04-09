import * as React from "react"
import { cn } from "../../lib/utils"

const DropdownMenu = ({ children }) => <div className="relative inline-block text-left">{children}</div>

const DropdownMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("inline-flex w-full justify-center", className)} {...props}>
    {children}
  </div>
))
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(({ className, align = "right", children, isOpen = false, ...props }, ref) => {
  if (!isOpen) return null; // Very basic mock
  
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 w-56 origin-top-right rounded-xl border border-black/5 bg-background/95 backdrop-blur-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in-80 zoom-in-95",
        align === "right" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      <div className="py-1">{children}</div>
    </div>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <a
    href="#"
    ref={ref}
    className={cn(
      "block px-4 py-2 text-sm text-foreground hover:bg-black/5 hover:text-slate-900 transition-colors duration-200 cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
  </a>
))
DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
