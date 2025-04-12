import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const [registerType, setRegisterType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    website: "",
    BannerImage: "",
    Bio: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/institute/create", formData);
      console.log("Institute registered:", response.data);
      alert("Institute registered successfully!");
     navigate('/home')
    } catch (err) {
      console.error("Error:", err);
      alert("Registration failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to CourseCamp</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          Register
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80 space-y-4">
              <h2 className="text-xl font-semibold">Register as</h2>
              <button
                onClick={() => setRegisterType("institute")}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Institute
              </button>
              <button
                onClick={() => setRegisterType("student")}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Student
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {registerType === "institute" && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-4"
            >
              <h2 className="text-2xl font-bold">Institute Registration</h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Institute Name"
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="BannerImage"
                value={formData.BannerImage}
                onChange={handleChange}
                placeholder="Banner Image URL"
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                name="Bio"
                value={formData.Bio}
                onChange={handleChange}
                placeholder="Short Bio"
                className="w-full px-4 py-2 border rounded"
              ></textarea>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setRegisterType("");
                    setShowPopup(false);
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
