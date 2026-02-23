import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";

function EmployeeDashboard() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

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

    // Validate dates
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

      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit leave request");
    }
  };

  const pending = leaves.filter(l => l.status === "pending").length;
  const approved = leaves.filter(l => l.status === "approved").length;
  const rejected = leaves.filter(l => l.status === "rejected").length;

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Employee Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your leave requests and track your status</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">⏳</span>
              <span className="text-xs font-semibold text-yellow-700 bg-yellow-200 px-2 sm:px-3 py-1 rounded-full">PENDING</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1">Pending Requests</h3>
            <p className="text-2xl sm:text-4xl font-bold text-yellow-700">{pending}</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">✅</span>
              <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 sm:px-3 py-1 rounded-full">APPROVED</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1">Approved Leaves</h3>
            <p className="text-2xl sm:text-4xl font-bold text-green-700">{approved}</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">❌</span>
              <span className="text-xs font-semibold text-red-700 bg-red-200 px-2 sm:px-3 py-1 rounded-full">REJECTED</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1">Rejected Requests</h3>
            <p className="text-2xl sm:text-4xl font-bold text-red-700">{rejected}</p>
          </div>
        </div>

        {/* Apply Leave Form */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100 mb-6 sm:mb-10">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl">📝</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Apply for Leave
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Leave Type</label>
              <input
                type="text"
                placeholder="e.g., Sick Leave, Vacation, Personal"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
              <input
                type="text"
                placeholder="Brief reason for leave"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-base sm:text-lg"
              >
                Submit Leave Request
              </button>
            </div>
          </form>
        </div>

        {/* Leave List */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl">📋</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              My Leave History
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-500 mt-4">Loading your leaves...</p>
            </div>
          ) : leaves.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-500 text-lg">No leaves applied yet.</p>
              <p className="text-gray-400 text-sm mt-2">Submit your first leave request above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs sm:text-sm uppercase font-semibold">
                      <th className="p-3 sm:p-4">Type</th>
                      <th className="p-3 sm:p-4 hidden sm:table-cell">From</th>
                      <th className="p-3 sm:p-4 hidden sm:table-cell">To</th>
                      <th className="p-3 sm:p-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaves.map((leave) => (
                      <tr
                        key={leave._id}
                        className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="p-3 sm:p-4 font-medium text-gray-900">
                          <div>
                            <div className="font-semibold">{leave.leaveType}</div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-gray-700 hidden sm:table-cell">
                          {new Date(leave.fromDate).toLocaleDateString()}
                        </td>
                        <td className="p-3 sm:p-4 text-gray-700 hidden sm:table-cell">
                          {new Date(leave.toDate).toLocaleDateString()}
                        </td>
                        <td className="p-3 sm:p-4">
                          <span
                            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-white text-xs font-bold uppercase shadow-md ${
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default EmployeeDashboard;
