import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  value,
  onChange,
  placeholder = "Enter password",
  label = "Password",
}) {

  const [showPassword, setShowPassword] =
    useState(false);

  return (

    <div className="mb-4">

      <label
        className="
          block
          mb-2
          text-sm
          font-medium
          text-slate-300
        "
      >
        {label}
      </label>

      <div className="relative">

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="
            w-full
            h-12
            rounded-xl
            border
            border-white/10
            bg-[#212121]
            px-4
            pr-12
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-200
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-500/20
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-white
            transition
          "
        >

          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}

        </button>

      </div>

    </div>
  );
}