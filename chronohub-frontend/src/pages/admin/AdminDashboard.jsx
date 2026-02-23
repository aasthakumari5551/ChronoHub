import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
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

  // Chart data for Leave Statistics
  const leaveStatusCounts = {
    pending: leaves.filter(l => l.status === "pending").length,
    approved: leaves.filter(l => l.status === "approved").length,
    rejected: leaves.filter(l => l.status === "rejected").length,
  };

  const leaveChartData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        label: "Leave Requests",
        data: [leaveStatusCounts.pending, leaveStatusCounts.approved, leaveStatusCounts.rejected],
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
            Admin Panel
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage users, roles, and system settings</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">👥</span>
              <span className="text-xs font-semibold text-blue-700 bg-blue-200 px-2 sm:px-3 py-1 rounded-full">TOTAL</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1">Total Users</h3>
            <p className="text-2xl sm:text-4xl font-bold text-blue-700">{totalUsers}</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">👤</span>
              <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 sm:px-3 py-1 rounded-full">EMPLOYEES</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1">Employees</h3>
            <p className="text-2xl sm:text-4xl font-bold text-green-700">{employees}</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">👔</span>
              <span className="text-xs font-semibold text-yellow-700 bg-yellow-200 px-2 sm:px-3 py-1 rounded-full">MANAGERS</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1">Managers</h3>
            <p className="text-2xl sm:text-4xl font-bold text-yellow-700">{managers}</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl sm:text-3xl">⚙️</span>
              <span className="text-xs font-semibold text-purple-700 bg-purple-200 px-2 sm:px-3 py-1 rounded-full">ADMINS</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600 mb-1">Admins</h3>
            <p className="text-2xl sm:text-4xl font-bold text-purple-700">{admins}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {/* User Roles Chart */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              User Roles Distribution
            </h2>
            <div className="h-64 sm:h-80">
              <Doughnut data={roleChartData} options={chartOptions} />
            </div>
          </div>

          {/* Leave Statistics Chart */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Leave Statistics
            </h2>
            <div className="h-64 sm:h-80">
              <Bar data={leaveChartData} options={barChartOptions} />
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl">👥</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              User Management
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-gray-500 mt-4">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-500 text-lg">No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs sm:text-sm uppercase font-semibold">
                      <th className="p-3 sm:p-4">Name</th>
                      <th className="p-3 sm:p-4 hidden sm:table-cell">Email</th>
                      <th className="p-3 sm:p-4">Role</th>
                      <th className="p-3 sm:p-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="p-3 sm:p-4 font-semibold text-gray-900">
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-xs text-gray-500 sm:hidden">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 text-gray-700 hidden sm:table-cell">{user.email}</td>

                        <td className="p-3 sm:p-4">
                          <select
                            value={user.role}
                            onChange={(e) => updateRole(user._id, e.target.value, user.name)}
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                          >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>

                        <td className="p-3 sm:p-4">
                          <button
                            onClick={() => deleteUser(user._id, user.name)}
                            className="px-3 sm:px-5 py-2 text-xs sm:text-sm rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                          >
                            Delete
                          </button>
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

export default AdminDashboard;
