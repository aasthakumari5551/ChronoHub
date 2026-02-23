import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col justify-between shadow-2xl border-r border-gray-700">

      {/* Top Section */}
      <div className="p-6">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">C</span>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ChronoHub
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          {user?.role === "employee" && (
            <Link
              to="/employee"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive("/employee")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  : "hover:bg-gray-700/50"
              }`}
            >
              <span className="text-lg">📊</span>
              <span className="font-medium">Dashboard</span>
            </Link>
          )}

          {user?.role === "manager" && (
            <Link
              to="/manager"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive("/manager")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  : "hover:bg-gray-700/50"
              }`}
            >
              <span className="text-lg">👔</span>
              <span className="font-medium">Manager Panel</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  : "hover:bg-gray-700/50"
              }`}
            >
              <span className="text-lg">⚙️</span>
              <span className="font-medium">Admin Panel</span>
            </Link>
          )}

        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-700">

        {/* User Info */}
        <div className="mb-4 p-3 bg-gray-800/50 rounded-xl">
          <p className="text-sm font-semibold mb-1">{user?.name}</p>
          <p className="text-xs text-gray-400 capitalize">
            {user?.role}
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 text-sm rounded-xl bg-red-600 hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;