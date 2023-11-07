import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const AddSchool = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").max(15),
    phone: yup.string().required("Phone is required").max(10),
    email: yup.string().required('Email is required'),
    role: yup.string().required("Must enter a role"),
    schoolName: yup.string().required("School Name is required"),
    schoolLocation: yup.string().required("School Location is required"),
  });

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: userData.name || "",
      phone: userData.phone || "",
      email: userData.email || "",
      role: userData.role || "",
      schoolName: userData.schoolName || "",
      schoolLocation: userData.schoolLocation || "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setFormSubmitted(true);
          navigate("/users");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("An error occurred while updating the user.");
        });
    },
  });

  return (
    <div className="mx-auto">
      <div className="bg-blue-600 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Add School</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-blue-600 mb-6 md:mb-12">
              School added successfully!
            </p>
            <Link
              to="/users"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded-xl cursor-pointer"
            >
              Back to Users
            </Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            {/* Existing form fields here */}

            <div className="m-5">
              <input
                type="text"
                id="schoolName"
                placeholder="School Name"
                name="schoolName"
                onChange={formik.handleChange}
                value={formik.values.schoolName}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.schoolName && (
                <p className="text-red-500 mt-1">{formik.errors.schoolName}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="text"
                id="schoolLocation"
                placeholder="School Location"
                name="schoolLocation"
                onChange={formik.handleChange}
                value={formik.values.schoolLocation}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.schoolLocation && (
                <p className="text-red-500 mt-1">{formik.errors.schoolLocation}</p>
              )}
            </div>

            <div className="flex flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Add School
              </button>
              <Link
                to="/users"
                className="bg-blue-600 hover-bg-orange-600 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Back
              </Link>
            </div>
            <button type="submit" className="hidden" />
          </form>
        )}
      </div>
    </div>
  );
};

export default AddSchool;
