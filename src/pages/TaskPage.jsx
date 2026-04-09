import React, { useState } from "react"
import { ClipboardList } from "lucide-react"
import TaskForm from "../components/TaskForm"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function TaskPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar isMobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 md:pl-20 transition-all duration-300">
        <Navbar setMobileOpen={setMobileOpen} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full scroll-smooth">
          <div className="p-4 md:p-8 w-full max-w-4xl mx-auto space-y-8 pb-20 mt-6 md:mt-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.5)] border border-primary/20">
                <ClipboardList className="h-5 w-5 text-black" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Create Task
              </h1>
            </div>
            
            <TaskForm />
          </div>
        </main>
      </div>
    </div>
  )
}
