import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const { data } = await API.get("/leaves");
      setLeaves(data);
    } catch (error) {
      toast.error("Failed to fetch leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, status, employeeName) => {
    try {
      await API.put(`/leaves/${id}`, { status });
      toast.success(`Leave request ${status} for ${employeeName}`);
      fetchLeaves();
    } catch (error) {
      toast.error(`Failed to ${status} leave request`);
    }
  };

  const pending = leaves.filter(l => l.status === "pending").length;
  const approved = leaves.filter(l => l.status === "approved").length;
  const rejected = leaves.filter(l => l.status === "rejected").length;

  // Chart data for Leave Status Distribution
  const statusChartData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        label: "Leave Requests",
        data: [pending, approved, rejected],
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

  // Chart data for Leave Requests by Type
  const leaveTypes = {};
  leaves.forEach(leave => {
    leaveTypes[leave.leaveType] = (leaveTypes[leave.leaveType] || 0) + 1;
  });

  const typeChartData = {
    labels: Object.keys(leaveTypes),
    datasets: [
      {
        label: "Number of Requests",
        data: Object.values(leaveTypes),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
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

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
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
              Manager Dashboard
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Review and manage leave requests from your team
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60
                hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {pending}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ⏳
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Approved Leaves</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {approved}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ✅
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60
                hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rejected Requests</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                    {rejected}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ❌
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Charts */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Leave Status Distribution
              </h3>
              <div className="h-64">
                <Doughnut data={statusChartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Leave Requests by Type
              </h3>
              <div className="h-64">
                <Bar data={typeChartData} options={chartOptions} />
              </div>
            </div>
          </motion.div>

          {/* Leave Requests Table */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Pending Leave Requests
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
            ) : leaves.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-500 dark:text-gray-400">
                  No leave requests found
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Leave Type
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map((leave, index) => (
                      <motion.tr
                        key={leave._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {leave.employee?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {leave.employee?.email || ""}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                            {leave.leaveType}
                          </span>
                        </td>

                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          <div className="text-sm">
                            <p>{formatDate(leave.fromDate)}</p>
                            <p className="text-gray-500">to</p>
                            <p>{formatDate(leave.toDate)}</p>
                          </div>
                        </td>

                        <td className="p-4 text-gray-700 dark:text-gray-300 text-sm max-w-xs truncate">
                          {leave.reason}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-white text-xs font-bold uppercase shadow-md ${
                              leave.status === "approved"
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : leave.status === "rejected"
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-600"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>

                        <td className="p-4">
                          {leave.status === "pending" && (
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateStatus(leave._id, "approved", leave.employee?.name || "Employee")}
                                className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all"
                              >
                                ✓ Approve
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateStatus(leave._id, "rejected", leave.employee?.name || "Employee")}
                                className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
                              >
                                ✗ Reject
                              </motion.button>
                            </div>
                          )}
                          {leave.status !== "pending" && (
                            <span className="text-gray-400 text-xs">No action needed</span>
                          )}
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

export default ManagerDashboard;
