import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        // Moon icon
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      ) : (
        // Sun icon
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;