import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:4000/api/v1/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id) => {
    setExpandedRows(expandedRows.includes(id)
        ? expandedRows.filter(rowId => rowId !== id)
        : [...expandedRows, id]
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/api/v1/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course deleted successfully");
      fetchCourses();
    } catch (err) {
      alert(err.response ? err.response.data.message : "Failed to delete course");
    }
  };

  return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
        <main className="p-4">
          <div className="mx-auto max-w-4xl">
            {/* Page Title */}
            <div className="mb-6 p-4">
              <h1 className="text-2xl font-bold text-white">List of Courses</h1>
              <p className="text-gray-300 text-sm">
                View all available courses below.
              </p>
            </div>

            {/* Courses Table */}
            <div className="bg-white/5 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 backdrop-blur-sm overflow-hidden">
              {loading ? (
                  <div className="p-8 text-center text-cyan-300">Loading courses...</div>
              ) : error ? (
                  <div className="p-8 text-center text-red-400">{error}</div>
              ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                      <tr className="border-b border-gray-700">
                        <th className="p-4 text-cyan-300">#</th>
                        <th className="p-4 text-cyan-300">Course Name</th>
                        <th className="p-4 text-cyan-300">Category</th>
                        <th className="p-4 text-cyan-300">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {courses.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="p-4 text-center text-gray-400">
                              No courses available
                            </td>
                          </tr>
                      ) : (
                          courses.map((course, index) => (
                              <React.Fragment key={course._id}>
                                <tr className="border-b border-gray-700/50 hover:bg-cyan-900/10 transition-colors">
                                  <td className="p-4 text-gray-300">{index + 1}</td>
                                  <td className="p-4 text-white">{course.courseName}</td>
                                  <td className="p-4 text-gray-300">{course.category?.name || "N/A"}</td>
                                  <td className="p-4">
                                    <button
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                        onClick={() => toggleRow(course._id)}
                                    >
                                      {expandedRows.includes(course._id) ?
                                          <ChevronUp size={20} /> :
                                          <ChevronDown size={20} />
                                      }
                                    </button>
                                  </td>
                                </tr>
                                {expandedRows.includes(course._id) && (
                                    <tr className="border-b border-gray-700/50">
                                      <td colSpan={4} className="p-4 bg-gray-800/30">
                                        <div className="space-y-3">
                                          <p className="text-gray-300">
                                            <span className="font-medium text-cyan-400">Description:</span> {course.courseDescription}
                                          </p>
                                          <p className="text-gray-300">
                                            <span className="font-medium text-cyan-400">Price:</span> ${course.price}
                                          </p>
                                          <p className="text-gray-300">
                                            <span className="font-medium text-cyan-400">Status:</span> {course.status}
                                          </p>
                                          <div className="flex space-x-4 mt-4">
                                            <button
                                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors duration-200"
                                                onClick={() => handleDelete(course._id)}
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                )}
                              </React.Fragment>
                          ))
                      )}
                      </tbody>
                    </table>
                  </div>
              )}
            </div>
          </div>
        </main>
      </div>
  );
};

export default ListCourses;
