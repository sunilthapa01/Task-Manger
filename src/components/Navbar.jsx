import { useState } from "react"
import { Search, Bell, Menu, User } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../themeFile/useTheme"

export default function Navbar({ setMobileOpen }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { theme, activePalette } = useTheme();
  
  const safePalette = activePalette || { primary: "#39FF14", secondary: "#8A2BE2" }

  const Logout = ()=> {
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <header className={`sticky top-0 z-30 flex h-20 w-full items-center justify-between px-4 md:px-8 border-b backdrop-blur-xl transition-colors duration-500 ${theme.headerBg} ${theme.border}`}>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileOpen(true)}
          className={`md:hidden ${theme.textSecondary} hover:${theme.textPrimary}`}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className={`hidden md:block text-xl font-semibold tracking-tight ${theme.textPrimary}`}>Dashboard</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 flex-1 justify-end">
        {/* Search */}
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <Input 
            type="text" 
            placeholder="Search tasks, habits..." 
            className={`pl-9 bg-black/5 dark:bg-white/5 border-transparent focus:bg-black/10 dark:focus:bg-white/10 ${theme.textPrimary}`}
          />
        </div>

        {/* Notifications */}
        <Button variant="outline" size="icon" className="relative shrink-0 rounded-full border-black/5 bg-black/5">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-danger"></span>
          </span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => setShowDropdown(!showDropdown)}>
            <div 
              className="h-9 w-9 rounded-full p-0.5 cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ background: `linear-gradient(to bottom right, ${safePalette.primary}, ${safePalette.secondary})` }}
            >
              <div className={`flex h-full w-full items-center justify-center rounded-full ${theme.cardBg}`}>
                <User className={`h-4 w-4 ${theme.textSecondary}`} />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent isOpen={showDropdown} align="right">
            <DropdownMenuItem onClick={()=> {
              navigate('/theme')
            }}>Theme</DropdownMenuItem>
            <DropdownMenuItem onClick={Logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
