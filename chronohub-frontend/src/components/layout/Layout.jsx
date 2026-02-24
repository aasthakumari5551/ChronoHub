import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br 
    from-indigo-50 via-white to-purple-50 
    dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile by default, slides in when open */}
      <div className={`
        fixed lg:relative z-50 lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-grow h-screen overflow-hidden w-full">
        {/* Navbar with integrated mobile menu button */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-4 lg:py-6 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
