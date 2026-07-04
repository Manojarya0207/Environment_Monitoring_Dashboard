import { Wind } from "lucide-react";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-[128px] z-0 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-blue/10 rounded-full blur-[128px] z-0 pointer-events-none" />

      {/* Left side 3D placeholder or imagery */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 p-12">
        <div className="w-full max-w-lg glass p-12 rounded-[3rem] aspect-square flex flex-col items-center justify-center text-center gap-6 border-white/5 shadow-2xl">
           <Wind className="w-32 h-32 text-primary animate-[spin_4s_linear_infinite]" />
           <div>
             <h2 className="text-4xl font-bold mb-4">Welcome to WindSphere AI</h2>
             <p className="text-lg text-muted-foreground">Smart Renewable Energy & Weather Monitoring Dashboard</p>
           </div>
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-8">
        <div className="w-full max-w-md glass p-10 rounded-3xl flex flex-col gap-8 shadow-2xl">
          <div className="flex flex-col items-center text-center gap-2">
            <Wind className="text-primary w-12 h-12 mb-2 lg:hidden" />
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Access your monitoring dashboard</p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
              <input type="email" placeholder="operator@windsphere.ai" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <input type="password" placeholder="••••••••" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all" />
            </div>

            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-black/20 text-primary focus:ring-primary/50" />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>

            <Link to="/" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl mt-4 transition-colors flex justify-center items-center">
              Login to Dashboard
            </Link>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">Or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="glass py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">Google</button>
            <button className="glass py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">Microsoft</button>
          </div>
        </div>
      </div>
    </div>
  );
}
