import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import ThemeToggle from "../../components/ThemeToggle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      login(
        {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        data.token
      );

      toast.success(`Welcome back, ${data.name}!`);

      if (data.role === "admin") navigate("/admin");
      else if (data.role === "manager") navigate("/manager");
      else navigate("/employee");

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col transition-colors duration-300">

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-10 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-lg sm:text-xl font-bold">C</span>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChronoHub
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm sm:text-base">
              Login
            </span>

            <Link
              to="/register"
              className="px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <div className="p-6 sm:p-8 md:p-10">

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <span className="text-white text-2xl font-bold">C</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome Back
              </h1>

              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your account to continue
              </p>
            </div>

            <div className="mb-5">
              <GoogleAuthButton className="[&>div]:!w-full [&>div]:!flex [&>div]:!justify-center" />
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Link
                  to="/forgot-password"
                  className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
                >
                Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white font-bold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                Sign up
              </Link>
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;