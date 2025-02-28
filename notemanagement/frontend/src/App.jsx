import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddNotes from "./pages/AddNotes";
import LayoutSection from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <LayoutSection>
                  <Dashboard />
                </LayoutSection>
              </ProtectedRoute>
            }
          />
          <Route
            path="/addnotes"
            element={
              <ProtectedRoute>
                <LayoutSection>
                  <AddNotes />
                </LayoutSection>
              </ProtectedRoute>
            }
          />
            <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <LayoutSection>
                  <Profile />
                </LayoutSection>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
