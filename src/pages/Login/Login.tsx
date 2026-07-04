import { Wind, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import loginImage from "../../assets/images/image.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[128px] z-0 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-blue/10 rounded-full blur-[128px] z-0 pointer-events-none" />

      {/* Left side 3D placeholder or imagery */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full max-w-3xl flex items-center justify-center relative overflow-hidden group"
        >
          <img 
            src={loginImage} 
            alt="Environment Monitoring Dashboard" 
            className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Right side login form */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md glass p-10 rounded-3xl flex flex-col gap-8 shadow-2xl relative overflow-hidden backdrop-blur-xl border-white/10"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan to-primary" />
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-2">
            <Wind className="text-primary w-12 h-12 mb-2 lg:hidden animate-[spin_4s_linear_infinite]" />
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Access your monitoring dashboard</p>
          </motion.div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <motion.div variants={itemVariants} className="flex flex-col gap-2 group">
              <label className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="operator@windsphere.ai" 
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all hover:bg-black/30" 
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-2 group">
              <label className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all hover:bg-black/30" 
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <input type="checkbox" className="rounded border-white/10 bg-black/20 text-primary focus:ring-primary/50" />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl mt-4 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm font-medium">Or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <button type="button" className="glass py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium flex justify-center items-center gap-2">
              Google
            </button>
            <button type="button" className="glass py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium flex justify-center items-center gap-2">
              Microsoft
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
