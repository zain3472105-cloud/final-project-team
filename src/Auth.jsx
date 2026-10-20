
import { useState } from "react";
import "./Auth.css";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() && password) {
      onLogin();
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-hero">
        <div className="auth-overlay"></div>

        <div className="auth-welcome">
          <h1>Welcome to My Library!</h1>
          <p>Your next favorite book is waiting for you.</p>
        </div>
      </header>
      <main className="auth-card-wrapper">
        <section className="auth-card">
          <div className="auth-logo">📚</div>

          <h2>
            {isLogin ? "Sign in to My Library" : "Create Your Account"}
          </h2>

          <p className="auth-description">
            {isLogin
              ? "Welcome back! Please enter your details."
              : "Join our library community today."}
          </p>
          <div className="auth-social-buttons">
            <button
              type="button"
              aria-label="Facebook login"
              onClick={() =>
                alert("Facebook login is not configured yet.")
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Google login"
              onClick={() =>
                alert("Google login is not configured yet.")
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  isLogin ? "current-password" : "new-password"
                }
                required
              />
            </div>

            {isLogin && (
              <div className="auth-form-options">
                <label className="auth-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="auth-forgot"
                  onClick={() =>
                    alert("Password recovery is not configured yet.")
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="auth-submit">
              {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="auth-bottom-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="auth-signup-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "SIGN UP" : "BACK TO LOGIN"}
          </button>

          <p className="auth-switch-text">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </section>
      </main>
      <footer className="auth-footer">
        <span>My Library</span>
        <span>Discover. Read. Grow.</span>
        <span>© 2026 My Library</span>
      </footer>
    </div>
  );
}

export default Auth;