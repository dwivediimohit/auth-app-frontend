import { useState } from "react";
import api from "./axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data);
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  const register = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Account created");
      setIsLogin(true);
    } catch {
      alert("Signup failed");
    }
  };

  const google = () =>
    (window.location.href =
      "http://localhost:8082/oauth2/authorization/google");

  const github = () =>
    (window.location.href =
      "http://localhost:8082/oauth2/authorization/github");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">

      {/* glowing background blobs */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 blur-[150px] top-[-100px] left-[-100px] opacity-30"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 blur-[150px] bottom-[-100px] right-[-100px] opacity-30"></div>

      {/* CARD */}
      <div className="w-[380px] p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-1">
          Welcome
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Secure Auth System
        </p>

        {/* TOGGLE */}
        <div className="flex bg-black/40 rounded-lg p-1 mb-5">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded-md transition ${
              isLogin ? "bg-white text-black" : "text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded-md transition ${
              !isLogin ? "bg-white text-black" : "text-gray-300"
            }`}
          >
            Signup
          </button>
        </div>

        {/* INPUTS */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-400"
        />

        {/* MAIN BUTTON */}
        <button
          onClick={isLogin ? login : register}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:scale-[1.02] transition"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* DIVIDER */}
        <div className="text-center text-gray-400 my-4 text-sm">
          OR
        </div>

        {/* SOCIAL BUTTONS */}
        <button
          onClick={google}
          className="w-full mb-2 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Continue with Google
        </button>

        <button
          onClick={github}
          className="w-full py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Continue with GitHub
        </button>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Secure JWT + OAuth Authentication
        </p>
      </div>
    </div>
  );
}