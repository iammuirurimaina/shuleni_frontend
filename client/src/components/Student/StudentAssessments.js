import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

export const StudentAssessments = () => {
  const [assessment, setAssessment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/assessments")
      .then((res) => res.json())
      .then((data) => {
        setAssessment(data);  // Corrected the function name
      })
      .catch((error) => {
        console.error("Error fetching assessments data:", error);
      });
  }, []);

  const filteredAssessment = assessment
    ? assessment.filter((assessment) =>
        assessment.class_id.toString().includes(searchTerm.toLowerCase())
      )
    : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-full p-2 border-r border-gray-200">
        <h1 className="text-blue-600 text-2xl mb-2 font-bold text-center">Assessments</h1>

        <div className="m-4 flex flex-col items-center justify-center sm:flex-row">
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/4 p-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
          />
          <div className="flex flex-row">
            <div className="m-2 sm:m-4 flex items-center justify-center">
              <Link to="/submit-assessment"> {/* Corrected the route name */}
                <button className="bg-blue-600 hover:bg-blue-600 text-white font-bold px-4 py-3 rounded-xl cursor-pointer">
                  Submit
                </button>
              </Link>
            </div>
            <div className="m-2 sm:m-4 flex items-center justify-center">
              <button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer"
              >
                Print
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-2 overflow-x-auto">
          <table className="w-full rounded-xl">
            <thead>
            <tr className="bg-blue-600 rounded-xl text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Class</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Link</th>
                <th className="py-2 px-4">Start</th>
                <th className="py-2 px-4">End</th>
                <th className="py-2 px-4">Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessment.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-2 px-4 text-center"> {/* Corrected colspan value */}
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredAssessment.map((assessment, i) => (  // Corrected variable name
                  <tr key={i} className="border-b text-center">
                    <td className="py-2 px-4">{assessment.id}</td>
                    <td className="py-2 px-4">{assessment.class_id}</td>
                    <td className="py-2 px-4">{assessment.title}</td>
                    <td className="py-2 px-4">{assessment.body}</td>
                    <td className="py-2 px-4">{assessment.start_time}</td>
                    <td className="py-2 px-4">{assessment.end_time}</td>
                    <td className="py-2 px-4">'f{assessment.duration} mins'</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAssessments;
