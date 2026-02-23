import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Welcome back, <span className="font-semibold text-gray-900">{user?.name}</span>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* User Info */}
        <div className="text-right hidden sm:block bg-gray-50 px-4 py-2 rounded-lg">
          <p className="text-sm font-semibold text-gray-900">
            {user?.name}
          </p>
          <p className="text-xs text-gray-600 capitalize font-medium">
            {user?.role}
          </p>
        </div>

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-blue-100">
          {getInitial(user?.name)}
        </div>

      </div>

    </div>
  );
}

export default Navbar;