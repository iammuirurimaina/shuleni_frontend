import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const EditClass = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    class_name: yup.string().required("Class Name is required"),
    educator_id: yup.number().required("Educator ID is required"),
    school_id: yup.number().required("School ID is required"),
  });

  useEffect(() => {
    fetch(`/classes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setClassData(data);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      class_name: classData.class_name || "",
      educator_id: classData.educator_id || "",
      school_id: classData.school_id || "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch(`/classes/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          setClassData(data);
          setFormSubmitted(true);
          navigate("/classes");
        })
        .catch((error) => {
          console.error("Error updating class:", error);
          alert("An error occurred while updating the class.");
        });
    },
  });

  return (
    <div className="mx-auto">
      <div className="bg-blue-600 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Edit Class</h2>
      </div>

      <div className="bg-white mt-16 flex flex-col items-center justify-center p-4 md:p-8">
        {formSubmitted ? (
          <div>
            <p className="text-blue-600 mb-6 md:mb-12">
              Class data updated successfully!
            </p>
            <Link
              to="/classes"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-3 md:px-4 md:py-4 justify-center items-center rounded-xl cursor-pointer"
            >
              Back to Classes
            </Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2">
            <div className="m-5">
              <input
                type="text"
                id="class_name"
                placeholder="Class Name"
                name="class_name"
                onChange={formik.handleChange}
                value={formik.values.class_name}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.class_name && (
                <p className="text-red-500 mt-1">{formik.errors.class_name}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="number"
                id="educator_id"
                placeholder="Educator ID"
                name="educator_id"
                onChange={formik.handleChange}
                value={formik.values.educator_id}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.educator_id && (
                <p className="text-red-500 mt-1">{formik.errors.educator_id}</p>
              )}
            </div>

            <div className="m-5">
              <input
                type="number"
                id="school_id"
                placeholder="School ID"
                name="school_id"
                onChange={formik.handleChange}
                value={formik.values.school_id}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-blue-600"
              />
              {formik.errors.school_id && (
                <p className="text-red-500 mt-1">{formik.errors.school_id}</p>
              )}
            </div>

            <div className="flex flex-row justify-center items-center mt-8 space-x-20">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl cursor-pointer mb-4"
              >
                Update
              </button>
              <Link
                to="/classes"
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

export default EditClass;
