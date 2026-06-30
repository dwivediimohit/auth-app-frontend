import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "./AuthLayout";
import AuthCard from "./AuthCard";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import Button from "./Button";
import Divider from "./Divider";
import SocialButtons from "./SocialButtons";

import { loginUser } from "./authService";

import toast from "react-hot-toast";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    // ❗ validation kept (same logic)
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    // ❗ prevent double click spam
    if (loading) return;

    try {

      setLoading(true);

      const res = await loginUser({
        email,
        password,
      });

      // 🔥 SAFE TOKEN HANDLING (important fix)
      const token =
        typeof res.data === "string"
          ? res.data
          : res.data?.token;

      if (!token) {
        toast.error("Invalid server response");
        return;
      }

      localStorage.setItem("token", token);

      toast.success("Login Successful");

      // ❗ small delay improves UX (no logic change)
      setTimeout(() => {
        navigate("/post-login");
      }, 300);

    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Invalid Credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <AuthLayout>
  <AuthCard>

    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold">Welcome Back</h1>
      <p className="text-gray-400 mt-2 text-sm">
        Sign in to continue
      </p>
    </div>

 <InputField
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<InputField
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

    <div className="mt-6">
      <Button loading={loading} onClick={handleLogin}>
        Continue
      </Button>
    </div>

    <div className="my-6 text-center text-gray-500 text-sm">
      OR
    </div>

    <SocialButtons />

  </AuthCard>
</AuthLayout>
  );
}