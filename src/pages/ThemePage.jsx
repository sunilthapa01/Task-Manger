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
import { useDispatch } from "react-redux";
import { addTheme } from "../redux/slice/themeSlice";

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

export default function ThemePage() {
  const [activePalette, setActivePalette] = useState(colorPalettes[0]);
  const [activeMode, setActiveMode] = useState("dark");
  const dispatch = useDispatch();

  const handleThemeChange = (mode) => {
    dispatch(addTheme(mode.id));

    setActiveMode(mode.id);
  };
  console.log(activePalette);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-background p-6 md:p-12 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Elements - strictly visual to match the selected theme */}
      <motion.div
        animate={{ backgroundColor: activePalette.primary }}
        transition={{ duration: 1 }}
        className="absolute top-[-10%] sm:top-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-20 rounded-full blur-[100px] sm:blur-[150px] -z-10 mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{ backgroundColor: activePalette.secondary }}
        transition={{ duration: 1 }}
        className="absolute bottom-[-10%] sm:bottom-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-20 rounded-full blur-[90px] sm:blur-[120px] -z-10 mix-blend-screen pointer-events-none"
      />

      <div className="w-full max-w-5xl z-10 flex flex-col gap-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-black/5 shadow-sm"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 flex items-center gap-3">
              <Palette className="w-8 h-8 text-primary" />
              Appearance
            </h1>
            <p className="text-slate-500 mt-1">
              Customize your workspace experience.
            </p>
          </div>
          <Button className="rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group">
            <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
            Apply Changes
          </Button>
        </motion.div>

        <div className="ghandleThemeChangerid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 flex flex-col gap-6"
          >
            {/* Mode Selection */}
            <motion.div variants={itemVariants}>
              <Card className="glass-panel border-black/5 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3 border-b border-black/5 bg-black/5">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
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
                      onClick={() => handleThemeChange(mode)}
                      className={`w-full flex items-center p-3 rounded-xl border transition-all duration-300 ${
                        activeMode === mode.id
                          ? "bg-primary/10 border-primary text-primary shadow-[0_4px_15px_rgba(99,102,241,0.15)] scale-[1.02]"
                          : "bg-transparent border-black/10 hover:bg-black/5 text-slate-600 hover:scale-[1.01]"
                      }`}
                    >
                      <mode.icon
                        className={`w-5 h-5 mr-3 ${activeMode === mode.id ? "text-primary" : "text-slate-400"}`}
                      />
                      <span className="font-semibold">{mode.label}</span>
                      {activeMode === mode.id && (
                        <motion.div layoutId="modeCheck" className="ml-auto">
                          <CheckCircle2 className="w-5 h-5" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Accent Color Selection */}
            <motion.div variants={itemVariants}>
              <Card className="glass-panel border-black/5 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3 border-b border-black/5 bg-black/5">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-700">
                    <Palette className="w-5 h-5 text-primary" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {colorPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => setActivePalette(palette)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                        activePalette.id === palette.id
                          ? "bg-primary/10 border-primary shadow-[0_4px_15px_rgba(99,102,241,0.15)] scale-[1.02]"
                          : "bg-transparent border-black/10 hover:bg-black/5 hover:scale-[1.01]"
                      }`}
                    >
                      <span
                        className={`font-semibold ${activePalette.id === palette.id ? "text-primary" : "text-slate-600"}`}
                      >
                        {palette.name}
                      </span>
                      <div className="flex gap-1.5 p-1 rounded-full bg-white/50 border border-black/5 shadow-sm">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        ></div>
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: palette.secondary }}
                        ></div>
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{
                            backgroundColor: palette.bg,
                            border: "1px solid rgba(0,0,0,0.1)",
                          }}
                        ></div>
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
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="lg:col-span-2 relative"
          >
            <div className="sticky top-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-700">
                  <SlidersHorizontal className="w-5 h-5" /> Live Preview
                </h2>
                <div className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full animate-pulse">
                  Interactive
                </div>
              </div>

              {/* The "Fake" App Canvas to demonstrate theme */}
              <motion.div
                className="w-full aspect-[4/3] rounded-3xl border-4 shadow-2xl overflow-hidden relative flex flex-col"
                animate={{
                  backgroundColor:
                    activeMode === "dark" ? "#111827" : "#ffffff",
                  borderColor: activeMode === "dark" ? "#1f2937" : "#f3f4f6",
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Fake App Header */}
                <motion.div
                  animate={{
                    backgroundColor:
                      activeMode === "dark" ? "#1f2937" : "#f8f9fa",
                  }}
                  className="h-16 border-b flex items-center justify-between px-6 z-10"
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
                      animate={{
                        backgroundColor:
                          activeMode === "dark" ? "#374151" : "#e2e8f0",
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full"
                        animate={{
                          backgroundColor:
                            activeMode === "dark" ? "#374151" : "#e2e8f0",
                        }}
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
                              ? activeMode === "dark"
                                ? `${activePalette.primary}33`
                                : `${activePalette.primary}22`
                              : activeMode === "dark"
                                ? "#1f2937"
                                : "#f8f9fa",
                          color: i === 2 ? activePalette.primary : "inherit",
                        }}
                        style={{
                          borderLeft:
                            i === 2
                              ? `4px solid ${activePalette.primary}`
                              : "none",
                        }}
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
                            backgroundColor:
                              activeMode === "dark" ? "#1f2937" : "#ffffff",
                            border: `1px solid ${activeMode === "dark" ? "#374151" : "#f1f5f9"}`,
                          }}
                        >
                          <motion.div
                            className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full opacity-20"
                            animate={{ backgroundColor: activePalette[col] }}
                          />
                          <motion.div
                            className="w-10 h-10 rounded-xl mb-3"
                            animate={{
                              backgroundColor: `${activePalette[col]}33`,
                            }}
                          />
                          <motion.div
                            className="w-1/2 h-3 rounded-full mb-2"
                            animate={{
                              backgroundColor:
                                activeMode === "dark" ? "#4b5563" : "#cbd5e1",
                            }}
                          />
                          <motion.div
                            className="w-1/3 h-5 rounded-full"
                            animate={{
                              backgroundColor:
                                activeMode === "dark" ? "#e5e7eb" : "#334155",
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Fake Chart / List Area */}
                    <motion.div
                      className="flex-1 rounded-2xl p-5 shadow-sm border"
                      animate={{
                        backgroundColor:
                          activeMode === "dark" ? "#1f2937" : "#ffffff",
                        borderColor:
                          activeMode === "dark" ? "#374151" : "#f1f5f9",
                      }}
                    >
                      <motion.div
                        className="w-1/3 h-4 rounded-full mb-6"
                        animate={{
                          backgroundColor:
                            activeMode === "dark" ? "#4b5563" : "#cbd5e1",
                        }}
                      />

                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center gap-4">
                            <motion.div
                              className="w-3 h-3 rounded-full"
                              animate={{
                                backgroundColor: activePalette.primary,
                              }}
                            />
                            <div className="flex-1">
                              <motion.div
                                className="w-full h-2 rounded-full mb-2"
                                animate={{
                                  backgroundColor:
                                    activeMode === "dark"
                                      ? "#374151"
                                      : "#f1f5f9",
                                }}
                              />
                              <motion.div
                                className="h-2 rounded-full"
                                animate={{
                                  backgroundColor: activePalette.secondary,
                                }}
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
