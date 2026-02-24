import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">

      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm z-50 border-b border-gray-200/60 dark:border-gray-800/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
              C
            </div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChronoHub
            </h1>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            <Link
              to="/login"
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-32 px-4 sm:px-6 overflow-hidden 
      bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

        <div className="absolute -top-40 -left-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-400/30 rounded-full blur-[80px] sm:blur-[120px] -z-10" />
        <div className="absolute -bottom-40 -right-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-400/30 rounded-full blur-[80px] sm:blur-[120px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-6xl mx-auto text-center"
        >
          <p className="text-blue-600 font-semibold text-sm sm:text-lg mb-4 sm:mb-6">
            Your Workforce, Our Priority
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
            <span className="text-gray-900 dark:text-white">
              Find Your Perfect Leave
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Management Solution
            </span>
          </h2>

          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
            Manage leave requests effortlessly, streamline approvals,
            and track employee availability in real-time with our
            modern HR platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5">
            <Link
              to="/register"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all font-semibold text-base sm:text-lg"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all font-semibold text-base sm:text-lg"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40" />

      {/* WHY SECTION */}
      <section className="py-16 sm:py-28 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Why Choose ChronoHub?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Everything you need for seamless leave management
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              icon: "📅",
              title: "Smart Leave Requests",
              desc: "Apply in seconds with automatic leave balance tracking.",
            },
            {
              icon: "✅",
              title: "Approval Workflow",
              desc: "Managers approve or reject instantly with notifications.",
            },
            {
              icon: "📊",
              title: "Real-Time Tracking",
              desc: "Monitor leave history and team availability easily.",
            },
            {
              icon: "🔒",
              title: "Role-Based Access",
              desc: "Secure dashboards for Employees, Managers, and Admins.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg
              border border-gray-200/60 dark:border-gray-800/60
              rounded-2xl p-5 sm:p-8 shadow-md
              hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)]
              hover:-translate-y-4
              hover:border-purple-300 dark:hover:border-purple-700
              transition-all duration-300"
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 mb-4 sm:mb-6 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                {feature.title}
              </h4>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Get Started?
          </h3>

          <p className="text-base sm:text-xl opacity-90 mb-8 sm:mb-10">
            Join thousands of teams managing leave effortlessly.
          </p>

          <Link
            to="/register"
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-white text-purple-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg"
          >
            Create Free Account →
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
