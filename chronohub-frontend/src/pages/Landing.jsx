import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white text-lg sm:text-xl font-bold">C</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChronoHub
            </h1>
          </Link>

          <div className="flex gap-2 sm:gap-3">
            <Link
              to="/login"
              className="px-4 sm:px-5 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-gray-50 text-sm sm:text-base"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all font-semibold text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-blue-600 font-semibold text-base sm:text-lg">Your Workforce, Our Priority</p>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
              Find Your Perfect Leave
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Management Solution
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with your team seamlessly, manage leave requests effortlessly, and track approvals instantly with our modern HR platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <Link
              to="/register"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all font-semibold text-base sm:text-lg text-center"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all font-semibold text-base sm:text-lg text-center"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10" />
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ChronoHub?
            </h3>
            <p className="text-xl text-gray-600">
              Everything you need for seamless leave management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "✅",
                title: "Verified Employees",
                desc: "All users are verified with complete profiles and role-based access"
              },
              {
                icon: "📅",
                title: "Easy Booking",
                desc: "Request leave in seconds with instant status updates and confirmation"
              },
              {
                icon: "📊",
                title: "Real-Time Tracking",
                desc: "Monitor leave status, approvals, and team availability in real-time"
              },
              {
                icon: "🔒",
                title: "Secure & Reliable",
                desc: "Enterprise-grade security with role-based access control and JWT authentication"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Role
            </h3>
            <p className="text-xl text-gray-600">
              Tailored dashboards and workflows for each user type
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Employee",
                icon: "👤",
                desc: "Apply for leave, track your request status, and view your complete leave history with ease.",
                features: ["Quick Leave Application", "Status Tracking", "Leave History"]
              },
              {
                title: "Manager",
                icon: "👔",
                desc: "Approve or reject leave requests, monitor team availability, and manage your team's leave calendar.",
                features: ["Request Approval", "Team Monitoring", "Calendar View"]
              },
              {
                title: "Admin",
                icon: "⚙️",
                desc: "Manage users, assign roles, view comprehensive analytics, and control system-wide settings.",
                features: ["User Management", "Analytics Dashboard", "System Settings"]
              }
            ].map((role, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-4">{role.icon}</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{role.desc}</p>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl opacity-95 mb-8">
            Join thousands of teams who trust ChronoHub for their leave management needs
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-xl hover:scale-105 transition-all text-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="text-white font-semibold">ChronoHub</span>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} ChronoHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}