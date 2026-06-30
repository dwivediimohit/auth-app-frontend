export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-400">{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full mt-2 h-12 px-4
          rounded-xl
          bg-white/5
          border border-white/10
          outline-none
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-500/20
          transition
        "
      />
    </div>
  );
}