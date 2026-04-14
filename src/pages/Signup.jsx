import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, User, ArrowRight, Command } from "lucide-react";

import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slice/authSlice";
import { useTheme } from "../themeFile/useTheme";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target
    setformData(prev => ({ ...prev, [name]: value }))
  }
  console.log(formData);


  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(registerUser(formData)).unwrap();

      localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("token", "mock-jwt-token-for-dev");
      localStorage.setItem("isAuthenticated", "true");

      toast.success("Account created successfully!");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      const errorMsg = err?.message || err || "Registration failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden ${theme.bg}`}>
      {/* Decorative neon background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[90px] -z-10 mix-blend-screen pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Card className={`glass-panel shadow-[0_4px_30px_rgba(0,0,0,0.05)] ${theme.cardBg} ${theme.border}`}>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="mx-auto w-12 h-12 rounded-xl bg-primary shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center mb-4"
              >
                <User className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className={`text-2xl font-bold tracking-tight mb-2 ${theme.textPrimary}`}>
                Create an Account
              </h1>
              <p className={`text-sm ${theme.textSecondary}`}>
                Join us and start managing your tasks efficiently
              </p>
            </div>

            <form className="space-y-4" onSubmit={HandleSubmit}>
              <div className="space-y-2">
                <label className={`text-sm font-medium ${theme.textSecondary}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSecondary}`} />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    value={formData.name}
                    onChange={HandleChange}
                    required
                    className={`pl-10 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 ${theme.headerBg} ${theme.border}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium ${theme.textSecondary}`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSecondary}`} />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={formData.email}
                    onChange={HandleChange}
                    required
                    className={`pl-10 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 ${theme.headerBg} ${theme.border}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium ${theme.textSecondary}`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSecondary}`} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={HandleChange}
                    required
                    className={`pl-10 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 ${theme.headerBg} ${theme.border}`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 transition-all duration-300 rounded-lg group"
              >
                Sign Up
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-black/10"></div>
              <span className={`text-xs font-medium px-2 ${theme.textSecondary}`}>
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-black/10"></div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-6 transition-all duration-300"
            >
              <Command className="w-4 h-4 mr-2" />
              SSO Sign Up
            </Button>

            <p className={`text-center text-sm mt-8 ${theme.textSecondary}`}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-primary hover:text-primary-light transition-colors font-medium cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
