import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutList, CheckCircle2, Zap, Flame, Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TaskCard from "../components/TaskCard";
import HabitCard from "../components/HabitCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const FormSelector = useSelector((item) => item.taskStore.taskData);
  const CountCompleted = FormSelector.filter(
    (e) => e.completed === true,
  ).length;
  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar isMobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 md:pl-20 transition-all duration-300">
        <Navbar setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full scroll-smooth">
          <motion.div
            className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {/* Welcome Section */}
            <motion.section
              variants={itemVariants}
              className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  Welcome back, Alex
                </motion.h2>
                <motion.p
                  className="text-foreground/60 text-sm md:text-base font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  Here is your daily productivity overview. Let's make it a
                  great day.
                </motion.p>
              </div>
              <Button
                className="shrink-0 gap-2"
                onClick={() => {
                  navigate("/tasks");
                }}
              >
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </motion.section>

            {/* Stats Grid */}
            <motion.section
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10"
            >
              <StatCard
                title="Total Tasks"
                value={FormSelector.length}
                icon={LayoutList}
                trend="+12%"
                trendUp={true}
              />
              <StatCard
                title="Completed"
                value={CountCompleted}
                icon={CheckCircle2}
                trend="+5%"
                trendUp={true}
              />
              <StatCard
                title="Productivity Score"
                value="92"
                icon={Zap}
                trend="-2%"
                trendUp={false}
              />
              <StatCard
                title="Current Streak"
                value="14 Days"
                icon={Flame}
                trend="+2 Days"
                trendUp={true}
              />
            </motion.section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column (Charts & Habits) */}
              <div className="xl:col-span-2 space-y-6 md:space-y-8">
                {/* Charts Area */}
                <motion.section
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-foreground/80">
                        Weekly Productivity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 md:h-64 flex flex-col justify-end gap-2 pb-6">
                      {/* Placeholder for Line Chart UI */}
                      <div className="flex items-end justify-between h-full w-full gap-2 px-2 mt-4 relative">
                        {/* Decorative Grid Lines */}
                        <div className="absolute inset-0 border-b border-dashed border-black/5 top-1/2 -z-10" />
                        <div className="absolute inset-0 border-b border-dashed border-black/5 top-1/4 -z-10" />

                        {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                          <div key={i} className="w-full relative group">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{
                                delay: 0.5 + i * 0.1,
                                duration: 0.8,
                                type: "spring",
                              }}
                              className="w-full bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm group-hover:from-primary/40 group-hover:to-primary transition-all cursor-pointer relative"
                            >
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-xs px-2 py-1 rounded hidden md:block">
                                {h}%
                              </div>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-foreground/80">
                        Task Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 md:h-64 flex items-center justify-center relative">
                      {/* Placeholder for Pie Chart UI */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-[16px] border-primary/20 flex items-center justify-center after:content-[''] after:absolute after:inset-[-16px] after:rounded-full after:border-[16px] after:border-t-primary after:border-r-primary after:border-b-accent after:border-l-transparent after:-rotate-45">
                        <div className="text-center">
                          <span className="block text-2xl font-bold">64%</span>
                          <span className="text-xs text-foreground/50 hidden sm:block">
                            Work
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.section>

                {/* Habit Tracker */}
                <motion.section
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold tracking-tight">
                      Habit Tracker
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary-light"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                    <HabitCard
                      name="Morning Workout"
                      streak={12}
                      completed={true}
                    />
                    <HabitCard
                      name="Reading (30 min)"
                      streak={4}
                      completed={false}
                    />
                    <HabitCard name="Meditate" streak={21} completed={true} />
                    <HabitCard
                      name="Drink Water (2L)"
                      streak={2}
                      completed={false}
                    />
                  </div>
                </motion.section>
              </div>

              {/* Right Column (Tasks) */}
              <motion.section
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative z-10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Today's Tasks
                  </h3>
                  <Badge
                    variant="outline"
                    className="px-2 font-normal text-foreground/70"
                  >
                    {CountCompleted} Remaining
                  </Badge>
                </div>

                <Card className="glass-panel border-black/5 bg-background/90 backdrop-blur-2xl p-1 overflow-hidden">
                  <div className="flex flex-col gap-1 md:gap-2">
                    {FormSelector.map((e) => (
                      <TaskCard
                        title={e.title}
                        description={e.description}
                        priority={e.priority}
                        date={e.dueDate}
                        completed={e.completed}
                        key={e.id}
                      />
                    ))}
                  </div>
                </Card>

                <Button className="w-full mt-4 bg-black/5 text-foreground hover:bg-primary/20 hover:text-primary border-dashed border border-black/10 hover:border-primary/50 shadow-none transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" /> View All Tasks
                </Button>
              </motion.section>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
