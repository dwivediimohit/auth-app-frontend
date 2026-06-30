import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostLoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070f] text-white">
      <div className="text-center">

        <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin mx-auto"></div>

        <h2 className="mt-4 text-xl font-semibold">
          Signing you in...
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Preparing your dashboard
        </p>

      </div>
    </div>
  );
}