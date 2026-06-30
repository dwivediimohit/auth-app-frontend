import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


/* ================= API ================= */
const api = axios.create({
  baseURL: "https://auth-app-backend-production.up.railway.app/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ================= PROTECTED ROUTE ================= */
function Protected({ children }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get("/auth/me"); // changed from /users
        setValid(true);
      } catch {
        localStorage.removeItem("token");
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) {
    return (
      <div className="center">
        <div className="glass">
          Verifying Session...
        </div>
      </div>
    );
  }

  return valid
    ? children
    : <Navigate to="/" replace />;
}

/* ================= PUBLIC ROUTE ================= */
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  // Already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/* ================= LOGIN ================= */
function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [signingUp, setSigningUp] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
  let newErrors = {
    name: "",
    email: "",
    password: "",
  };

  let isValid = true;

  // Name Validation (Signup only)
  if (!isLogin) {
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }
  }

  // Email Validation
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    newErrors.email = "Enter a valid email address";
    isValid = false;
  }

  // Password Validation
  if (!form.password) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

  const login = async () => {
     if (!validate()) return;
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const token =
        typeof res.data === "string" ? res.data : res.data?.token;

      if (!token) return toast.error("Invalid response");

      localStorage.setItem("token", token);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Login failed");
    }
  };

const register = async () => {
  if (!validate()) return;
  setSigningUp(true);

  try {
    await api.post("/auth/register", form);

    toast.success("Account created");
    setIsLogin(true);
  } catch {
    toast.error("Signup failed");
  } finally {
    setSigningUp(false);
  }
};

  const google = () =>
    (window.location.href =
      "https://auth-app-backend-production.up.railway.app/oauth2/authorization/google");

  const github = () =>
    (window.location.href =
      "https://auth-app-backend-production.up.railway.app/oauth2/authorization/github");

  return (
    <div className="loginPage">
      {signingUp && (
  <div className="logoutOverlay">
    <div className="logoutBox">
      <div className="spinner"></div>
      <h2>Signing up...</h2>
      <p>Creating your account</p>
    </div>
  </div>
)}

      {/* BACKGROUND ORBS */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <div className="loginCard">

        <div className="header">
          <h1>{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h1>
          <p>{isLogin ? "Login to continue your dashboard" : "Join and start your journey"}</p>
        </div>

        {!isLogin && (
          <div className="inputGroup">
            <input
  name="name"
  value={form.name}
  onChange={handleChange}
/>
            <label>Name</label>
              {errors.name && (
    <span className="error">{errors.name}</span>
  )}
          </div>
        )}

        <div className="inputGroup">
            {errors.email && (
    <span className="error">{errors.email}</span>
  )}
          <input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
/>
          <label>Email</label>
        </div>

        <div className="inputGroup passwordBox">
         <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={form.password}
  onChange={handleChange}
/>
          <label>Password</label>

          <span
            className="eyeBtn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>

            {errors.password && (
    <span className="error">{errors.password}</span>
  )}
        </div>

        <button className="primaryBtn" onClick={isLogin ? login : register}>
          {isLogin ? "Login" : "Create Account"}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="googleBtn" onClick={google}>
          Continue with Google
        </button>

        <button className="githubBtn" onClick={github}>
          Continue with GitHub
        </button>

        <p className="switchText" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New here? Create account" : "Already have account? Login"}
        </p>

      </div>

      <style>{`
        .loginPage {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top, #0b1220, #05070f);
          font-family: system-ui;
        }

        /* ORBS */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 8s infinite alternate;
        }

        .error {
  display: block;
  margin-top: 6px;
  color: #ff6b6b;
  font-size: 12px;
  font-weight: 500;
}
        .logoutOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.logoutBox {
  text-align: center;
  color: white;
}

.spinner {
  width: 45px;
  height: 45px;
  border: 4px solid rgba(255,255,255,0.2);
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  margin: auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

        .orb1 {
          width: 300px;
          height: 300px;
          background: #3b82f6;
          top: -50px;
          left: -50px;
        }

        .orb2 {
          width: 250px;
          height: 250px;
          background: #8b5cf6;
          bottom: -80px;
          right: -60px;
        }

        .orb3 {
          width: 200px;
          height: 200px;
          background: #ec4899;
          top: 50%;
          left: 50%;
        }

        @keyframes float {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(30px) scale(1.1); }
        }

        /* CARD */
        .loginCard {
          width: 380px;
          padding: 30px;
          border-radius: 24px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 30px 80px rgba(0,0,0,0.6);
          animation: pop 0.6s ease;
          z-index: 2;
        }

        @keyframes pop {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .header h1 {
          margin: 0;
          font-size: 22px;
        }

        .header p {
          font-size: 12px;
          color: #aaa;
          margin-bottom: 20px;
        }

        /* INPUT FLOAT LABEL */
        .inputGroup {
          position: relative;
          margin-top: 18px;
        }

        .inputGroup input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white;
          outline: none;
        }

        .inputGroup label {
          position: absolute;
          left: 12px;
          top: 12px;
          color: #aaa;
          font-size: 13px;
          transition: 0.3s;
          pointer-events: none;
        }

        .inputGroup input:focus + label,
        .inputGroup input:valid + label {
          top: -10px;
          font-size: 11px;
          color: #8b5cf6;
        }

        /* PASSWORD EYE */
        .passwordBox {
          position: relative;
        }

        .eyeBtn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 14px;
        }

        /* BUTTONS */
        .primaryBtn {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg,#3b82f6,#8b5cf6,#ec4899);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .primaryBtn:hover {
          transform: scale(1.05);
        }

        .googleBtn, .githubBtn {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .googleBtn:hover {
          box-shadow: 0 0 20px #3b82f6;
        }

        .githubBtn:hover {
          box-shadow: 0 0 20px #8b5cf6;
        }

        .divider {
          text-align: center;
          margin: 15px 0;
          color: #666;
          position: relative;
        }

        .divider span {
          background: rgba(0,0,0,0.4);
          padding: 0 10px;
        }

        .switchText {
          text-align: center;
          margin-top: 15px;
          color: #aaa;
          cursor: pointer;
        }

        .switchText:hover {
          color: white;
        }
      `}</style>

    </div>
  );
}

/* ================= DASHBOARD ================= */
/* ================= DASHBOARD ================= */
function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setCurrentUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const getInitial = (name) =>
    name ? name.charAt(0).toUpperCase() : "?";

  const logout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }, 2000);
  };

  return (
    <div className="dashboard">

      {/* LOGOUT OVERLAY */}
      {loggingOut && (
        <div className="logoutOverlay">
          <div className="logoutBox">
            <div className="spinner"></div>
            <h2>Logging out...</h2>
            <p>Securing session</p>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <div className="topbar">
        <h2>My Secure App</h2>

        <div className="rightBar">
          <div className="profileCircle">
            {getInitial(currentUser?.name)}
          </div>

          <span className="username">
            {currentUser?.name}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* PROFILE CARD (only the logged-in user) */}
      <div className="grid">
        {currentUser && (
          <div className="card">
            <div className="avatarCircle">
              {getInitial(currentUser.name)}
            </div>
            <h3>{currentUser.name}</h3>
            <p>{currentUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= OAUTH ================= */
function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="center">
      <div className="glass">Logging in...</div>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Toaster />

<Routes>

  <Route
    path="/"
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    }
  />

  <Route
    path="/dashboard"
    element={
      <Protected>
        <Dashboard />
      </Protected>
    }
  />

  <Route
    path="/oauth-success"
    element={<OAuthSuccess />}
  />

  {/* Invalid URL */}
  <Route
    path="*"
    element={
      localStorage.getItem("token")
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/" replace />
    }
  />

</Routes>

      {/* ================= STYLE ================= */}
      <style>{`
body {
  margin: 0;
  font-family: system-ui;
  background: radial-gradient(circle at top, #0b1220, #05070f);
  color: white;
}

.center {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.username{
  font-size:14px;
  font-weight:600;
  color:white;
}

.glass {
  background: rgba(255,255,255,0.06);
  padding: 25px;
  border-radius: 18px;
  width: 340px;
  backdrop-filter: blur(20px);
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background: #111;
  color: white;
}

.btn {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: linear-gradient(90deg,#3b82f6,#8b5cf6);
  border: none;
  color: white;
  border-radius: 10px;
}

.social {
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  background: #1a1a1a;
  border-radius: 10px;
  border: 1px solid #333;
  color: white;
}

.switch {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}

/* DASHBOARD */
.dashboard {
  padding: 20px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rightBar {
  display: flex;
  gap: 10px;
  align-items: center;
}

.profileCircle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg,#3b82f6,#ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

button {
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  background: #222;
  color: white;
  cursor: pointer;
}

/* GRID */
.grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: 12px;
}

.card {
  padding: 15px;
  background: #111;
  border-radius: 12px;
}

.avatarCircle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg,#3b82f6,#8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

/* PASSWORD */
.passwordBox {
  position: relative;
}

.eye {
  position: absolute;
  right: 10px;
  top: 50%;
  cursor: pointer;
}

/* LOGOUT OVERLAY */
.logoutOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

.logoutBox {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #333;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  margin: auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`}</style>
    </BrowserRouter>
  );
}