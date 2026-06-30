import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";

import api from "./axios";

export default function Dashboard() {

  const [users, setUsers] = useState([]);

  const logout = async () => {

    try {

      await api.post("/auth/logout");

    } catch (e) {}

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      window.location.href = "/";
      return;
    }

    const loadUsers = async () => {

      try {

        const res =
          await api.get("/users");

        setUsers(res.data);

      } catch (error) {

        localStorage.removeItem("token");

        window.location.href = "/";
      }
    };

    loadUsers();

  }, []);

  return (

    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* Header */}

      <header
        className="
          h-16
          border-b
          border-white/10
          flex
          items-center
          justify-between
          px-8
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              w-9
              h-9
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              font-bold
            "
          >
            AI
          </div>

          <h1 className="font-medium">
            Auth App
          </h1>

        </div>

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            border
            border-white/10
            hover:bg-white/5
            transition
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </header>

      {/* Main */}

      <main className="max-w-6xl mx-auto p-8">

        <h2
          className="
            text-3xl
            font-semibold
            mb-2
          "
        >
          Dashboard
        </h2>

        <p className="text-slate-400 mb-8">
          Connected with Spring Boot JWT Authentication
        </p>

        {/* Users */}

        <div
          className="
            grid
            gap-4
          "
        >

          {users?.map((user) => (

            <div
              key={user.id}
              className="
                bg-[#171717]
                border
                border-white/10
                rounded-2xl
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#212121]
                    flex
                    items-center
                    justify-center
                  "
                >

                  <User size={20} />

                </div>

                <div>

                  <h3 className="font-medium">
                    {user.name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {user.email}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}