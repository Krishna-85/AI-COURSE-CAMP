import React, { useState } from "react";
import axios from "axios";

const AddInstructor = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Photo: "",
    Bio: "",
    PhoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/institute/addInstructor", formData, {
        withCredentials: true,
      });
      alert("Instructor Added Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error adding instructor:", err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Instructor</h2>

        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Instructor Name"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          placeholder="Instructor Email"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="Photo"
          value={formData.Photo}
          onChange={handleChange}
          placeholder="Photo URL"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="text"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <textarea
          name="Bio"
          value={formData.Bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
          Add Instructor
        </button>
      </form>
    </div>
  );
};

export default AddInstructor;
