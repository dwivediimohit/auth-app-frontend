export default function Button({ children, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        w-full h-12 rounded-xl
        bg-gradient-to-r from-blue-500 to-purple-600
        text-white font-medium
        shadow-lg shadow-blue-500/20
        hover:scale-[1.02]
        transition
        disabled:opacity-50
      "
    >
      {loading ? "Loading..." : children}
    </button>
  );
}