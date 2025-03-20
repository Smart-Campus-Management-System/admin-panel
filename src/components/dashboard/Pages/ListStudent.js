import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";


const ListStudent = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const [studentsData, setStudentsData] = useState([
    {
      name:'',
      email:'',
      subject:''
    }
  ])

  useEffect(()=>{
    handleGetAll()
  },[])

  const handleGetAll = async () => {
    const res = await axios.get('http://localhost:4000/api/v1/student/all')
    setStudentsData(res.data.data)
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
    console.log(`Edit student with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete student with ID: ${id}`);
    // Add your delete logic here
  };

  return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">

        <main className="p-4">
          <div className="mx-auto max-w-4xl">
            {/* Page Title */}
            <div className="mb-6 p-4">
              <h1 className="text-2xl font-bold text-white">List of Students</h1>
              <p className="text-gray-300 text-sm">
                View all registered students below.
              </p>
            </div>

            {/* Students Table */}
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
                  {studentsData.length > 0 && studentsData.map((student) => (
                      <React.Fragment key={student.email}>
                        {/* Main Row */}
                        <tr className="border-b border-gray-700/50 hover:bg-cyan-900/10 transition-colors">
                          <td className="p-4 text-gray-300">{student.email}</td>
                          <td className="p-4 text-white">{student.name}</td>
                          <td className="p-4 text-gray-300">{student.subject}</td>
                          {/* <td className="p-4">
                            <button
                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                onClick={() => toggleRow(student.email)}
                            >
                              {expandedRows.includes(student.email) ? (
                                  <ChevronUp size={20} />
                              ) : (
                                  <ChevronDown size={20} />
                              )}
                            </button>
                          </td> */}
                        </tr>

                        {/* Expanded Row */}
                        {/* {expandedRows.includes(student.email) && (
                            <tr className="border-b border-gray-700/50">
                              <td colSpan={5} className="p-4 bg-gray-800/30">
                                <div className="space-y-3">
                                  <p className="text-gray-300">
                                <span className="font-medium text-cyan-400">
                                  Phone:
                                </span>{" "}
                                    {student.email}
                                  </p>
                                  <p className="text-gray-300">
                                <span className="font-medium text-cyan-400">
                                  Address:
                                </span>{" "}
                                    {student.details.address}
                                  </p>
                                  <p className="text-gray-300">
                                <span className="font-medium text-cyan-400">
                                  Enrollment Date:
                                </span>{" "}
                                    {student.details.enrollmentDate}
                                  </p>
                                  <div className="flex space-x-4 mt-4">
                                    <button
                                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                                        onClick={() => handleEdit(student.id)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors"
                                        onClick={() => handleDelete(student.id)}
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
  );
};

export default ListStudent;
