import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br 
    from-indigo-50 via-white to-purple-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      <Sidebar />

      <div className="flex flex-col flex-grow h-screen overflow-hidden">
        <Navbar />
        <main className="flex-grow px-8 py-6 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
