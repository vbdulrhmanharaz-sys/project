import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck, FiLock, FiMail, FiUser } from "react-icons/fi";
import { userContext } from "./context/UserContext";

export default function Auth({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useContext(userContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  };

  const submit = (event) => {
    event.preventDefault();
    if (isRegister && form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (form.password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    const result = isRegister ? register(form) : login(form);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/home", { replace: true });
  };

  return (
    <main className="auth-shell">
      <div className="auth-orbit orbit-one" />
      <div className="auth-orbit orbit-two" />
      <section className="auth-panel">
        <div className="auth-story">
          <Link className="brand brand-light" to="/login">
            <span className="brand-mark">N</span>
            Noura
          </Link>
          <div className="auth-story-copy">
            <p className="eyebrow">A calmer way to explore</p>
            <h1>Make space for what matters.</h1>
            <p>One thoughtful place for ideas, products, and the next thing you want to learn.</p>
          </div>
          <div className="story-note"><FiCheck /> Your private workspace, ready when you are.</div>
        </div>
        <div className="auth-form-wrap">
          <div className="auth-form-heading">
            <p className="eyebrow">Welcome back</p>
            <h2>{isRegister ? "Create your account" : "Sign in to Noura"}</h2>
            <p>{isRegister ? "Start your own quiet corner of the web." : "Pick up exactly where you left off."}</p>
          </div>
          <form className="auth-form" onSubmit={submit}>
            {isRegister && (
              <label className="field-label">
                Full name
                <span className="input-wrap"><FiUser /><input name="name" value={form.name} onChange={updateField} placeholder="Your name" autoComplete="name" required /></span>
              </label>
            )}
            <label className="field-label">
              Email address
              <span className="input-wrap"><FiMail /><input name="email" value={form.email} onChange={updateField} type="email" placeholder="you@example.com" autoComplete="email" required /></span>
            </label>
            <label className="field-label">
              Password
              <span className="input-wrap"><FiLock /><input name="password" value={form.password} onChange={updateField} type="password" placeholder="At least 6 characters" autoComplete={isRegister ? "new-password" : "current-password"} required /></span>
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-action" type="submit">{isRegister ? "Create account" : "Sign in"}<FiArrowRight /></button>
          </form>
          <p className="auth-switch">{isRegister ? "Already have an account?" : "New to Noura?"}{" "}<Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
          <p className="auth-path">{location.pathname === "/register" ? "Your account stays on this device." : "No account? It takes less than a minute."}</p>
        </div>
      </section>
    </main>
  );
}
