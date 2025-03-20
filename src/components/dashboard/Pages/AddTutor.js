import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./styles/AddTutor.css";
import axios from "axios";


const AddTutor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:4000/api/v1/tutor',
      formData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const newNotification = {
      message: 'Added new tutor "' + formData.name+ '" ', 
      status: 'unread'
    }
    const responseNot = await axios.post('http://localhost:4000/api/v1/notifications',
      newNotification,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('====================================');
    console.log(responseNot);
    console.log('====================================');

    console.log("Tutor Data Submitted:", response);
    setFormData({
      name: "",
      email: "",
      expertise: "",
    }); // Reset form
  };

  return (
    <div className="main">
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
        <main className="p-4">
          <div className="mx-auto max-w-4xl">
            {/* Page Title */}
            <div className="mb-6 p-4">
              <h1 className="text-2xl font-bold text-white">Add New Tutor</h1>
              <p className="text-gray-300 text-sm">
                Fill in the form below to add a new tutor.
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
                    placeholder="Enter tutor's name"
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
                    placeholder="Enter tutor's email"
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="expertise" className="block text-gray-200 text-sm font-medium">
                    Expertise
                  </label>
                  <input
                    type="text"
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="Enter expertise (e.g., Math, Science)"
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-200 font-medium"
                  >
                    Add Tutor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default AddTutor;
