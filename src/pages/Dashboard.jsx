import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutList, CheckCircle2, Zap, Flame, Plus, Bell } from "lucide-react";

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
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../themeFile/useTheme";
import { fetchTasks, clearNotifications } from "../redux/slice/taskSlice";

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
  const dispatch = useDispatch();
  const FormSelector = useSelector((item) => item.taskStore.taskData);

  const [userData, setUserData] = useState(null);

  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
      navigate("/login");
    } else {
      setUserData(user);
    }
    console.log(user);
    
    dispatch(fetchTasks());
  }, [dispatch, navigate]);
  
  const { theme,activePalette } = useTheme();


  const searchQuery = useSelector((state) => state.taskStore.searchQuery);
  const notifications = useSelector((state) => state.taskStore.notifications);

  const filteredTasks = FormSelector.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const completedTasks = FormSelector.filter((e) => e.completed === true);
  const totalTasks = FormSelector.length;
  
  // Productivity Score Calculation
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  // Streak Calculation (Simplified based on dueDate)
  const getStreak = () => {
    if (completedTasks.length === 0) return 0;
    
    const dates = completedTasks
      .map(t => t.dueDate)
      .filter(d => d)
      .map(d => new Date(d).toDateString());
    
    const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
    
    let streak = 0;
    let today = new Date();
    today.setHours(0,0,0,0);
    
    // Check if the latest completion was today or yesterday
    const latestDate = new Date(uniqueDates[0]);
    const diffDays = Math.floor((today - latestDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) return 0; // Streak broken

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const d1 = new Date(uniqueDates[i]);
      const d2 = new Date(uniqueDates[i+1]);
      const diff = Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
      
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak + 1;
  };

  const currentStreak = getStreak();

  // Weekly Productivity Data Preparation
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toDateString());
    }
    return days;
  };

  const weeklyData = getLast7Days().map(date => {
    const count = completedTasks.filter(t => new Date(t.dueDate).toDateString() === date).length;
    return { date, count };
  });

  const maxWeeklyCount = Math.max(...weeklyData.map(d => d.count), 1);

  // Distribution Data
  const categories = ["work", "personal", "learning"];
  const distributionData = categories.map(cat => {
    const count = FormSelector.filter(t => t.category === cat).length;
    const percentage = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
    return { category: cat, percentage };
  });

  const CountCompleted = completedTasks.length;
  return (
    <div className={`${theme.bg} flex min-h-screen w-full relative overflow-hidden`}>
      {/* GLOBALLY INJECTED THEME PALETTE BLOBS */}
      <motion.div
        animate={{ backgroundColor: activePalette?.primary || "#39FF14" }}
        transition={{ duration: 1 }}
        className="fixed top-[-10%] sm:top-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-10 sm:opacity-15 rounded-full blur-[100px] sm:blur-[150px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ backgroundColor: activePalette?.secondary || "#8A2BE2" }}
        transition={{ duration: 1 }}
        className="fixed bottom-[-10%] sm:bottom-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-10 sm:opacity-15 rounded-full blur-[90px] sm:blur-[120px] -z-10 pointer-events-none"
      />

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
                  className={`${theme.textPrimary} text-3xl md:text-4xl font-bold tracking-tight mb-2`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  Welcome back, {userData?.name || "User"}
                </motion.h2>
                <motion.p
                  className={`${theme.textSecondary} text-sm md:text-base font-medium`}
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

            {/* Notification Bar */}
            {notifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`relative z-10 px-6 py-3 rounded-2xl border flex items-center gap-3 ${theme.headerBg} ${theme.border} shadow-sm overflow-hidden group`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${theme.textPrimary} truncate`}>
                    {notifications[0].text}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs opacity-50 hover:opacity-100"
                  onClick={() => dispatch(clearNotifications())}
                >
                  Dismiss
                </Button>
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-primary/30" 
                  style={{ width: '100%' }}
                />
              </motion.div>
            )}

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
                value={`${productivityScore}%`}
                icon={Zap}
                trend="+3%"
                trendUp={true}
              />
              <StatCard
                title="Current Streak"
                value={`${currentStreak} Days`}
                icon={Flame}
                trend="+1 Day"
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
                  <Card className={`${theme.cardBg} ${theme.border} ${theme.shadow}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base font-medium ${theme.textSecondary}`}>
                        Weekly Productivity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 md:h-64 flex flex-col justify-end gap-2 pb-6">
                      {/* Placeholder for Line Chart UI */}
                      <div className="flex items-end justify-between h-full w-full gap-2 px-2 mt-4 relative">
                        {/* Decorative Grid Lines */}
                        <div className={`absolute inset-0 border-b border-dashed ${theme.border} top-1/2 -z-10`} />
                        <div className={`absolute inset-0 border-b border-dashed ${theme.border} top-1/4 -z-10`} />

                        {[ ...weeklyData ].map((d, i) => {
                          const h = (d.count / maxWeeklyCount) * 100;
                          return (
                            <div key={i} className="w-full relative group">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.max(h, 5)}%`, backgroundColor: `${activePalette?.primary || "#39FF14"}CC` }}
                                whileHover={{ backgroundColor: activePalette?.primary || "#39FF14", scaleY: 1.05 }}
                                transition={{
                                  delay: 0.5 + i * 0.1,
                                  duration: 0.8,
                                  type: "spring",
                                }}
                                className="w-full rounded-t-sm transition-all cursor-pointer relative"
                              >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded-md hidden md:block whitespace-nowrap z-20">
                                  {d.count} tasks on {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' })}
                                </div>
                              </motion.div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${theme.cardBg} ${theme.border} ${theme.shadow}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`text-base font-medium ${theme.textSecondary}`}>
                        Task Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 md:h-64 flex items-center justify-center relative">
                      {/* Placeholder for Pie Chart UI */}
                      <motion.div 
                        animate={{ borderColor: `${activePalette?.primary || "#39FF14"}33` }}
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-[16px] flex items-center justify-center after:content-[''] after:absolute after:inset-[-16px] after:rounded-full after:border-[16px] after:border-l-transparent after:-rotate-45"
                        style={{ borderTopColor: activePalette?.primary || "#39FF14", borderRightColor: activePalette?.primary || "#39FF14", borderBottomColor: activePalette?.secondary || "#8A2BE2" }}
                      >
                        <div className="text-center">
                          <span className="block text-2xl font-bold">{distributionData[0].percentage}%</span>
                          <span className={`${theme.textSecondary} text-xs hidden sm:block capitalize`}>
                            {distributionData[0].category}
                          </span>
                        </div>
                      </motion.div>
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
                    <h3 className={`text-lg font-semibold tracking-tight ${theme.textPrimary}`}>
                      Habit Tracker
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm font-medium transition-colors"
                      style={{ color: activePalette?.primary || "#39FF14" }}
                    >
                      View All
                    </motion.button>
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
                  <h3 className={`text-lg font-semibold tracking-tight ${theme.textPrimary}`}>
                    Today's Tasks
                  </h3>
                  <Badge
                    variant="outline"
                    className={`px-2 font-normal ${theme.textSecondary}`}
                  >
                    {CountCompleted} Remaining
                  </Badge>
                </div>

                <Card className={`glass-panel p-1 overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.border} ${theme.shadow}`}>
                  <div className="flex flex-col gap-1 md:gap-2">
                    {filteredTasks.length === 0 ? (
                      <div className={`p-8 text-center ${theme.textSecondary}`}>No tasks found matching your search.</div>
                    ) : (
                      filteredTasks.map((e) => (
                        <TaskCard
                          title={e.title}
                          description={e.description}
                          priority={e.priority}
                          date={e.dueDate}
                          completed={e.completed}
                          key={e.id}
                        />
                      ))
                    )}
                  </div>
                </Card>

                <motion.button 
                  className={`w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 ${theme.headerBg} ${theme.textPrimary} bg-transparent border border-dashed shadow-none`}
                  initial={{ borderColor: theme.border }}
                  whileHover={{ 
                    backgroundColor: `${activePalette?.primary || "#39FF14"}22`, 
                    color: activePalette?.primary || "#39FF14", 
                    borderColor: activePalette?.primary || "#39FF14" 
                  }}
                >
                  <Plus className="h-4 w-4" /> View All Tasks
                </motion.button>
              </motion.section>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
