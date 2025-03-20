import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Footer from "../Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./styles/ListTutor.css"
import axios from "axios";


const tutorsData = [
  {
    id: 1,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    subjects: "Mathematics, Physics",
    details: {
      phone: "123-456-7890",
      address: "456 Elm Street, Cityville",
      hireDate: "2022-09-10",
    },
  },
  {
    id: 2,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    subjects: "Biology, Chemistry",
    details: {
      phone: "987-654-3210",
      address: "789 Pine Avenue, Townsville",
      hireDate: "2021-06-25",
    },
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    subjects: "History, Geography",
    details: {
      phone: "555-555-5555",
      address: "123 Oak Road, Villagetown",
      hireDate: "2023-02-15",
    },
  },
];

const ListTutor = () => {
  const [tutorsData, setTutorsData] = useState([{
    name: '',
    email: '',
    expertise: ''
  }])
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    handleGetAll()
  }, [])

  const handleGetAll = async () => {
    const res = await axios.get('http://localhost:4000/api/v1/tutor/all')
    setTutorsData(res.data.data)
    console.log(res.data.data)
  }

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit tutor with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete tutor with ID: ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="main">
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">

        <main className="p-4">
          <div className="mx-auto max-w-4xl">
            {/* Page Title */}
            <div className="mb-6 p-4">
              <h1 className="text-2xl font-bold text-white">List of Tutors</h1>
              <p className="text-gray-300 text-sm">
                View all registered tutors below.
              </p>
            </div>

            {/* Tutors Table */}
            <div className="bg-white/5 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 backdrop-blur-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                    <th className="p-4 text-cyan-300">Email</th>
                      <th className="p-4 text-cyan-300">Name</th>
                      <th className="p-4 text-cyan-300">Subjects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutorsData.length > 0 && tutorsData.map((tutor) => (
                      <React.Fragment key={tutor.email}>
                        {/* Main Row */}
                        <tr className="border-b border-gray-700/50 hover:bg-cyan-900/10 transition-colors">
                          <td className="p-4 text-gray-300">{tutor.email}</td>
                          <td className="p-4 text-white">{tutor.name}</td>
                          <td className="p-4 text-gray-300">{tutor.expertise}</td>
                          {/* <td className="p-4">
                            <button
                              className="text-cyan-400 hover:text-cyan-300 transition-colors"
                              onClick={() => toggleRow(tutor.email)}
                            >
                              {expandedRows.includes(tutor.email) ? (
                                <ChevronUp size={20} />
                              ) : (
                                <ChevronDown size={20} />
                              )}
                            </button>
                          </td> */}
                        </tr>

                        {/* Expanded Row */}
                        {/* {expandedRows.includes(tutor.email) && (
                          <tr className="border-b border-gray-700/50">
                            <td colSpan={5} className="p-4 bg-gray-800/30">
                              <div className="space-y-3">
                                <p className="text-gray-300">
                                  <span className="font-medium text-cyan-400">
                                    Phone:
                                  </span>{" "}
                                  {tutor.details.phone}
                                </p>
                                <p className="text-gray-300">
                                  <span className="font-medium text-cyan-400">
                                    Address:
                                  </span>{" "}
                                  {tutor.details.address}
                                </p>
                                <p className="text-gray-300">
                                  <span className="font-medium text-cyan-400">
                                    Hire Date:
                                  </span>{" "}
                                  {tutor.details.hireDate}
                                </p>
                                <div className="flex space-x-4 mt-4">
                                  <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                                    onClick={() => handleEdit(tutor.email)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors"
                                    onClick={() => handleDelete(tutor.email)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )} */}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

      </div>

    </div>
  );
};

export default ListTutor;
