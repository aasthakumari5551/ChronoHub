import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchLeaves = async () => {
    try {
      const { data } = await API.get("/leaves");
      setLeaves(data);
    } catch (error) {
      toast.error("Failed to fetch leave data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaves();
  }, []);

  const updateRole = async (id, role, userName) => {
    try {
      await API.put(`/users/${id}`, { role });
      toast.success(`${userName}'s role updated to ${role}`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const deleteUser = async (id, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) return;
    
    try {
      await API.delete(`/users/${id}`);
      toast.success(`${userName} deleted successfully`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const totalUsers = users.length;
  const employees = users.filter(u => u.role === "employee").length;
  const managers = users.filter(u => u.role === "manager").length;
  const admins = users.filter(u => u.role === "admin").length;

  // Chart data for User Roles Distribution
  const roleChartData = {
    labels: ["Employees", "Managers", "Admins"],
    datasets: [
      {
        label: "Users",
        data: [employees, managers, admins],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(168, 85, 247, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart data for Leave Status
  const leaveStatus = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        label: "Leave Requests",
        data: [
          leaves.filter(l => l.status === "pending").length,
          leaves.filter(l => l.status === "approved").length,
          leaves.filter(l => l.status === "rejected").length,
        ],
        backgroundColor: [
          "rgba(234, 179, 8, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background Effects */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] -z-10" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 relative z-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Manage users, roles, and view system statistics
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800 hover:shadow-/60
               2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    {totalUsers}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👥
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60
                hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Employees</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {employees}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👤
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60
                hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Managers</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {managers}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💼
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60
                hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {admins}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Charts */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                User Roles Distribution
              </h3>
              <div className="h-64">
                <Doughnut data={roleChartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Leave Request Status
              </h3>
              <div className="h-64">
                <Bar data={leaveStatus} options={chartOptions} />
              </div>
            </div>
          </motion.div>

          {/* Users Table */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                User Management
              </h3>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"
                />
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-gray-500 dark:text-gray-400">
                  No users found
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Email
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
                              flex items-center justify-center text-white font-bold">
                              {user.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-xs text-gray-500 sm:hidden">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                          {user.email}
                        </td>

                        <td className="p-4">
                          <select
                            value={user.role}
                            onChange={(e) => updateRole(user._id, e.target.value, user.name)}
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm rounded-xl border-2 
                              border-gray-200 dark:border-gray-700 
                              bg-white dark:bg-gray-800 
                              text-gray-900 dark:text-white
                              focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 
                              transition-all font-medium"
                          >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        <td className="p-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteUser(user._id, user.name)}
                            className="px-4 py-2 text-xs sm:text-sm rounded-xl 
                              bg-gradient-to-r from-red-500 to-red-600 
                              text-white font-semibold hover:shadow-lg transition-all"
                          >
                            Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
