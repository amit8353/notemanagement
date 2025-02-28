import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeContextProvider from "../context/ThemeContextProvider";


const LayoutSection = ({ children }) => {
    return (
      <ThemeContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="sidebarapp grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
          <Navbar />
          <div className="p-4 addbynewclass">{children}</div>
        </div>
      </div> 
      </ThemeContextProvider>
    );
  };
  

export default LayoutSection;
