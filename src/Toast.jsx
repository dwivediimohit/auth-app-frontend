import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 16px",
      borderRadius: "10px",
      background: type === "success" ? "#22c55e" : "#ef4444",
      color: "white",
      fontSize: "14px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}>
      {message}
    </div>
  );
}