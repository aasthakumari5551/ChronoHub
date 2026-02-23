import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
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
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Manager Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Review and manage team leave requests</p>
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

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {/* Leave Status Chart */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Leave Status Distribution
            </h2>
            <div className="h-64 sm:h-80">
              <Doughnut data={statusChartData} options={chartOptions} />
            </div>
          </div>

          {/* Leave Types Chart */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Leave Requests by Type
            </h2>
            <div className="h-64 sm:h-80">
              {Object.keys(leaveTypes).length > 0 ? (
                <Bar data={typeChartData} options={barChartOptions} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No leave types data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl">📋</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Leave Requests
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-500 mt-4">Loading leave requests...</p>
            </div>
          ) : leaves.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-500 text-lg">No leave requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs sm:text-sm uppercase font-semibold">
                      <th className="p-3 sm:p-4">Employee</th>
                      <th className="p-3 sm:p-4 hidden sm:table-cell">Type</th>
                      <th className="p-3 sm:p-4 hidden md:table-cell">From</th>
                      <th className="p-3 sm:p-4 hidden md:table-cell">To</th>
                      <th className="p-3 sm:p-4">Status</th>
                      <th className="p-3 sm:p-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaves.map((leave) => (
                      <tr
                        key={leave._id}
                        className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="p-3 sm:p-4 font-semibold text-gray-900">
                          <div>
                            <div className="font-semibold">{leave.employee?.name || "N/A"}</div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {leave.leaveType} • {new Date(leave.fromDate).toLocaleDateString()}
                            </div>
                          </div>
                        </td>

                        <td className="p-3 sm:p-4 text-gray-700 hidden sm:table-cell">{leave.leaveType}</td>

                        <td className="p-3 sm:p-4 text-gray-700 hidden md:table-cell">
                          {new Date(leave.fromDate).toLocaleDateString()}
                        </td>

                        <td className="p-3 sm:p-4 text-gray-700 hidden md:table-cell">
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

                        <td className="p-3 sm:p-4">
                          {leave.status === "pending" && (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                onClick={() => updateStatus(leave._id, "approved", leave.employee?.name || "Employee")}
                                className="px-3 sm:px-5 py-2 text-xs sm:text-sm rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                              >
                                ✓ Approve
                              </button>

                              <button
                                onClick={() => updateStatus(leave._id, "rejected", leave.employee?.name || "Employee")}
                                className="px-3 sm:px-5 py-2 text-xs sm:text-sm rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                              >
                                ✗ Reject
                              </button>
                            </div>
                          )}
                          {leave.status !== "pending" && (
                            <span className="text-gray-400 text-xs sm:text-sm">No action needed</span>
                          )}
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

export default ManagerDashboard;
