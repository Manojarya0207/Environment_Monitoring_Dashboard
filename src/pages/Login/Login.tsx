import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import "./Login.css";

/* ──── Leaf + plug logo SVG ──── */
function GreenEnergyLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="url(#leafGrad)" />
      <path
        d="M16 30c0-10 8-18 16-18-2 4-3 8-3 12s2 6 3 8c-4 2-8-2-16-2z"
        fill="#fff"
        opacity="0.9"
      />
      <path
        d="M20 28c2-6 6-10 10-12"
        stroke="#2ecc71"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="36" cy="34" r="4" fill="#27ae60" />
      <rect x="35" y="30" width="2" height="4" rx="1" fill="#fff" />
      <rect x="34" y="31" width="4" height="2" rx="1" fill="#fff" />
      <defs>
        <linearGradient id="leafGrad" x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#e8f8ef" />
          <stop offset="1" stopColor="#c8f0d8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ──── Social Icons ──── */
function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 170 170" fill="#333">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.2-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.93.21-9.84-1.96-14.74-6.52-3.13-2.73-7.05-7.41-11.76-14.04-5.05-7.08-9.2-15.29-12.45-24.65-3.47-10.2-5.21-20.07-5.21-29.59 0-10.95 2.36-20.39 7.09-28.3 3.72-6.36 8.67-11.38 14.87-15.07 6.2-3.69 12.9-5.57 20.12-5.71 3.92 0 9.06 1.21 15.44 3.6 6.36 2.4 10.44 3.62 12.24 3.62 1.34 0 5.87-1.42 13.56-4.25 7.27-2.63 13.41-3.72 18.44-3.29 13.63 1.1 23.87 6.47 30.68 16.14-12.19 7.39-18.22 17.73-18.1 31 .11 10.34 3.86 18.94 11.23 25.77 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.1-2.96 15.67-8.86 22.67-7.12 8.32-15.73 13.12-25.07 12.37a25.2 25.2 0 01-.19-3.07c0-7.78 3.39-16.1 9.4-22.9 3-3.44 6.82-6.31 11.45-8.6 4.62-2.26 8.99-3.51 13.1-3.72.12 1.1.17 2.2.17 3.25z"/>
    </svg>
  );
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    await login(email, password);
    navigate("/");
  };

  return (
    <div className="login-page">
      {/* ──── Right Panel ──── */}
      <div className="login-right">
        <div className="login-form-container">
          {/* Logo */}
          <div className="login-logo-circle animate-fade-in-up animate-delay-1">
            <GreenEnergyLogo size={40} />
          </div>

          {/* Welcome */}
          <div className="login-welcome animate-fade-in-up animate-delay-2">
            <h1>Welcome <span>Back!</span></h1>
            <p>Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            {/* Email */}
            <div className="login-input-group animate-fade-in-up animate-delay-3">
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                autoComplete="email"
              />
              <Mail size={18} className="login-input-icon" />
            </div>

            {/* Password */}
            <div className="login-input-group animate-fade-in-up animate-delay-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                autoComplete="current-password"
              />
              <Lock size={18} className="login-input-icon" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* Remember / Forgot */}
            <div className="login-remember-row animate-fade-in-up animate-delay-5">
              <label className="login-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="login-forgot-link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="login-submit-btn animate-fade-in-up animate-delay-6"
            >
              {isLoggingIn ? (
                <>
                  <div className="login-spinner" />
                  Authenticating...
                </>
              ) : (
                <>
                  Login
                  <span className="login-submit-arrow">
                    <ArrowRight size={16} />
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider animate-fade-in-up animate-delay-7">
            <div className="login-divider-line" />
            <span className="login-divider-text">or continue with</span>
            <div className="login-divider-line" />
          </div>

          {/* Social login */}
          <div className="login-social-row animate-fade-in-up animate-delay-8">
            <button type="button" className="login-social-btn" aria-label="Sign in with Google">
              <GoogleIcon />
            </button>
            <button type="button" className="login-social-btn" aria-label="Sign in with Microsoft">
              <MicrosoftIcon />
            </button>
            <button type="button" className="login-social-btn" aria-label="Sign in with Apple">
              <AppleIcon />
            </button>
          </div>

          {/* Sign up */}
          <p className="login-signup-text animate-fade-in-up animate-delay-9">
            Don't have an account?{" "}
            <a href="#" className="login-signup-link">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
