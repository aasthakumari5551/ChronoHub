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

  const pending = leaves.filter((l) => l.status === "pending").length;
  const approved = leaves.filter((l) => l.status === "approved").length;
  const rejected = leaves.filter((l) => l.status === "rejected").length;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <Layout>
      <div className="p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6">

        {/* Leave Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Pending */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⏳</span>
              <span className="text-xs font-semibold text-yellow-700 bg-yellow-200 px-2.5 py-0.5 rounded-full uppercase">Pending</span>
            </div>
            <h3 className="text-xs text-gray-500 mb-0.5">Pending Requests</h3>
            <p className="text-3xl font-bold text-yellow-700">{pending}</p>
          </div>

          {/* Approved */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">✅</span>
              <span className="text-xs font-semibold text-green-700 bg-green-200 px-2.5 py-0.5 rounded-full uppercase">Approved</span>
            </div>
            <h3 className="text-xs text-gray-500 mb-0.5">Approved Leaves</h3>
            <p className="text-3xl font-bold text-green-700">{approved}</p>
          </div>

          {/* Rejected */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">❌</span>
              <span className="text-xs font-semibold text-red-700 bg-red-200 px-2.5 py-0.5 rounded-full uppercase">Rejected</span>
            </div>
            <h3 className="text-xs text-gray-500 mb-0.5">Rejected Requests</h3>
            <p className="text-3xl font-bold text-red-700">{rejected}</p>
          </div>
        </div>

        {/* Leave Request Form */}
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">📝</span>
            <h2 className="text-lg font-bold text-gray-900">Apply for Leave</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Row 1: Leave Type + Reason */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Leave Type</label>
                <input
                  type="text"
                  placeholder="e.g., Sick Leave, Vacation, Personal"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason</label>
                <input
                  type="text"
                  placeholder="Brief reason for leave"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Row 2: From Date + To Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">From Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">To Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Submit Leave Request
            </button>
          </form>
        </div>

        {/* Leave History */}
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">📋</span>
            <h2 className="text-lg font-bold text-gray-900">
              My Leave History
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-500 mt-4 text-sm">Loading your leaves...</p>
            </div>
          ) : leaves.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-3 block">📭</span>
              <p className="text-gray-500 text-base">No leaves applied yet.</p>
              <p className="text-gray-400 text-sm mt-1">Submit your first leave request above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Type</th>
                    <th className="py-3 px-4 font-semibold hidden sm:table-cell">From</th>
                    <th className="py-3 px-4 font-semibold hidden sm:table-cell">To</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {leaves.map((leave) => (
                    <tr
                      key={leave._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-gray-800">
                        <div>
                          <div className="font-medium">{leave.leaveType}</div>
                          <div className="text-xs text-gray-400 sm:hidden mt-0.5">
                            {formatDate(leave.fromDate)} — {formatDate(leave.toDate)}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden sm:table-cell">
                        {formatDate(leave.fromDate)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden sm:table-cell">
                        {formatDate(leave.toDate)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide ${leave.status === "approved"
                              ? "bg-green-500"
                              : leave.status === "rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
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
          )}
        </div>

      </div>
    </Layout>
  );
}

export default EmployeeDashboard;
