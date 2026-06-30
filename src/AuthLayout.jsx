import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#05070f] text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">

        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute w-[520px] h-[520px] bg-blue-500/20 blur-[140px] rounded-full"
        />

        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute w-[420px] h-[420px] bg-purple-500/20 blur-[140px] rounded-full bottom-0 right-0"
        />

        <div className="relative z-10 px-16">
          <h1 className="text-5xl font-bold leading-tight">
            Secure Auth System
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            JWT + Google OAuth + GitHub OAuth<br />
            Production-grade authentication UI
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-10">
        {children}
      </div>

    </div>
  );
}