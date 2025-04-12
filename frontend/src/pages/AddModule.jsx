import React, { useState, useEffect } from "react";
import axios from "axios";

const AddModule = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Course: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/institute/courses", {
          withCredentials: true,
        });
        setCourses(res.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/institute/addModule", formData, {
        withCredentials: true,
      });

      alert("Module added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Module</h2>

        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Module Title"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Module Description"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <select
          name="Course"
          value={formData.Course}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.Title}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
          Add Module
        </button>
      </form>
    </div>
  );
};

export default AddModule;
