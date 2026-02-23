import { Link } from "react-router-dom";

function GlobalFooter() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ChronoHub
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Your modern leave management platform for seamless team coordination and smarter workforce planning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Roles */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              For Teams
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Employees</li>
              <li>Managers</li>
              <li>Admins</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Contact
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              support@chronohub.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              +91 80000 00000
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ChronoHub. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with ❤️ for better leave management</p>
        </div>

      </div>
    </footer>
  );
}

export default GlobalFooter;