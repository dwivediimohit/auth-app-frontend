import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import OAuthSuccess from "./OAuthSuccess";
import ProtectedRoute from "./ProtectedRoute";
import PostLoginRedirect from "./PostLoginRedirect";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/post-login" element={<PostLoginRedirect />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}