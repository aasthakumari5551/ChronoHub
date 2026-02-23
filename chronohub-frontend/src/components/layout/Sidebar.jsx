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
    <div className="w-56 bg-gradient-to-b from-[#1a1a40] to-[#16163a] text-white flex flex-col justify-between shadow-2xl min-h-screen">

      {/* Top Section */}
      <div className="p-5">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-base font-bold">C</span>
          </div>
          <h2 className="text-lg font-bold tracking-wide text-white">
            ChronoHub
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">

          {user?.role === "employee" && (
            <Link
              to="/employee"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive("/employee")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg text-white font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="text-base">📊</span>
              <span>Dashboard</span>
            </Link>
          )}

          {user?.role === "manager" && (
            <Link
              to="/manager"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive("/manager")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg text-white font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="text-base">👔</span>
              <span>Manager Panel</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive("/admin")
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg text-white font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="text-base">⚙️</span>
              <span>Admin Panel</span>
            </Link>
          )}

        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-5">

        {/* User Info */}
        <div className="mb-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2.5 text-sm rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-lg hover:shadow-xl text-white"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;