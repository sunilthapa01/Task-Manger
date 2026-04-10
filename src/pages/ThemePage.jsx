import { motion } from "framer-motion";
import { useState } from "react";
import {
  Palette,
  Moon,
  Sun,
  Monitor,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setPalette } from "../redux/slice/themeSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const colorPalettes = [
  {
    id: "neon",
    name: "Neon Cyber",
    primary: "#39FF14",
    secondary: "#8A2BE2",
    bg: "#0A0A0A",
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    primary: "#00B4D8",
    secondary: "#03045E",
    bg: "#F8F9FA",
  },
  {
    id: "sunset",
    name: "Desert Sunset",
    primary: "#FF7B00",
    secondary: "#9D0208",
    bg: "#1A0B0C",
  },
  {
    id: "forest",
    name: "Enchanted Forest",
    primary: "#2D6A4F",
    secondary: "#1B4332",
    bg: "#E9ECEF",
  },
  {
    id: "lavender",
    name: "Lavender Dream",
    primary: "#C77DFF",
    secondary: "#5A189A",
    bg: "#10002B",
  },
];

import { useTheme } from "../themeFile/useTheme";

export default function ThemePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme, mode: currentTheme, themeValue } = useTheme();

  // Local state for color palettes and visual blobs
  const [activePalette, setActivePalette] = useState(colorPalettes[0]);

  const handleApplyChanges = () => {
    dispatch(setTheme(themeValue));
    dispatch(setPalette(activePalette));
    setTimeout(() => {
      navigate("/dashboard");
      toast.success("Theme Applied Successfully!");
    }, 600);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className={`min-h-screen w-full relative flex flex-col items-center p-6 md:p-12 transition-colors duration-500 ${theme.bg} ${theme.textPrimary}`}>

      {/* Dynamic Background Elements - Visual flair matching selected palette */}
      <motion.div
        animate={{ backgroundColor: activePalette.primary }}
        transition={{ duration: 1 }}
        className="absolute top-[-10%] sm:top-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-20 rounded-full blur-[100px] sm:blur-[150px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ backgroundColor: activePalette.secondary }}
        transition={{ duration: 1 }}
        className="absolute bottom-[-10%] sm:bottom-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-20 rounded-full blur-[90px] sm:blur-[120px] -z-10 pointer-events-none"
      />

      <div className="w-full max-w-5xl z-10 flex flex-col gap-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl backdrop-blur-md transition-colors duration-500 ${theme.headerBg} ${theme.border} ${theme.shadow}`}
        >
          <div>
            <h1 className={`text-3xl font-extrabold tracking-tight flex items-center gap-3 ${theme.textPrimary}`}>
              <Palette className="w-8 h-8 text-primary" />
              Appearance
            </h1>
            <p className={`mt-1 font-medium ${theme.textSecondary}`}>
              Customize your workspace experience.
            </p>
          </div>
          <Button
            onClick={handleApplyChanges}
            className="rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
            Apply Changes
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Controls Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 flex flex-col gap-6"
          >
            {/* Mode Selection */}
            <motion.div variants={itemVariants}>
              <Card className={`rounded-2xl transition-all duration-500 ${theme.cardBg} ${theme.border} ${theme.shadow}`}>
                <CardHeader className={`pb-3 border-b ${theme.border} ${theme.headerBg}`}>
                  <CardTitle className={`text-lg flex items-center gap-2 ${theme.textPrimary}`}>
                    <Monitor className="w-5 h-5 text-primary" />
                    Theme Mode
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {[
                    { id: "light", icon: Sun, label: "Light Mode" },
                    { id: "dark", icon: Moon, label: "Dark Mode" },
                    { id: "system", icon: Monitor, label: "System Theme" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => dispatch(setTheme(mode.id))}
                      className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${themeValue === mode.id
                          ? `bg-primary/10 ${theme.border} text-primary shadow-md scale-[1.02]`
                          : `bg-transparent ${theme.border} hover:bg-black/5 ${theme.textSecondary} hover:scale-[1.01]`
                        }`}
                    >
                      <mode.icon className={`w-5 h-5 mr-3 ${themeValue === mode.id ? "text-primary" : theme.textSecondary}`} />
                      <span className="font-semibold px-2">{mode.label}</span>
                      {themeValue === mode.id && (
                        <motion.div layoutId="modeCheck" className="ml-auto">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Accent Color Selection */}
            <motion.div variants={itemVariants}>
              <Card className={`rounded-2xl transition-all duration-500 ${theme.cardBg} ${theme.border} ${theme.shadow}`}>
                <CardHeader className={`pb-3 border-b ${theme.border} ${theme.headerBg}`}>
                  <CardTitle className={`text-lg flex items-center gap-2 ${theme.textPrimary}`}>
                    <Palette className="w-5 h-5 text-primary" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {colorPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => setActivePalette(palette)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${activePalette.id === palette.id
                          ? `bg-primary/10 ${theme.border} text-primary shadow-md scale-[1.02]`
                          : `bg-transparent ${theme.border} hover:bg-black/5 hover:scale-[1.01]`
                        }`}
                    >
                      <span className={`font-semibold ${activePalette.id === palette.id ? "text-primary" : theme.textPrimary}`}>
                        {palette.name}
                      </span>
                      <div className={`flex gap-1.5 p-1 rounded-full bg-white/10 ${theme.border} shadow-sm`}>
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: palette.primary }}></div>
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: palette.secondary }}></div>
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: palette.bg, border: "1px solid rgba(128,128,128,0.3)" }}></div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Real-time Preview Pane */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="lg:col-span-2 relative"
          >
            <div className="sticky top-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${theme.textPrimary}`}>
                  <SlidersHorizontal className="w-5 h-5" /> Live Preview
                </h2>
                <div className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full animate-pulse">
                  Interactive
                </div>
              </div>

              {/* Fake App Canvas */}
              <motion.div
                className="w-full aspect-[4/3] rounded-3xl border-4 shadow-2xl overflow-hidden relative flex flex-col"
                animate={{
                  backgroundColor: currentTheme === "dark" ? "#0f172a" : "#ffffff",
                  borderColor: currentTheme === "dark" ? "#1e293b" : "#f1f5f9",
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Fake App Header */}
                <motion.div
                  animate={{ backgroundColor: currentTheme === "dark" ? "#1e293b" : "#f8f9fa" }}
                  className="h-16 border-b border-black/5 flex items-center justify-between px-6 z-10"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ backgroundColor: activePalette.primary }}
                      className="w-8 h-8 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
                    >
                      T
                    </motion.div>
                    <motion.div
                      className="w-32 h-4 rounded-full"
                      animate={{ backgroundColor: currentTheme === "dark" ? "#334155" : "#e2e8f0" }}
                    />
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full"
                        animate={{ backgroundColor: currentTheme === "dark" ? "#334155" : "#e2e8f0" }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Fake App Body */}
                <div className="flex-1 p-6 flex gap-6 overflow-hidden">
                  {/* Fake Sidebar */}
                  <motion.div className="w-48 hidden sm:flex flex-col gap-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className="h-10 rounded-xl"
                        animate={{
                          backgroundColor:
                            i === 2
                              ? currentTheme === "dark" ? `${activePalette.primary}33` : `${activePalette.primary}22`
                              : currentTheme === "dark" ? "#1e293b" : "#f8f9fa",
                          color: i === 2 ? activePalette.primary : "inherit",
                        }}
                        style={{ borderLeft: i === 2 ? `4px solid ${activePalette.primary}` : "none" }}
                      />
                    ))}
                  </motion.div>

                  {/* Fake Content Area */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* Fake Metrics Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      {["primary", "secondary"].map((col, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="h-28 rounded-2xl p-4 shadow-sm relative overflow-hidden"
                          animate={{
                            backgroundColor: currentTheme === "dark" ? "#1e293b" : "#ffffff",
                            border: `1px solid ${currentTheme === "dark" ? "#334155" : "#f1f5f9"}`,
                          }}
                        >
                          <motion.div
                            className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full opacity-20"
                            animate={{ backgroundColor: activePalette[col] }}
                          />
                          <motion.div
                            className="w-10 h-10 rounded-xl mb-3"
                            animate={{ backgroundColor: `${activePalette[col]}33` }}
                          />
                          <motion.div
                            className="w-1/2 h-3 rounded-full mb-2"
                            animate={{ backgroundColor: currentTheme === "dark" ? "#475569" : "#cbd5e1" }}
                          />
                          <motion.div
                            className="w-1/3 h-5 rounded-full"
                            animate={{ backgroundColor: currentTheme === "dark" ? "#94a3b8" : "#334155" }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Fake Chart / List Area */}
                    <motion.div
                      className="flex-1 rounded-2xl p-5 shadow-sm border"
                      animate={{
                        backgroundColor: currentTheme === "dark" ? "#1e293b" : "#ffffff",
                        borderColor: currentTheme === "dark" ? "#334155" : "#f1f5f9",
                      }}
                    >
                      <motion.div
                        className="w-1/3 h-4 rounded-full mb-6"
                        animate={{ backgroundColor: currentTheme === "dark" ? "#475569" : "#cbd5e1" }}
                      />

                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center gap-4">
                            <motion.div
                              className="w-3 h-3 rounded-full"
                              animate={{ backgroundColor: activePalette.primary }}
                            />
                            <div className="flex-1">
                              <motion.div
                                className="w-full h-2 rounded-full mb-2"
                                animate={{ backgroundColor: currentTheme === "dark" ? "#334155" : "#f1f5f9" }}
                              />
                              <motion.div
                                className="h-2 rounded-full"
                                animate={{ backgroundColor: activePalette.secondary }}
                                style={{ width: `${Math.random() * 40 + 40}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Interactive cursor follower inside preview */}
                <motion.div
                  className="absolute pointer-events-none w-48 h-48 rounded-full blur-[50px] opacity-20"
                  animate={{ backgroundColor: activePalette.primary }}
                  initial={{ x: "50%", y: "50%" }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  drag
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  whileHover={{ opacity: 0.4, scale: 1.2 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
