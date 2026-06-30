  import { createContext, useContext, useState, useEffect } from "react";

  const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        setUser({ token });
      }

      setLoading(false);
    }, []);

    const login = (token) => {
      localStorage.setItem("token", token);
      setUser({ token });
    };

    // ✅ ONLY ADD THIS (NOT REMOVING ANYTHING)
    const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/login";
    };

    return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);