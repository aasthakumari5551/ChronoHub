import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedLeave, setSelectedLeave] = useState(null);

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

  const updateLeaveStatus = async (id, status) => {
    try {
      await API.put(`/leaves/${id}`, { status });
      toast.success(`Leave request ${status}`);
      fetchLeaves();
    } catch (error) {
      toast.error("Failed to update leave status");
    }
  };

  const deleteLeave = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?")) return;
    
    try {
      await API.delete(`/leaves/${id}`);
      toast.success("Leave request deleted successfully");
      fetchLeaves();
    } catch (error) {
      toast.error("Failed to delete leave request");
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.leaveType?.toLowerCase().includes(search.toLowerCase()) ||
      leave.employee?.name?.toLowerCase().includes(search.toLowerCase()) ||
      leave.employee?.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || leave.status === filter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = leaves.filter(l => l.status === "pending").length;
  const approvedCount = leaves.filter(l => l.status === "approved").length;
  const rejectedCount = leaves.filter(l => l.status === "rejected").length;

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
          className="space-y-6 relative z-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Leave Requests
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Manage and review all employee leave requests
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/60 dark:border-gray-800/60">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{leaves.length}</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/60 dark:border-gray-800/60">
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/60 dark:border-gray-800/60">
              <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/60 dark:border-gray-800/60">
              <p className="text-sm text-gray-500 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name, email or leave type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </motion.div>

          {/* Leaves Table */}
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
                  {search || filter !== "all" ? "No leave requests found matching your filters" : "No leave requests found"}
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
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Leave Type
                      </th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Dates
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
                    {filteredLeaves.map((leave, index) => (
                      <motion.tr
                        key={leave._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
                              flex items-center justify-center text-white font-bold">
                              {leave.employee?.name?.charAt(0) || "?"}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{leave.employee?.name || "Unknown"}</p>
                              <p className="text-xs text-gray-500 md:hidden">{leave.employee?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300 hidden md:table-cell">
                          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
                            {leave.leaveType}
                          </span>
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          <p className="text-sm">{formatDate(leave.fromDate)}</p>
                          <p className="text-xs text-gray-500">to {formatDate(leave.toDate)}</p>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              leave.status === "approved"
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                : leave.status === "rejected"
                                ? "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedLeave(leave)}
                              className="px-3 py-1.5 text-sm rounded-xl 
                                bg-gradient-to-r from-blue-500 to-purple-500 
                                text-white font-semibold hover:shadow-lg transition-all"
                            >
                              View
                            </motion.button>
                            {leave.status === "pending" && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => updateLeaveStatus(leave._id, "approved")}
                                  className="px-3 py-1.5 text-sm rounded-xl 
                                    bg-gradient-to-r from-green-500 to-emerald-500 
                                    text-white font-semibold hover:shadow-lg transition-all"
                                >
                                  ✓
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => updateLeaveStatus(leave._id, "rejected")}
                                  className="px-3 py-1.5 text-sm rounded-xl 
                                    bg-gradient-to-r from-red-500 to-rose-500 
                                    text-white font-semibold hover:shadow-lg transition-all"
                                >
                                  ✕
                                </motion.button>
                              </>
                            )}
                          </div>
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

      {/* Leave Details Modal */}
      <AnimatePresence>
        {selectedLeave && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLeave(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
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
                  <p className="text-sm text-gray-500">Employee</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedLeave.employee?.name}</p>
                  <p className="text-xs text-gray-500">{selectedLeave.employee?.email}</p>
                </div>

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

              {selectedLeave.status === "pending" && (
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      updateLeaveStatus(selectedLeave._id, "approved");
                      setSelectedLeave(null);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold"
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      updateLeaveStatus(selectedLeave._id, "rejected");
                      setSelectedLeave(null);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold"
                  >
                    Reject
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default AdminLeaves;
