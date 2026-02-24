import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br 
    from-indigo-50 via-white to-purple-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;