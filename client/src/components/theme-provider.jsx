/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="min-h-screen bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200">
        {children}
      </div>
    </div>
  );
}
