import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700" : "";
  };


  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
      <>

        <button
            className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-md"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>


        <div
            className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
          bg-gray-800 text-white p-6
          fixed md:static 
          w-64 h-screen 
          transition-transform duration-300 ease-in-out
          z-10 overflow-y-auto
        `}
        >
          <h2 className="text-2xl font-semibold text-center mb-8">Admin Panel</h2>


          <ul>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/dashboard-overview"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/dashboard-overview")}`}
                  onClick={handleLinkClick}
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/add-course"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/add-course")}`}
                  onClick={handleLinkClick}
              >
                Add Course
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/add-section"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/add-section")}`}
                  onClick={handleLinkClick}
              >
                Add Section
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/add-student"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/add-student")}`}
                  onClick={handleLinkClick}
              >
                Add Student
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/add-tutor"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/add-tutor")}`}
                  onClick={handleLinkClick}
              >
                Add Tutor
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/add-event"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/add-event")}`}
                  onClick={handleLinkClick}
              >
                Add Event
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/list-courses"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/list-courses")}`}
                  onClick={handleLinkClick}
              >
                List Courses
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/list-students"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/list-students")}`}
                  onClick={handleLinkClick}
              >
                List Students
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/list-tutor"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/list-tutor")}`}
                  onClick={handleLinkClick}
              >
                List Tutors
              </Link>
            </li>
            <li className="mb-4">
              <Link
                  to="/dashboard/admin/notification-page"
                  className={`hover:bg-gray-700 p-2 rounded-md block ${isActive("/dashboard/admin/notification-page")}`}
                  onClick={handleLinkClick}
              >
                Notification-Page
              </Link>
            </li>
            <li className="mb-4">
              <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md log-out"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>


        {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                onClick={toggleSidebar}
            />
        )}
      </>
  );
};

export default Sidebar;
