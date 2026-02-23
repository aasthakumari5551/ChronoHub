import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex justify-between items-center shadow-sm transition-colors duration-300">
      
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Welcome back,{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {user?.name}
          </span>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {user?.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {user?.role}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {getInitial(user?.name)}
        </div>
      </div>
    </div>
  );
}

export default Navbar;