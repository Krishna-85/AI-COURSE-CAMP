import React, { useState, useEffect } from "react";
import axios from "axios";

const AddLecture = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Module: "",
  });

  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/institute/modules", {
          withCredentials: true,
        });
        setModules(res.data.modules);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModules();
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
      const res = await axios.post("http://localhost:9000/api/institute/addLecture", formData, {
        withCredentials: true,
      });

      alert("Lecture added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Lecture</h2>

        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          placeholder="Lecture Title"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Lecture Description"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <select
          name="Module"
          value={formData.Module}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        >
          <option value="">Select Module</option>
          {modules.map((module) => (
            <option key={module._id} value={module._id}>
              {module.Title}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
          Add Lecture
        </button>
      </form>
    </div>
  );
};

export default AddLecture;
