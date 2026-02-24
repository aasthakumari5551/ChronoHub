import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

function EmployeeDashboard() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const fetchLeaves = async () => {
    try {
      const { data } = await API.get("/leaves");
      setLeaves(data);
    } catch (error) {
      toast.error("Failed to fetch your leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(fromDate) > new Date(toDate)) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      await API.post("/leaves", {
        leaveType,
        fromDate,
        toDate,
        reason,
      });

      toast.success("Leave request submitted successfully!");

      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
      setIsLeaveModalOpen(false);

      fetchLeaves();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit leave request"
      );
    }
  };

  const pending = leaves.filter((l) => l.status === "pending").length;
  const approved = leaves.filter((l) => l.status === "approved").length;
  const rejected = leaves.filter((l) => l.status === "rejected").length;

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
      transition: {
        staggerChildren: 0.1,
      },
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Leave Dashboard
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Track and manage your time off requests
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLeaveModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                  text-white rounded-xl shadow-lg hover:shadow-2xl 
                  transition-all font-semibold flex items-center gap-2"
              >
                <span className="text-lg">+</span> Apply for Leave
              </motion.button>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            {/* Pending Card */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                rounded-2xl p-6 shadow-md border border-gray-200/60 dark:border-gray-800/60
                hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
                  <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    {pending}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  ⏳
                </div>
              </div>
            </motion.div>

            {/* Approved Card */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
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
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  ✅
                </div>
              </div>
            </motion.div>

            {/* Rejected Card */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
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
                  flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  ❌
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Leave History */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              p-6 lg:p-8 rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Leave History
              </h2>
              <Link
                to="/employee/leaves"
                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
              >
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"
                />
                Loading...
              </div>
            ) : leaves.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-500 dark:text-gray-400">
                  No leaves applied yet.
                </p>
                <button
                  onClick={() => setIsLeaveModalOpen(true)}
                  className="mt-4 text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                >
                  Apply for your first leave →
                </button>
              </motion.div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700 
                      text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">From</th>
                      <th className="py-3 px-4">To</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.slice(0, 5).map((leave, index) => {
                      const duration = Math.ceil(
                        (new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)
                      ) + 1;
                      return (
                        <motion.tr
                          key={leave._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-gray-100 dark:border-gray-800 
                            hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">
                            {leave.leaveType}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                            {formatDate(leave.fromDate)}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                            {formatDate(leave.toDate)}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                            {duration} {duration === 1 ? "day" : "days"}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                                leave.status === "approved"
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                  : leave.status === "rejected"
                                  ? "bg-gradient-to-r from-red-500 to-rose-500"
                                  : "bg-gradient-to-r from-yellow-500 to-orange-500"
                              }`}
                            >
                              {leave.status}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* MODAL */}
      {isLeaveModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsLeaveModalOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white dark:bg-gray-900 w-full max-w-lg p-8 rounded-2xl shadow-2xl"
          >
            <button
              onClick={() => setIsLeaveModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Apply for Leave
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Leave Type
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl 
                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                >
                  <option value="">Select leave type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl 
                      focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl 
                      focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Reason
                </label>
                <textarea
                  placeholder="Enter reason for leave..."
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl 
                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                  text-white rounded-xl font-semibold shadow-lg hover:shadow-xl 
                  transition-all"
              >
                Submit Leave Request
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}

export default EmployeeDashboard;
