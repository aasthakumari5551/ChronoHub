import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";
import Layout from "../components/layout/Layout";

function Settings() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Define notification options based on user role
  const getNotificationOptions = () => {
    const commonOptions = [
      { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
    ];

    const employeeOptions = [
      { key: "leaveApproved", label: "Leave Approved", desc: "Get notified when your leave is approved" },
      { key: "leaveRejected", label: "Leave Rejected", desc: "Get notified when your leave is rejected" },
      { key: "leaveReminders", label: "Leave Reminders", desc: "Get reminders for upcoming leaves" },
      { key: "weeklyReports", label: "Weekly Reports", desc: "Receive weekly leave summary reports" },
    ];

    const managerOptions = [
      { key: "newLeaveRequest", label: "New Leave Requests", desc: "Get notified when employees submit leave requests" },
      { key: "leaveCancelled", label: "Leave Cancelled", desc: "Get notified when employees cancel leave requests" },
      { key: "weeklyTeamReports", label: "Weekly Team Reports", desc: "Receive weekly summary of team leave requests" },
      { key: "approvalReminders", label: "Approval Reminders", desc: "Get reminders for pending leave approvals" },
    ];

    const adminOptions = [
      { key: "newUserRegistration", label: "New User Registrations", desc: "Get notified when new users register" },
      { key: "systemAlerts", label: "System Alerts", desc: "Get important system notifications" },
      { key: "weeklySummary", label: "Weekly Summary", desc: "Receive weekly platform usage summary" },
      { key: "approvalReminders", label: "Approval Reminders", desc: "Get reminders for pending approvals" },
    ];

    switch (user?.role) {
      case "manager":
        return [...commonOptions, ...managerOptions];
      case "admin":
        return [...commonOptions, ...adminOptions];
      case "employee":
      default:
        return [...commonOptions, ...employeeOptions];
    }
  };

  const notificationOptions = getNotificationOptions();
  
  // Initialize state with default values
  const initialNotifications = {
    email: true,
    leaveApproved: false,
    leaveRejected: false,
    leaveReminders: false,
    weeklyReports: false,
    newLeaveRequest: false,
    leaveCancelled: false,
    weeklyTeamReports: false,
    approvalReminders: false,
    newUserRegistration: false,
    systemAlerts: false,
    weeklySummary: false,
  };
  
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showEmail: false,
    showPhone: false,
  });

  const [loading, setLoading] = useState(false);

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success("Notification settings updated!");
  };

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success("Privacy settings updated!");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (!confirmDelete) return;
    
    const doubleConfirm = window.confirm(
      "This is your final warning. All your data will be permanently deleted. Continue?"
    );
    
    if (!doubleConfirm) return;
    
    try {
      setLoading(true);
      await API.delete(`/users/${user._id}`);
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

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

  // Get role-specific title
  const getRoleTitle = () => {
    switch (user?.role) {
      case "manager":
        return "Manager";
      case "admin":
        return "Admin";
      case "employee":
      default:
        return "Employee";
    }
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
          className="space-y-8 relative z-10 max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Manage your account settings and preferences
            </p>
          </motion.div>

          {/* Notification Settings - Role Based */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🔔</span> Notification Preferences
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose what notifications you want to receive based on your role
              </p>
            </div>

            <div className="p-6 space-y-4">
              {notificationOptions.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key)}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      notifications[item.key] 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span 
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                        notifications[item.key] ? "left-8" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🔒</span> Privacy Settings
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Control who can see your information
              </p>
            </div>

            <div className="p-6 space-y-4">
              {[
                { key: "showProfile", label: "Show Profile", desc: "Allow others to view your profile" },
                { key: "showEmail", label: "Show Email", desc: "Display your email address to others" },
                { key: "showPhone", label: "Show Phone", desc: "Display your phone number to others" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(item.key)}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      privacy[item.key] 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span 
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                        privacy[item.key] ? "left-8" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
              rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>⚙️</span> Account
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage your account settings
              </p>
            </div>

            <div className="p-6 space-y-4">
              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">✏️</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">Edit Profile</p>
                    <p className="text-sm text-gray-500">Update your personal information</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                onClick={() => navigate("/calendar")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📅</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">View Calendar</p>
                    <p className="text-sm text-gray-500">Check holidays and leave schedule</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🗑️</span>
                    <div className="text-left">
                      <p className="font-semibold text-red-600 dark:text-red-400">Delete Account</p>
                      <p className="text-sm text-red-500">Permanently delete your account and data</p>
                    </div>
                  </div>
                  <span className="text-red-400">→</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* App Info */}
          <motion.div variants={itemVariants} className="text-center pb-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              ChronoHub v1.0.0 • Made with ❤️
            </p>
          </motion.div>

        </motion.div>
      </div>
    </Layout>
  );
}

export default Settings;
