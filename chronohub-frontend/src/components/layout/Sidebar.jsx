import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getNavigationItems = () => {
    switch (user?.role) {
      case "admin":
        return [
          {
            path: "/admin",
            icon: "📊",
            label: "Dashboard",
          },
          {
            path: "/admin/users",
            icon: "👥",
            label: "Users",
          },
          {
            path: "/admin/leaves",
            icon: "📋",
            label: "Leave Requests",
          },
          {
            path: "/calendar",
            icon: "📅",
            label: "Calendar",
          },
          {
            path: "/settings",
            icon: "⚙️",
            label: "Settings",
          },
        ];
      case "manager":
        return [
          {
            path: "/manager",
            icon: "📊",
            label: "Dashboard",
          },
          {
            path: "/calendar",
            icon: "📅",
            label: "Calendar",
          },
          {
            path: "/settings",
            icon: "⚙️",
            label: "Settings",
          },
        ];
      case "employee":
      default:
        return [
          {
            path: "/employee",
            icon: "📊",
            label: "Dashboard",
          },
          {
            path: "/employee/leaves",
            icon: "📋",
            label: "My Leaves",
          },
          {
            path: "/calendar",
            icon: "📅",
            label: "Calendar",
          },
          {
            path: "/settings",
            icon: "⚙️",
            label: "Settings",
          },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="w-64 bg-white/80 dark:bg-gray-900/80 
      backdrop-blur-xl border-r border-gray-200/60 dark:border-gray-800/60
      flex flex-col justify-between shadow-sm">

      <div>
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
            C
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChronoHub
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role} Portal
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="px-4 space-y-2 mt-6">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Bottom - User Info without dropdown */}
      <div className="p-5 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br 
            from-blue-600 to-purple-600 
            flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
