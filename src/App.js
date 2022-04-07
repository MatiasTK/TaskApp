import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import RecoverPassword from "./Components/RecoverPassword";

function App() {
  return (
    <div className="bg-gradient-to-br from-sky-500 to-pink-500 h-screen flex">
      <AuthProvider>
        {/* Le doy acceso a authprovider a todas las rutas */}
        <Routes>
          <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/RecoverPassword" element={<RecoverPassword />} />
          <Route path="/TaskApp" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
