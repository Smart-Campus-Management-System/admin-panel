import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/api/v1/student/add", formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

    if (response.status === 201) {
      const newNotification = {
        message: 'Added new student with name: "' + formData.name + '" ',
        status: 'unread'
      }
      const response = await axios.post('http://localhost:4000/api/v1/notifications',
        newNotification,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    }
    console.log("Student Data Submitted:", response);
    // Add logic to send formData to the backend
    setFormData({
      name: "",
      email: "",
      subject: "",
    }); // Reset form
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      <main className="p-4">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="mb-6 p-4">
            <h1 className="text-2xl font-bold text-white">Add New Student</h1>
            <p className="text-gray-300 text-sm">
              Fill in the form below to add a new student.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/5 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 backdrop-blur-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-gray-200 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student's name"
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-200 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter student's email"
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-gray-200 text-sm font-medium">
                  Subjects
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subjects (comma-separated)"
                  className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-200 font-medium"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddStudent;
