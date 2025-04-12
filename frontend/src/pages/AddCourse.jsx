import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Price: "",
    Validity: "",
    Image: "",
    Instructor: "",
  });

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Get all instructors from backend to select
    const fetchInstructors = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/institute/Instructors", {
          withCredentials: true,
        });
        setInstructors(res.data.instructors);
      } catch (error) {
        console.error("Failed to fetch instructors", error);
      }
    };
    fetchInstructors();
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
      const res = await axios.post("http://localhost:9000/api/institute/addCourse", formData, {
        withCredentials: true,
      });

      alert("Course added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Course</h2>

        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="number"
          name="Price"
          value={formData.Price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="number"
          name="Validity"
          value={formData.Validity}
          onChange={handleChange}
          placeholder="Validity (in days)"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="Image"
          value={formData.Image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <select
          name="Instructor"
          value={formData.Instructor}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        >
          <option value="">Select Instructor</option>
          {instructors.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.Name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
