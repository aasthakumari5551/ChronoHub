import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import API from "../../api/axios";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  
  const [searchParams] = useSearchParams();
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const fetchLeaves = async () => {
    try {
      const { data } = await API.get("/leaves");
      setLeaves(data);
    } catch (err) {
      toast.error("Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
    
    const applyParam = searchParams.get("apply");
    if (applyParam === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.leaveType.toLowerCase().includes(search.toLowerCase())
  );

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
      setIsModalOpen(false);
      fetchLeaves();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit leave request");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this leave request?")) return;
    
    try {
      await API.put(`/leaves/${id}/cancel`, { status: "cancelled" });
      toast.success("Leave request cancelled successfully");
      fetchLeaves();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel leave request");
    }
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
    visible: { opacity: 1, y: 0 },
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
                  My Leaves
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Track and manage your time off requests
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                  text-white rounded-xl shadow-lg hover:shadow-2xl 
                  transition-all font-semibold flex items-center gap-2"
              >
                <span className="text-lg">+</span> Apply for Leave
              </motion.button>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60 p-5">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search requests by type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full md:w-1/2 pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
          >
            {loading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"
                />
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : filteredLeaves.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-500 dark:text-gray-400">
                  No leave records found
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Leave Type
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Duration
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
                    {filteredLeaves.map((leave, index) => {
                      const duration =
                        (new Date(leave.toDate) - new Date(leave.fromDate)) /
                        (1000 * 60 * 60 * 24) + 1;

                      return (
                        <motion.tr
                          key={leave._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        >
                          <td className="p-4">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                              {leave.leaveType}
                            </span>
                          </td>
                          <td className="p-4 text-gray-700 dark:text-gray-300">
                            {formatDate(leave.fromDate)}
                          </td>
                          <td className="p-4 text-gray-700 dark:text-gray-300">
                            {formatDate(leave.toDate)}
                          </td>
                          <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">
                            {duration} {duration === 1 ? "day" : "days"}
                          </td>
                          <td className="p-4">
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
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedLeave(leave)}
                                className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600"
                              >
                                👁
                              </motion.button>

                              {leave.status === "pending" && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleCancel(leave._id)}
                                  className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600"
                                  title="Cancel Leave"
                                >
                                  ✖
                                </motion.button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
              Showing {filteredLeaves.length} records
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* APPLY LEAVE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg p-8 rounded-2xl shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
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
      </AnimatePresence>

      {/* VIEW LEAVE DETAILS MODAL */}
      <AnimatePresence>
        {selectedLeave && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedLeave(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-2xl"
            >
              <button
                onClick={() => setSelectedLeave(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Leave Details
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-sm text-gray-500">Leave Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedLeave.leaveType}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-sm text-gray-500">From Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(selectedLeave.fromDate)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-sm text-gray-500">To Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(selectedLeave.toDate)}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedLeave.reason}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      selectedLeave.status === "approved"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : selectedLeave.status === "rejected"
                        ? "bg-gradient-to-r from-red-500 to-rose-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}
                  >
                    {selectedLeave.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default MyLeaves;
