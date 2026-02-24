import { useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ThemeToggle from "../../components/ThemeToggle";

function Navbar({ openLeaveModal }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
    border-b border-gray-200/60 dark:border-gray-800/60
    px-8 py-4 flex justify-between items-center"
    >

      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here is a quick overview of your dashboard.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-4 py-2 
              bg-gray-50 dark:bg-gray-800/50 rounded-xl 
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-all
              border border-gray-200 dark:border-gray-700"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br 
              from-blue-600 to-purple-600 
              flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 
                  bg-white dark:bg-gray-900 rounded-xl shadow-xl 
                  border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              >
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
                  <p className="font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-white/80">{user?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={handleEditProfile}
                    className="w-full flex items-center gap-3 px-4 py-3 
                      text-gray-700 dark:text-gray-300 
                      hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    <span className="text-lg">✏️</span> 
                    <span className="font-medium">Edit Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/calendar");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 
                      text-gray-700 dark:text-gray-300 
                      hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    <span className="text-lg">📅</span> 
                    <span className="font-medium">Calendar</span>
                  </button>

                  <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 
                      text-red-600 dark:text-red-400 
                      hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <span className="text-lg">🚪</span> 
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}

export default Navbar;
